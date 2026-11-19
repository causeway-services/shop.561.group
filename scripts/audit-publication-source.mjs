#!/usr/bin/env node
// Source-only publication preflight. This does NOT establish a deployed release,
// retailer submission, active checkout, or that the accepted binary files exist.
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { basename, dirname, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const NI = /^ni:\/\/\/sha-256;[a-zA-Z0-9_-]{43}$/u;
const SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

function inside(root, candidate, label) {
  if (typeof candidate !== "string" || !candidate || candidate.startsWith("/") || candidate.includes("\\"))
    throw new Error(`${label}: expected a relative POSIX path`);
  const target = resolve(root, candidate);
  const rel = relative(root, target);
  if (rel === ".." || rel.startsWith(`..${sep}`) || rel === "" || rel.startsWith(sep))
    throw new Error(`${label}: path escapes or names the services root`);
  return target;
}

function readJson(path, label) {
  const source = JSON.parse(readFileSync(path, "utf8"));
  if (!source || typeof source !== "object" || Array.isArray(source))
    throw new Error(`${label}: expected JSON object`);
  return source;
}

const validDigest = value => typeof value === "string" && NI.test(value);
const nonempty = value => typeof value === "string" && value.trim().length > 0;

// Only Git-tracked mode-160000 sources can be declared unmounted. A missing
// ordinary directory is an error, never an excuse to skip book custody.
export function sourceGitlinks(servicesRoot) {
  const root = realpathSync(servicesRoot);
  const repo = execFileSync("git", ["-C", root, "rev-parse", "--show-toplevel"], { encoding:"utf8" }).trim();
  const prefix = relative(repo, root).split(sep).join("/");
  // .gitmodules is a name inventory, not source authority. Authenticate
  // each candidate against its exact mode-160000 entry in the Git tree;
  // never enumerate the enormous superrepository tree into execFileSync.
  const declarations = readFileSync(resolve(repo, ".gitmodules"), "utf8");
  const mounts = [...declarations.matchAll(/^\s*path\s*=\s*(.+)$/gmu)].map(x => x[1].trim());
  return mounts.filter(x => x.startsWith(prefix + "/")).flatMap(mount => {
    const listing = execFileSync("git", ["-C", repo, "ls-tree", "HEAD", "--", mount], {
      encoding:"utf8", maxBuffer:65536
    }).trim();
    const match = /^160000 commit ([0-9a-f]{40})\t(.+)$/u.exec(listing);
    if (!match || match[2] !== mount) return [];
    return [{ source:mount.slice(prefix.length + 1), commit:match[1] }];
  });
}

function unmountedOwner(root, location, gitlinks) {
  const rel = relative(root, location).split(sep).join("/");
  return gitlinks.find(x => {
    if (rel !== x.source && !rel.startsWith(x.source + "/")) return false;
    const mount = resolve(root, x.source);
    // An initialized but incomplete source is *not* unmounted.
    return !existsSync(mount) || readdirSync(mount).length === 0;
  });
}

/** Audit only owned, tracked source and acceptance records. Nothing is published. */
export function auditPublicationSources({ catalogPath, servicesRoot, gitlinks = [] }) {
  const root = realpathSync(servicesRoot);
  const catalog = readJson(catalogPath, "catalog");
  if (!Array.isArray(catalog.offerings)) throw new Error("catalog: offerings must be an array");
  const ids = new Set(), releases = new Set(), entries = [], errors = [], warnings = [], deferred = [];
  for (const row of catalog.offerings) {
    const id = row?.id ?? "<missing>";
    const issue = message => errors.push(`${id}: ${message}`);
    try {
      if (!SAFE_ID.test(id)) throw new Error("offering id is not a safe slug");
      if (ids.has(id)) throw new Error("duplicate offering id");
      ids.add(id);
      if (!row.book) continue; // Subscriptions and merchandise have separate contracts.
      if (!SAFE_ID.test(row.release ?? "")) throw new Error("book release is not a safe slug");
      if (releases.has(row.release)) throw new Error("duplicate book release");
      releases.add(row.release);
      if (!["live", "coming-soon"].includes(row.status)) throw new Error("unknown book offer status");
      if (!Number.isSafeInteger(row.priceCents) || row.priceCents < 0 || row.currency !== "usd")
        throw new Error("book price/currency must be an admitted nonnegative USD cent amount");
      const manuscript = inside(root, row.book.manuscript, "manuscript");
      const missingOwner = !existsSync(manuscript) && unmountedOwner(root, manuscript, gitlinks);
      if (missingOwner) {
        deferred.push({
          id, offerStatus:row.status, source:row.book.manuscript,
          reason:"source-submodule-not-checked-out",
          gitlink:missingOwner.source, sourceCommit:missingOwner.commit,
          edition:"not-verified", channelRelease:"not-verified"
        });
        continue;
      }
      if (!statSync(manuscript).isDirectory() || realpathSync(manuscript) !== manuscript)
        throw new Error("manuscript must resolve to a direct directory, not a symlink");
      const manifest = readJson(resolve(manuscript, "ebook.json"), "ebook manifest");
      if (manifest.slug !== basename(manuscript)) throw new Error("ebook slug disagrees with source directory");
      if (![manifest.title, manifest.author, manifest.description].every(nonempty))
        throw new Error("ebook needs title, author, and description");
      let record = null;
      if (row.book.acceptance) {
        const acceptance = inside(root, row.book.acceptance, "acceptance");
        if (realpathSync(acceptance) !== acceptance)
          throw new Error("acceptance must not resolve through a symlink");
        record = readJson(acceptance, "edition acceptance");
        if (record.type !== "EbookEditionAcceptance" || record.status !== "accepted"
          || !validDigest(record.editionInputDigest)
          || !validDigest(record.artifacts?.epub?.sha256)
          || !validDigest(record.artifacts?.screenPdf?.sha256)
          || !Number.isFinite(Date.parse(record.acceptedAt)))
          throw new Error("edition acceptance lacks exact source identity, accepted status, EPUB/PDF digests, or date");
      } else if (row.status === "live") {
        throw new Error("live offering has no tracked edition acceptance");
      }
      if (row.book.printAcceptance) {
        const print = readJson(inside(root, row.book.printAcceptance, "print acceptance"), "print acceptance");
        if (print.type !== "PrintEditionAcceptance" || print.status !== "accepted")
          throw new Error("print acceptance is not an accepted print edition");
        if (!record) throw new Error("print acceptance cannot replace ebook acceptance");
      }
      entries.push({
        id, release: row.release, source: row.book.manuscript, offerStatus: row.status,
        edition: record ? "accepted" : "unaccepted",
        editionInputDigest: record?.editionInputDigest ?? null,
        channelRelease: "not-verified-in-source-preflight"
      });
      // A fabrication candidate may be a historical version: report, never
      // silently substitute the edition-specification digest for acceptance.
      const specPath = resolve(manuscript, "edition-specification.json");
      try {
        const spec = readJson(specPath, "edition specification");
        const projected = [...new Set((spec.projections ?? []).map(p=>p.configuration?.editionInputDigest).filter(Boolean))];
        if (record && projected.length && !projected.includes(record.editionInputDigest))
          warnings.push(`${id}: edition specification projects a different input digest than the current accepted edition`);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
    } catch (error) { issue(error.message); }
  }
  return Object.freeze({
    kind: "561.publication-source-preflight/v1",
    checked: entries.length, deferred: deferred.length, complete: deferred.length === 0,
    totalOfferings: catalog.offerings.length,
    valid: errors.length === 0, entries, unverified:deferred, errors, warnings,
    assurance: "tracked-source-and-acceptance-only; not deployed delivery, actual ebook bytes, promotion or retailer listing"
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.length !== 4 && !(process.argv.length === 5 && process.argv[4] === "--require-complete")) {
    console.error("usage: node audit-publication-source.mjs CATALOG_JSON SERVICES_ROOT [--require-complete]");
    process.exitCode = 2;
  } else {
    const report = auditPublicationSources({
      catalogPath: process.argv[2], servicesRoot: process.argv[3],
      gitlinks:sourceGitlinks(process.argv[3])
    });
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
    if (report.unverified.length) console.error("SOURCE COVERAGE INCOMPLETE: " + report.unverified.length + " books are under unchecked-out Gitlinks; this is not release approval.");
    if (!report.valid || (process.argv[4] === "--require-complete" && !report.complete)) process.exitCode = 1;
  }
}
