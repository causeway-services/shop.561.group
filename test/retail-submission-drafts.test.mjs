import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  SHOP_SOURCE, SHOP_COMPILED_CATALOG, produceShopRetailerSubmissionDrafts,
} from "../scripts/derive-retail-submission-drafts.mjs";
import { RETAIL_CHANNELS } from "@red-cup-engineering/digital-goods-storefront-services-section/retail-listings";
import catalog from "../src/compiled-catalog.mjs";

test("actual Shop compiled author is the sole source for retailer candidate rows", async () => {
  const dir = mkdtempSync(join(tmpdir(), "shop-retailer-draft-"));
  try {
    const value = await produceShopRetailerSubmissionDrafts({ outputDirectory: dir });
    const serialized = readFileSync(join(dir, "book-retailer-submission-drafts.json"), "utf8");
    const guide = readFileSync(join(dir, "book-retailer-submission-guide.md"), "utf8");
    assert.equal(value.recordKind, "retailer-submission-draft-collection");
    assert.equal(value.schemaVersion, 2);
    assert.equal(value.disposition, "proposed-not-submitted");
    assert.equal(value.sourceCatalog.repository, SHOP_SOURCE.repository);
    assert.equal(value.sourceCatalog.path, SHOP_SOURCE.path);
    assert.equal(value.sourceCatalog.contentDigest,
      "ni:///sha-256;" + createHash("sha256").update(readFileSync(SHOP_COMPILED_CATALOG)).digest("base64url"));
    assert.deepEqual(JSON.parse(serialized), value);
    const selectedBooks = catalog.offerings.filter(offering => offering.book);
    assert.equal(value.bookSubmissionDrafts.length, selectedBooks.length);
    assert.deepEqual(value.bookSubmissionDrafts.map(book => book.bookOfferingId), selectedBooks.map(book => book.id));
    const retailerRows = value.bookSubmissionDrafts.flatMap(b => b.retailerSubmissionDrafts);
    assert.equal(retailerRows.length, selectedBooks.length * RETAIL_CHANNELS.length);
    assert.ok(retailerRows.every(r => ["blocked", "candidate-needs-publisher-review"].includes(r.disposition)));
    assert.ok(retailerRows.every(r => !("approval" in r) && !("published" in r) && !("fields" in r)));
    // As the source grows or books are accepted, the test reads the current
    // original accepted-edition boundary rather than freezing today's census.
    const byBook = new Map(value.bookSubmissionDrafts.map(book => [book.bookOfferingId, book]));
    for (const selected of selectedBooks.filter(b => !b.book.edition?.record || !b.book.edition?.acceptedAt)) {
      const draft = byBook.get(selected.id);
      assert.ok(draft.retailerSubmissionDrafts.every(r =>
        r.submissionBlockers.some(s => /No accepted, revision-identified EbookEditionAcceptance/u.test(s))));
    }
    assert.match(guide, /^# Retailer submission drafts/mu);
    assert.ok(guide.includes(value.sourceCatalog.contentDigest));
    assert.ok(!serialized.includes(dir), "transport must not copy machine paths as source identities");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
