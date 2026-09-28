import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import worker, { CATALOG, CATALOG_VALIDATION, ShopFulfillment } from "../src/worker.mjs";

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
function env(overrides = {}) { return { SHOP_FULFILLMENT: fulfillment().namespace, SHOP_GOODS: { async get() { return null; }, async head() { return null; } }, SHOP_TOKEN_SECRET: "token-secret", ...overrides }; }
function signature(body, secret) { const now = Math.floor(Date.now() / 1000); return "t=" + now + ",v1=" + createHmac("sha256", secret).update(String(now) + "." + body).digest("hex"); }
function paidEvent({ eventId = "evt_test", sessionId = "cs_test", offeringId = "the-x402-economy", amount = 900, currency = "usd", paymentStatus = "paid" } = {}) {
  return { id: eventId, type: "checkout.session.completed", livemode: false, data: { object: { id: sessionId, amount_total: amount, currency, payment_status: paymentStatus, status: "complete", metadata: { offering_id: offeringId, request_digest: "digest" } } } };
}

test("the shop lists human publications and merch without presenting unaccepted books as live", () => {
  assert.equal(CATALOG_VALIDATION.valid, true);
  for (const offering of CATALOG.offerings) assert.ok(offering.book || offering.line === "merch" || offering.line === "@emsenn/health-education-newsletter-enterprise", offering.id);
  for (const offering of CATALOG.offerings.filter((item) => item.book)) {
    assert.equal(offering.status, offering.book.edition.acceptedAt ? "live" : "coming-soon", offering.id);
    assert.match(offering.release, /^[a-z0-9-]+$/u, offering.id);
    if (offering.agentOfferUrl) assert.match(offering.agentOfferUrl, /^https:\/\/market\.561\.group\/#publications-/u, offering.id);
    assert.ok(offering.book.contents.length > 0, offering.id);
    for (const file of offering.book.edition.files) assert.match(file.sha256, /^[0-9a-f]{64}$/u, `${offering.id} ${file.format}`);
  }
  const newsletter = CATALOG.offerings.find((offering) => offering.id === "health-education-newsletter");
  assert.equal(newsletter.status, "coming-soon");
  assert.equal(newsletter.externalUrl, undefined);
  assert.ok(!CATALOG.offerings.some((offering) => /bindinggenerations|play\.561|\/v1\//u.test(offering.externalUrl ?? "")));
});

test("the catalog and a book page render through TUFTE with the verification record", async () => {
  const listing = await (await worker.fetch(new Request("https://shop.561.group/"), env())).text();
  assert.match(listing, /561 Group Books/);
  assert.match(listing, /href="\/goods\/the-x402-economy"/);
  const page = await (await worker.fetch(new Request("https://shop.561.group/goods/the-x402-economy"), env())).text();
  assert.match(page, /Verification record/);
  assert.match(page, /property="og:image" content="https:\/\/shop.561.group\/covers\/the-x402-economy.png"/);
  assert.match(page, /Card checkout opens soon/);
  assert.match(page, /Buy with USDC over x402/);
});

test("checkout remains unavailable without all payment capabilities", async () => {
  const response = await worker.fetch(new Request("https://shop.561.group/checkout/the-x402-economy", { method: "POST", headers: { origin: "https://shop.561.group" } }), env());
  assert.equal(response.status, 409);
});

test("webhook requires a paid event joined to the issued checkout", async () => {
  const secret = "whsec_test"; const store = fulfillment(); const runtime = env({ SHOP_FULFILLMENT: store.namespace, STRIPE_WEBHOOK_SECRET: secret });
  await store.post("/checkout", { sessionId: "cs_test", offeringId: "the-x402-economy", requestDigest: "digest", amountTotal: 900, currency: "usd", stripeMode: "test", release: "the-x402-economy" });
  const unpaid = JSON.stringify(paidEvent({ paymentStatus: "unpaid" }));
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body: unpaid, headers: { "stripe-signature": signature(unpaid, secret) } }), runtime)).status, 409);
  const mismatch = JSON.stringify(paidEvent({ eventId: "evt_mismatch", amount: 1 }));
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body: mismatch, headers: { "stripe-signature": signature(mismatch, secret) } }), runtime)).status, 409);
  const body = JSON.stringify(paidEvent());
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body, headers: { "stripe-signature": signature(body, secret) } }), runtime)).status, 200);
  assert.equal((await worker.fetch(new Request("https://shop.561.group/webhooks/stripe", { method: "POST", body, headers: { "stripe-signature": signature(body, secret) } }), runtime)).status, 200);
  assert.equal((await store.entitlement("cs_test")).status, "active");
});

test("sign-in and gifts stay closed until the shop's Google client and session secret are set", async () => {
  const listing = await (await worker.fetch(new Request("https://shop.561.group/"), env())).text();
  assert.doesNotMatch(listing, /Sign in/);
  assert.equal((await worker.fetch(new Request("https://shop.561.group/library"), env())).status, 503);
  const open = env({ GOOGLE_CLIENT_ID: "client", GOOGLE_CLIENT_SECRET: "secret", SHOP_SESSION_SECRET: "session", SHOP_GIFTERS: "giver@example.test" });
  const login = await worker.fetch(new Request("https://shop.561.group/oauth/login?return_to=/library"), open);
  assert.equal(login.status, 302);
  assert.match(login.headers.get("location"), /redirect_uri=https%3A%2F%2Fshop.561.group%2Foauth%2Fcallback/);
});
