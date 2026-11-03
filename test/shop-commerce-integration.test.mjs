import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import catalog from "../src/compiled-catalog.mjs";
import { acceptedShopBooks, bookAtomFeed } from "../src/book-feed.mjs";
import { MARKET_CATALOG_URL, marketCatalogTransport, serviceBrowseResponse } from "../src/service-discovery.mjs";
import { campaign, supportResponse } from "../src/support-campaign.mjs";

const ORIGIN = "https://shop.561.group";

test("one Shop release preserves all three source-owned experiences", () => {
  const worker = readFileSync(new URL("../src/worker.mjs", import.meta.url), "utf8");
  const manifest = readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8");
  const required = [
    'from "./book-feed.mjs"',
    'from "./support-campaign.mjs"',
    'marketCatalogTransport(env.MARKET_SERVICE_CATALOG_FETCH, fetch)',
    'pathname === "/books.atom"',
    '"/support/share.json"',
    'Support open work',
    'Book updates (Atom)',
    '"/support", ...catalog.offerings',
    'return runtime.fetch(request',
  ];
  for (const fragment of required) assert.ok(worker.includes(fragment), fragment);
  assert.ok(manifest.includes('"service": "market-561-group"'));
  for (const path of [
    "test/book-feed.test.mjs", "test/service-discovery.test.mjs",
    "test/support-campaign.test.mjs", "test/shop-commerce-integration.test.mjs",
    "test/worker.test.mjs",
  ]) assert.ok(manifest.includes(path), path);
});

test("original Shop editions remain separate from emsenn voluntary support", async () => {
  assert.equal(catalog.merchant.name, "561 Group");
  assert.equal(campaign.merchantDisplayName, "emsenn");
  const books = acceptedShopBooks(catalog);
  assert.ok(books.length > 0);
  const atom = bookAtomFeed(catalog);
  assert.ok(atom.includes('xmlns="http://www.w3.org/2005/Atom"'));
  for (const item of books) assert.ok(atom.includes("/goods/" + encodeURIComponent(item.id)), item.id);
  for (const forbidden of ["buy.stripe.com", "plink_", "/support/go"]) assert.ok(!atom.includes(forbidden));
  const page = await supportResponse(new Request(ORIGIN + "/support?utm_source=github"));
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.ok(html.includes("sole-proprietor merchant"));
  assert.ok(html.includes("charitable donation"));
  assert.ok(!html.includes("/checkout/the-x402-economy"));
  const link = await supportResponse(new Request(ORIGIN + "/support/go?kind=one-time&source=github"));
  assert.equal(link.status, 303);
  assert.equal(link.headers.get("location"), campaign.oneTime.links.github.url);
  assert.equal(link.headers.get("referrer-policy"), "no-referrer");
});

test("Bazaar inspection keeps merchant source and refuses invented Shop payment", async () => {
  const sku = "ni:///sha-256;" + "H".repeat(43);
  const original = {
    recordType: "561-group.x402-market-catalog", market: "https://market.561.group",
    settlement: {protocol: "x402", network: "eip155:8453", asset: "USDC"},
    offers: [{sku, name: "Original seller service", listed: true, method: "POST",
      url: "https://market.561.group/v1/example", price: "$0.02",
      description: "A source observation, not a verified sale.",
      seller: {enterprise: "561 Group", privateReceiver: "never-public"}}],
  };
  let calls = 0;
  const transport = marketCatalogTransport({
    async fetch(request) {
      calls++;
      assert.equal(request.url, MARKET_CATALOG_URL);
      assert.equal(request.method, "GET");
      assert.equal(request.credentials, "omit");
      return Response.json(original);
    },
  }, async () => { throw Error("must not bypass the original service binding"); });
  const response = await serviceBrowseResponse(new Request(ORIGIN + "/services.json"), {fetchSource: transport});
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(calls, 1);
  assert.equal(data.services.length, 1);
  assert.equal(data.services[0].sku, sku);
  assert.equal(data.services[0].seller.enterprise, "561 Group");
  assert.equal(data.services[0].shopCheckoutAvailable, false);
  assert.equal(data.services[0].externalPaidDeliveryVerified, false);
  assert.ok(data.services[0].inspectUrl.startsWith("https://bazaar.561.group/offers?source=house-x402&id="));
  assert.ok(!JSON.stringify(data).includes("never-public"));
  assert.ok(!JSON.stringify(data).includes(campaign.oneTime.links.github.id));
});
