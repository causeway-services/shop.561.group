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
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { listChapters, sha256File } from "@red-cup-engineering/ebook-production-services-section";
import { validateCatalog } from "@red-cup-engineering/digital-goods-storefront-services-section";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SERVICES = "lib/emsenn/services/561-group/services";

// Resolve the checkout and its primary worktree without spawning git. Besides
// making compilation independent of PATH/process policy, this preserves the
// clean-linked-worktree behavior: tracked records come from this checkout and
// untracked edition state comes from the primary worktree named by commondir.
function repositoryRoots(from) {
  let checkoutRoot = from;
  while (!existsSync(join(checkoutRoot, ".git")) && dirname(checkoutRoot) !== checkoutRoot) checkoutRoot = dirname(checkoutRoot);
  const dotGit = join(checkoutRoot, ".git");
  if (!existsSync(dotGit)) throw new Error(`cannot locate repository above ${from}`);
  if (!statSync(dotGit).isFile()) return { checkoutRoot, mainRoot: checkoutRoot };
  const pointer = /^gitdir:\s*(.+)$/u.exec(readFileSync(dotGit, "utf8").trim())?.[1];
  if (!pointer) throw new Error(`${dotGit} is not a gitdir pointer`);
  const linkedGitDirectory = resolve(checkoutRoot, pointer);
  const commonDirectory = resolve(linkedGitDirectory, readFileSync(join(linkedGitDirectory, "commondir"), "utf8").trim());
  return { checkoutRoot, mainRoot: dirname(commonDirectory) };
}

const { checkoutRoot, mainRoot } = repositoryRoots(site);
const checkout = join(checkoutRoot, SERVICES);
const mainTree = join(mainRoot, SERVICES);

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

export function generatedIllustrationsFrom(manifest) {
  return (manifest.assets ?? [])
    .filter((asset) => typeof asset.provenance?.model === "string")
    .map((asset) => ({ path: asset.path, role: asset.role, model: asset.provenance.model, ...(asset.provenance.provider ? { provider: asset.provenance.provider } : {}) }));
}

// A book's built files, where its manifest builds them: <book>/<distDir>/<slug>.{epub,pdf}
// and <slug>-cover.png, read from the main worktree (they are untracked state).
function builtFiles(row, manifest) {
  const directory = stateFile(normalize(join(row.book.manuscript, manifest.distDir)));
  const at = (name) => join(directory, name);
  return { epub: at(`${manifest.slug}.epub`), pdf: at(`${manifest.slug}.pdf`), cover: at(`${manifest.slug}-cover.png`) };
}

// The edition a book is sold as. Its files are found through its manifest and,
// when it has an acceptance record, must be byte for byte the accepted ones:
// the shop never describes files it does not hold.
function edition(row, manifest) {
  const built = builtFiles(row, manifest);
  for (const file of [built.epub, built.pdf]) if (!existsSync(file)) throw new Error(`${row.id}: no built file at ${servicesRelative(file)}; build the edition first`);
  const file = (format, path) => ({ format, bytes: readFileSync(path).byteLength, sha256: hexOf(sha256File(path)), path: servicesRelative(path) });
  const files = [file("EPUB", built.epub), file("PDF", built.pdf)];
  if (!row.book.acceptance) return { digest: `release ${row.release}`, pages: pages(built.pdf), proof: null, files };
  const record = JSON.parse(readFileSync(join(checkout, row.book.acceptance), "utf8"));
  if (record.type !== "EbookEditionAcceptance" || record.status !== "accepted") throw new Error(`${row.id}: ${row.book.acceptance} is not an accepted edition`);
  const accepted = { EPUB: hexOf(record.artifacts.epub.sha256), PDF: hexOf(record.artifacts.screenPdf.sha256) };
  for (const { format, sha256, path } of files) if (sha256 !== accepted[format]) throw new Error(`${row.id}: ${path} is not the accepted ${format} (${sha256} is not ${accepted[format]})`);
  return { digest: record.editionInputDigest, acceptedAt: record.acceptedAt, pages: pages(built.pdf), proof: record.proof ? { ...record.proof.findings, carried: /^Carried from /u.test(record.proof.method ?? "") } : null, files, record: row.book.acceptance };
}

export function compileCatalog(source) {
  const covers = join(site, "public", "covers");
  rmSync(covers, { recursive: true, force: true });
  mkdirSync(covers, { recursive: true });
  const offerings = source.offerings.map((row) => {
    if (!row.book) return row;
    const manuscript = join(checkout, row.book.manuscript);
    const manifest = JSON.parse(readFileSync(join(manuscript, "ebook.json"), "utf8"));
    const generatedIllustrations = generatedIllustrationsFrom(manifest);
    const built = builtFiles(row, manifest);
    let cover;
    if (existsSync(built.cover)) {
      copyFileSync(built.cover, join(covers, `${row.id}.png`));
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
        ...(manifest.publisher ? { publisher: manifest.publisher } : {}),
        ...(manifest.series ? { series: manifest.series } : {}),
        ...(manifest.profile ? { profile: manifest.profile } : {}),
        // Cover art drawn in code (a TikZ file an agent wrote) is disclosed as such.
        ...(manifest.coverArt ? { coverArt: true } : {}),
        ...(generatedIllustrations.length ? { generatedIllustrations } : {}),
        subjects: manifest.subjects ?? [],
        ...(cover ? { coverFile: servicesRelative(built.cover) } : {}),
        marks: manifest.marks ?? [],
        contents: contents(manuscript),
        edition: edition(row, manifest),
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
