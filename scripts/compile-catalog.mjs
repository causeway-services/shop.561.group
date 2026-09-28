#!/usr/bin/env node
// Compile catalog.json into the catalog the Worker serves. A book row names
// its manuscript, its acceptance record (or, for an edition that predates
// acceptance records, the directory holding its files) and the pipeline's
// cover; everything a reader is told about the book -- title, series,
// description, keywords, subjects, contents, formats, sizes, digests, the
// proof's counts -- is read from
// those records here rather than typed into the catalog. The cover is copied
// into public/covers/, which the Worker serves as static assets.
//
// Tracked files (manuscripts, records) are read from the checkout being
// built; edition state (EPUBs, PDFs, covers) is untracked and is read from
// the main worktree, so a deploy from a clean worktree compiles the same.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { listChapters, sha256File } from "@red-cup-engineering/ebook-production-services-section";
import { validateCatalog } from "@red-cup-engineering/digital-goods-storefront-services-section";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const git = (...args) => execFileSync("git", args, { cwd: site, encoding: "utf8" }).trim();
const SERVICES = "lib/emsenn/services/561-group/services";
const checkout = join(git("rev-parse", "--show-toplevel"), SERVICES);
const mainTree = join(dirname(resolve(site, git("rev-parse", "--git-common-dir"))), SERVICES);

const hexOf = (ni) => Buffer.from(ni.replace(/^ni:\/\/\/sha-256;/u, ""), "base64url").toString("hex");
// A path as the catalog records it: relative to the services root, the same on every checkout.
const servicesRelative = (path) => path.replace(/^.*?\/lib\/emsenn\/services\/561-group\/services\//u, "");
const stateFile = (path) => (path.startsWith("/") ? path.replace(/^.*?\/lib\/emsenn\/services\/561-group\/services\//u, `${mainTree}/`) : join(mainTree, path));

function pages(pdf) {
  try { return Number(/^Pages:\s+(\d+)/mu.exec(execFileSync("pdfinfo", [pdf], { encoding: "utf8" }))?.[1]) || undefined; } catch { return undefined; }
}

function contents(manuscript) {
  return listChapters(manuscript).map((chapter) => {
    const heading = /^# (.+)$/mu.exec(readFileSync(chapter, "utf8"))?.[1];
    if (!heading) throw new Error(`${chapter} has no title heading`);
    return heading.replace(/\s*\{[^}]*\}\s*$/u, "").trim();
  });
}

function edition(row) {
  if (row.book.acceptance) {
    const record = JSON.parse(readFileSync(join(checkout, row.book.acceptance), "utf8"));
    if (record.type !== "EbookEditionAcceptance" || record.status !== "accepted") throw new Error(`${row.id}: ${row.book.acceptance} is not an accepted edition`);
    const { epub, screenPdf } = record.artifacts;
    return {
      digest: record.editionInputDigest,
      acceptedAt: record.acceptedAt,
      pages: pages(stateFile(screenPdf.path)),
      proof: record.proof?.findings ?? null,
      files: [{ format: "EPUB", bytes: epub.bytes, sha256: hexOf(epub.sha256), path: servicesRelative(epub.path) }, { format: "PDF", bytes: screenPdf.bytes, sha256: hexOf(screenPdf.sha256), path: servicesRelative(screenPdf.path) }],
      record: row.book.acceptance,
    };
  }
  const directory = stateFile(row.book.files);
  const file = (extension) => readdirSync(directory).find((name) => name.endsWith(extension));
  const epub = join(directory, file(".epub")); const pdf = join(directory, file(".pdf"));
  return {
    digest: `release ${row.release}`,
    pages: pages(pdf),
    proof: null,
    files: [{ format: "EPUB", bytes: readFileSync(epub).byteLength, sha256: hexOf(sha256File(epub)), path: servicesRelative(epub) }, { format: "PDF", bytes: readFileSync(pdf).byteLength, sha256: hexOf(sha256File(pdf)), path: servicesRelative(pdf) }],
  };
}

export function compileCatalog(source) {
  const covers = join(site, "public", "covers");
  rmSync(covers, { recursive: true, force: true });
  mkdirSync(covers, { recursive: true });
  const offerings = source.offerings.map((row) => {
    if (!row.book) return row;
    const manuscript = join(checkout, row.book.manuscript);
    const manifest = JSON.parse(readFileSync(join(manuscript, "ebook.json"), "utf8"));
    let cover;
    if (row.book.cover && existsSync(stateFile(row.book.cover))) {
      copyFileSync(stateFile(row.book.cover), join(covers, `${row.id}.png`));
      cover = `/covers/${row.id}.png`;
    }
    const { book, ...offering } = row;
    return {
      ...offering,
      title: row.title ?? manifest.title,
      subtitle: manifest.subtitle,
      blurb: manifest.description,
      keywords: manifest.keywords ?? [],
      ...(cover ? { cover } : {}),
      book: {
        author: manifest.author,
        ...(manifest.series ? { series: manifest.series } : {}),
        ...(manifest.profile ? { profile: manifest.profile } : {}),
        subjects: manifest.subjects ?? [],
        ...(cover ? { coverFile: row.book.cover } : {}),
        marks: manifest.marks ?? [],
        contents: contents(manuscript),
        edition: edition(row),
        manuscript: book.manuscript,
      },
    };
  });
  const { $comment, ...rest } = source;
  const catalog = { ...rest, offerings };
  const validation = validateCatalog(catalog);
  if (!validation.valid) throw new Error(`compiled catalog is invalid: ${validation.errors.map((error) => `${error.path}: ${error.message}`).join("; ")}`);
  return catalog;
}

if (import.meta.main) {
  const catalog = compileCatalog(JSON.parse(readFileSync(join(site, "catalog.json"), "utf8")));
  writeFileSync(join(site, "src", "compiled-catalog.mjs"), `// Generated by scripts/compile-catalog.mjs from catalog.json and each book's records. Do not edit.\nexport default ${JSON.stringify(catalog, null, 2)};\n`);
  console.log(`${basename(site)}: ${catalog.offerings.length} offerings, ${readdirSync(join(site, "public", "covers")).length} covers`);
}
