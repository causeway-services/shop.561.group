#!/usr/bin/env node
/**
 * The live Shop is the seller/publisher owning this catalog. The reusable
 * retailer-form projection is Red Cup Engineering's native source; never
 * copy its channel rules into the Shop or maintain a second Group JSON.
 *
 * This operation produces candidate metadata and a human handling guide.
 * It DOES NOT submit to a retailer, grant publication rights, or claim
 * an accepted print/ebook edition absent the original source receipts.
 */
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { deriveRetailListings } from "@red-cup-engineering/digital-goods-storefront-services-section/retail-submission-drafts";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const SHOP_COMPILED_CATALOG = join(project, "src", "compiled-catalog.mjs");
export const SHOP_RETAIL_DRAFTS = join(project, "generated", "retail-submission-drafts");
export const SHOP_SOURCE = Object.freeze({
  repository: "causeway-services/shop.561.group",
  path: "src/compiled-catalog.mjs",
});

/** Native operator product: compiled source -> exact byte-pinned JSON draft
 * and form-filling instructions, never an external submission. */
export async function produceShopRetailerSubmissionDrafts({
  catalogModule = SHOP_COMPILED_CATALOG,
  outputDirectory = SHOP_RETAIL_DRAFTS,
} = {}) {
  mkdirSync(outputDirectory, { recursive: true });
  return deriveRetailListings(
    catalogModule,
    join(outputDirectory, "book-retailer-submission-drafts.json"),
    join(outputDirectory, "book-retailer-submission-guide.md"),
    SHOP_SOURCE,
  );
}

if (import.meta.main) {
  const result = await produceShopRetailerSubmissionDrafts();
  const proposals = result.bookSubmissionDrafts.flatMap(book => book.retailerSubmissionDrafts);
  console.log(JSON.stringify({
    kind: result.recordKind,
    sourceCatalog: result.sourceCatalog,
    books: result.bookSubmissionDrafts.length,
    retailerCandidates: proposals.length,
    providerSubmissionBlocked: proposals.filter(p => p.disposition === "blocked").length,
    retailerSubmissionsPerformed: 0,
  }));
}
