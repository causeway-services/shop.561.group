import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  SHOP_SOURCE, SHOP_COMPILED_CATALOG, produceShopRetailerSubmissionDrafts,
} from "../scripts/derive-retail-submission-drafts.mjs";

test("actual Shop compiled author is the sole source for 77 retailer candidate rows", async () => {
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
    assert.equal(value.bookSubmissionDrafts.length, 11);
    const retailerRows = value.bookSubmissionDrafts.flatMap(b => b.retailerSubmissionDrafts);
    assert.equal(retailerRows.length, 77);
    assert.ok(retailerRows.every(r => ["blocked", "candidate-needs-publisher-review"].includes(r.disposition)));
    assert.ok(retailerRows.every(r => !("approval" in r) && !("published" in r) && !("fields" in r)));
    const notAccepted = value.bookSubmissionDrafts.find(b => b.bookOfferingId === "the-whirling-crystal");
    assert.ok(notAccepted, "the surviving unaccepted book must be present as a refused submission");
    assert.ok(notAccepted.retailerSubmissionDrafts.every(r =>
      r.submissionBlockers.some(s => /No accepted, revision-identified EbookEditionAcceptance/u.test(s))));
    assert.match(guide, /^# Retailer submission drafts/mu);
    assert.ok(guide.includes(value.sourceCatalog.contentDigest));
    assert.ok(!serialized.includes(dir), "transport must not copy machine paths as source identities");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
