import assert from "node:assert/strict";
import test from "node:test";

import {
  comparePublicCatalogContract,
  observePublicCatalog,
  publicCatalogContract,
} from "../scripts/observe-public-catalog.mjs";

const expected = {
  merchant: { name: "561 Group", legalBody: "emsenn" },
  offerings: [
    { id: "ice-out", status: "live", priceCents: 399, currency: "usd", release: "ice-out", ignored: "x" },
    { id: "other", status: "coming-soon", priceCents: 900, currency: "usd", release: "other" },
  ],
};

const fixedNow = () => new Date("2026-10-05T00:00:00.000Z");

function response(body, { status = 200 } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      if (body instanceof Error) throw body;
      return structuredClone(body);
    },
  };
}

test("public contract keeps only receiver-relevant merchant and offer fields", () => {
  assert.deepEqual(publicCatalogContract(expected), {
    merchant: { name: "561 Group", legalBody: "emsenn" },
    offerings: [
      { id: "ice-out", status: "live", priceCents: 399, currency: "usd", release: "ice-out" },
      { id: "other", status: "coming-soon", priceCents: 900, currency: "usd", release: "other" },
    ],
  });
});

test("matching deployed public contract is supported", async () => {
  const result = await observePublicCatalog({
    expectedCatalog: expected,
    fetchImpl: async () => response(expected),
    now: fixedNow,
  });
  assert.equal(result.state, "supported");
  assert.equal(result.contract.conforms, true);
  assert.deepEqual(result.contract.differences, []);
});

test("wrong deployed legal seller is refuted, not unknown", async () => {
  const observed = structuredClone(expected);
  observed.merchant.legalBody = "561 Group";
  const result = await observePublicCatalog({
    expectedCatalog: expected,
    fetchImpl: async () => response(observed),
    now: fixedNow,
  });
  assert.equal(result.state, "refuted");
  assert.deepEqual(result.contract.differences, [{
    path: "merchant.legalBody",
    expected: "emsenn",
    observed: "561 Group",
  }]);
});

test("offer drift is a receiver-visible conformance failure", () => {
  const observed = structuredClone(expected);
  observed.offerings[0].priceCents = 499;
  const comparison = comparePublicCatalogContract(expected, observed);
  assert.equal(comparison.conforms, false);
  assert.deepEqual(comparison.differences, [{
    path: "offerings.ice-out.priceCents",
    expected: 399,
    observed: 499,
  }]);
});

test("network failure remains unknown rather than claiming the site is down", async () => {
  const result = await observePublicCatalog({
    expectedCatalog: expected,
    fetchImpl: async () => { throw new Error("network unavailable from this observer"); },
    now: fixedNow,
  });
  assert.equal(result.state, "unknown");
  assert.equal(result.reason, "network-error");
  assert.equal(result.contract, null);
});

test("non-success HTTP remains unknown", async () => {
  const result = await observePublicCatalog({
    expectedCatalog: expected,
    fetchImpl: async () => response({}, { status: 403 }),
    now: fixedNow,
  });
  assert.equal(result.state, "unknown");
  assert.equal(result.reason, "http-non-success");
  assert.equal(result.httpStatus, 403);
});

test("invalid JSON remains unknown", async () => {
  const result = await observePublicCatalog({
    expectedCatalog: expected,
    fetchImpl: async () => response(new Error("not json")),
    now: fixedNow,
  });
  assert.equal(result.state, "unknown");
  assert.equal(result.reason, "invalid-json");
});
