import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { reconcileAuthoredOfferLinks, generatedModule } from "../scripts/reconcile-authored-offer-links.mjs";
import originalCompiled from "../src/compiled-catalog.mjs";
import originalAuthored from "../catalog.json" with {type:"json"};
import originalEvidence from "../data/records/commerce-navigation/2026-10-20-original-publication-identities.json" with {type:"json"};

const copy = value => structuredClone(value);
const source = () => copy(originalAuthored);
const compiled = () => copy(originalCompiled);
const identities = () => copy(originalEvidence);

// Always run this merchant boundary under the original dependency-free source preflight;
// a pinned Worker qualification on another branch is not proof of THIS checkout seller.
test("author-owned publisher brand and legal payee remain independent in both live inputs", () => {
  const authored = source();
  const runtime = compiled();
  assert.equal(authored.merchant.name, "561 Group");
  assert.equal(runtime.merchant.name, "561 Group");
  assert.equal(authored.merchant.legalBody, "emsenn");
  assert.equal(runtime.merchant.legalBody, "emsenn");
  assert.deepEqual(authored.merchant, runtime.merchant);
  assert.equal(runtime.offerings.length, 13);
  assert.equal(runtime.externalStripePaymentLinkReceivers.length, 4);
});

test("original author, compiled runtime and independent old NI evidence admit the same seven URLs", () => {
  const result = reconcileAuthoredOfferLinks(source(), compiled(), identities());
  assert.equal(result.updated.length, 0);
  assert.deepEqual(result.catalog, originalCompiled);
  assert.equal(generatedModule(result.catalog), readFileSync(new URL("../src/compiled-catalog.mjs", import.meta.url), "utf8"));
  assert.equal(originalCompiled.offerings.length, 13);
  assert.equal(originalEvidence.offers.length, 7);
});

test("older Market query links reproject to exact author-owned Bazaar NIs, keeping original edition bytes", () => {
  const before = compiled();
  for (const item of before.offerings) if (item.agentOfferUrl?.includes("bazaar.561.group")) {
    item.agentOfferUrl = "https://market.561.group/?q=" + encodeURIComponent(item.id);
  }
  const after = reconcileAuthoredOfferLinks(source(), before, identities());
  assert.equal(after.updated.length, 7);
  for (let i = 0; i < before.offerings.length; i++) {
    const prior = {...before.offerings[i]}, next = {...after.catalog.offerings[i]};
    delete prior.agentOfferUrl;
    delete next.agentOfferUrl;
    assert.deepEqual(next, prior, "no edition price, rights, metadata or fulfillment revision permitted");
  }
  assert.deepEqual(after.catalog, originalCompiled);
});

test("merchant, original receiver, authored prices and accepted source paths cannot be reinterpreted", () => {
  const alter = [
    item => { item.authored.merchant.legalBody = "another merchant"; },
    item => { item.authored.externalStripePaymentLinkReceivers = []; },
    item => { item.authored.offerings[2].priceCents += 1; },
    item => { item.authored.offerings[2].status = "coming-soon"; },
    item => { item.authored.offerings[2].book.acceptance = "another-edition.json"; },
    item => { item.previous.offerings[2].book.edition.record = "another-edition.json"; },
    item => { item.authored.offerings.reverse(); },
    item => { item.authored.offerings.push({...item.authored.offerings[2],id:"fake"}); },
  ];
  for (const mutate of alter) {
    const input = {authored:source(),previous:compiled(),evidence:identities()};
    mutate(input);
    assert.throws(() => reconcileAuthoredOfferLinks(input.authored,input.previous,input.evidence),TypeError);
  }
});

test("wrong Bazaar identity, off-site resource or unconsented merchant attribution must refuse", () => {
  const changes = [
    evidence => { evidence.sourceId = "another-merchant"; },
    evidence => { evidence.offers[0].sku = "ni:///sha-256;"+"A".repeat(43); },
    evidence => { evidence.offers[0].url = "https://wrong.example/offer"; },
    evidence => { evidence.offers[0].listed = false; },
    evidence => { evidence.offers.push({...evidence.offers[0]}); },
  ];
  for (const modify of changes) {
    const evidence=identities();
    modify(evidence);
    assert.throws(() => reconcileAuthoredOfferLinks(source(),compiled(),evidence),TypeError);
  }
  const authored=source();
  authored.offerings[2].agentOfferUrl = "https://bazaar.561.group/offers?source=another&id=ni%3A";
  assert.throws(() => reconcileAuthoredOfferLinks(authored,compiled(),identities()),TypeError);
  const previous=compiled();
  previous.offerings[2].agentOfferUrl = "https://malicious.example/offer";
  assert.throws(() => reconcileAuthoredOfferLinks(source(),previous,identities()),TypeError);
});
