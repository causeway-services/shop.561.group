import assert from "node:assert/strict";
import test from "node:test";
import { fulfillPromotionalSend, grantReference, shopGiftAdapters } from "../src/promotion-email-gifts.mjs";
const receipt = { accepted: true, status: "sent", provider: "fastmail", messageId: "m-21", to: ["reader@example.org"] };
const good = { offering: "ice-out", recipient: "reader@example.org", receipt };
test("drafts, failures, and recipient substitution grant nothing", async () => {
  let calls = 0;
  const shopGrant = async () => { calls++; return { id: "id1" }; };
  const shopRead = async () => ({ offering: "ice-out", email: "reader@example.org" });
  for (const patch of [{ status: "draft" }, { accepted: false }, { failed: true }, { to: ["other@example.org"] }, { to: ["reader@example.org", "cc@example.org"] }]) {
    await assert.rejects(fulfillPromotionalSend({ ...good, receipt: { ...receipt, ...patch }, shopGrant, shopRead }));
  }
  assert.equal(calls, 0);
});
test("accepted send grants once by stable reference and receives exact reader", async () => {
  const calls = [];
  const shopGrant = async (payload) => { calls.push(payload); return { id: "id1", url: "https://shop.561.group/gifts/id1", disposition: "created" }; };
  const shopRead = async () => ({ offering: "ice-out", email: "reader@example.org", status: "active" });
  const first = await fulfillPromotionalSend({ ...good, shopGrant, shopRead });
  const second = await fulfillPromotionalSend({ ...good, shopGrant, shopRead });
  assert.equal(first.reference, second.reference);
  assert.equal(calls[0].reference, calls[1].reference);
  assert.equal(first.verified, true);
  assert.notEqual(grantReference({ ...good, provider: "fastmail", messageId: "m-22" }), first.reference);
});
test("wrong readback fails and never claims recipient success", async () => {
  await assert.rejects(fulfillPromotionalSend({ ...good, shopGrant: async () => ({ id: "id1" }), shopRead: async () => ({ offering: "ice-out", email: "other@example.org" }) }), /readback/);
});
test("shop API uses authenticated calls, never browser parameters", async () => {
  const seen = [];
  const fetchImpl = async (url, init) => { seen.push({ path: url.pathname, init }); return { ok: true, json: async () => url.pathname === "/api/gifts" ? { id: "x_1" } : { offering: "ice-out", email: "reader@example.org" } }; };
  const adapters = shopGiftAdapters({ key: "secret", fetchImpl });
  await fulfillPromotionalSend({ ...good, ...adapters });
  assert.deepEqual(seen.map(x => x.path), ["/api/gifts", "/api/gifts/x_1"]);
  assert.ok(seen.every(x => x.init.headers.authorization === "Bearer secret"));
});
