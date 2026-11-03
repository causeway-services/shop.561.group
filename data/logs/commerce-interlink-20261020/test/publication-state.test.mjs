import assert from "node:assert/strict";
import test from "node:test";

import { CATALOG } from "../src/worker.mjs";

test("edition acceptance does not imply publication-channel availability", () => {
  for (const offering of CATALOG.offerings.filter((item) => item.book)) {
    if (offering.status === "live") {
      assert.ok(offering.book.edition.acceptedAt, offering.id);
    }
  }

  for (const id of ["understanding-infection-associated-chronic-illness", "the-agent-operators-handbook"]) {
    const offering = CATALOG.offerings.find((item) => item.id === id);
    assert.ok(offering.book.edition.acceptedAt, id);
    assert.equal(offering.status, "coming-soon", id);
  }

  const whirling = CATALOG.offerings.find((item) => item.id === "the-whirling-crystal");
  assert.equal(whirling.status, "coming-soon");
  assert.equal(whirling.book.edition.acceptedAt, undefined);
});
