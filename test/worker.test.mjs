import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import worker, { CATALOG, CATALOG_VALIDATION, ShopFulfillment } from "../src/worker.mjs";
import { issueDownloadToken } from "@red-cup-engineering/digital-goods-storefront-services-section";

function fulfillment() {
  const rows = new Map();
  const storage = { async get(key) { return rows.get(key); }, async put(key, value) { rows.set(key, value); }, async transaction(work) { return work({ get: storage.get, put: storage.put }); } };
  const object = new ShopFulfillment({ storage });
  return {
    namespace: {
      idFromName() { return "shop"; },
      get() { return { fetch(input, init) { return object.fetch(input instanceof Request ? input : new Request(input, init)); } }; },
    },
    async post(path, body) { return object.fetch(new Request(`https://fulfillment${path}`, { method: "POST", body: JSON.stringify(body) })); },
    async entitlement(id) { return (await object.fetch(new Request(`https://fulfillment/entitlement/${id}`))).json(); },
  };
}
function r2(objects) { return { async get(key) { const value = objects[key]; return value === undefined ? null : { async arrayBuffer() { return new TextEncoder().encode(value).buffer; } }; } }; }
function env(overrides = {}) { return { SHOP_FULFILLMENT: fulfillment().namespace, SHOP_GOODS: r2({}), SHOP_TOKEN_SECRET: "token-secret", ...overrides }; }
function signature(body, secret) { const now = Math.floor(Date.now() / 1000); return "t=" + now + ",v1=" + createHmac("sha256", secret).update(String(now) + "." + body).digest("hex"); }
function paidEvent({ eventId = "evt_test", sessionId = "cs_test", offeringId = "understanding-infection-associated-chronic-illness", amount = 1900, currency = "usd", paymentStatus = "paid" } = {}) {
  return { id: eventId, type: "checkout.session.completed", livemode: false, data: { object: { id: sessionId, amount_total: amount, currency, payment_status: paymentStatus, status: "complete", metadata: { offering_id: offeringId, request_digest: "digest" } } } };
}

test("shop catalog is valid and links publishing offers to Binding Generations", () => {
  assert.equal(CATALOG_VALIDATION.valid, true);
  assert.deepEqual(CATALOG.offerings.slice(0, 5).map((item) => item.externalUrl), [
    "https://bindinggenerations.net/publications/understanding-infection-associated-chronic-illness",
    "https://bindinggenerations.net/publications/the-agent-operators-handbook",
    "https://bindinggenerations.net/publications/the-whirling-crystal",
    "https://bindinggenerations.net/publications/health-education-newsletter",
    "https://bindinggenerations.net/publications/koios-intelligence-briefing",
  ]);
});

test("checkout remains unavailable without all fulfillment capabilities", async () => {
  const response = await worker.fetch(new Request("https://shop.561.group/checkout/understanding-infection-associated-chronic-illness", { method: "POST" }), env());
  assert.equal(response.status, 404);
});

test("webhook requires a paid event joined to the issued checkout", async () => {
  const secret = "whsec_test"; const store = fulfillment(); const runtime = env({ SHOP_FULFILLMENT: store.namespace, STRIPE_WEBHOOK_SECRET: secret });
  await store.post("/checkout", { sessionId: "cs_test", offeringId: "understanding-infection-associated-chronic-illness", requestDigest: "digest", amountTotal: 1900, currency: "usd", stripeMode: "test", goods: CATALOG.offerings[0].goods });
  const unpaid = JSON.stringify(paidEvent({ paymentStatus: "unpaid" }));
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body: unpaid, headers: { "stripe-signature": signature(unpaid, secret) } }), runtime)).status, 409);
  const mismatch = JSON.stringify(paidEvent({ eventId: "evt_mismatch", amount: 1 }));
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body: mismatch, headers: { "stripe-signature": signature(mismatch, secret) } }), runtime)).status, 409);
  const body = JSON.stringify(paidEvent());
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body, headers: { "stripe-signature": signature(body, secret) } }), runtime)).status, 200);
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body, headers: { "stripe-signature": signature(body, secret) } }), runtime)).status, 200);
  assert.equal((await store.entitlement("cs_test")).status, "active");
});

test("download rechecks entitlement and exact artifact bytes", async () => {
  const item = { id: "historical-publication", priceCents: 1900, currency: "usd", goods: [{ name: "EPUB", key: "historical-publication.epub", contentType: "application/epub+zip", byteLength: 1, sha256: "092921f0be89f4abbc530eef1d6fa5ce9a56b1487c3c93ab0d93d558d69b49fb" }] };
  const good = item.goods[0]; const store = fulfillment();
  await store.post("/checkout", { sessionId: "cs_download", offeringId: item.id, requestDigest: "download-digest", amountTotal: item.priceCents, currency: item.currency, stripeMode: "test", goods: item.goods });
  await store.post("/claim", { eventId: "evt_download", sessionId: "cs_download", offeringId: item.id, requestDigest: "download-digest", amountTotal: item.priceCents, currency: item.currency, stripeMode: "test", paymentStatus: "paid", status: "complete" });
  const token = await issueDownloadToken({ secret: "token-secret", offeringId: item.id + "/" + good.key, sessionId: "cs_download", expiresAt: Date.now() + 60_000 });
  const bad = await worker.fetch(new Request("https://shop.561.group/download/" + token), env({ SHOP_FULFILLMENT: store.namespace, SHOP_GOODS: r2({ ["goods/" + item.id + "/" + good.key]: "tampered" }) }));
  assert.equal(bad.status, 503);
  await store.post("/revoke", { sessionId: "cs_download", reason: "test" });
  const revoked = await worker.fetch(new Request("https://shop.561.group/download/" + token), env({ SHOP_FULFILLMENT: store.namespace }));
  assert.equal(revoked.status, 403);
});
