import assert from "node:assert/strict";
import test from "node:test";
import {
  MARKET_CATALOG_URL, projectOriginalMarketServices, renderServiceBrowse, serviceBrowseResponse
} from "../src/service-discovery.mjs";

const a = "ni:///sha-256;" + "A".repeat(43);
const b = "ni:///sha-256;" + "B".repeat(43);
const hidden = "ni:///sha-256;" + "C".repeat(43);
function row(sku, name, listed = true) {
  return {
    sku, name, listed, gateway: "typed-compute", operation: "example",
    category: "data", method: "POST", route: "/v1/example",
    url: "https://market.561.group/v1/example",
    description: "Reliable & <script>not markup</script> validation",
    seller: { enterprise: "561 Group's actual original provider" }, price: "$0.02",
    cell: "ni:///sha-256;" + "D".repeat(43), law: "ni:///sha-256;" + "E".repeat(43),
    request: { bodySchema: { type: "object", required: ["text"] } },
    output: { schema: { type: "object", properties: { digest: { type: "string" } } } },
    sourceRightsVerification: "not-declared",
    secretNeverProject: "do-not-publish",
  };
}
function source() {
  return { recordType: "561-group.x402-market-catalog", market: "https://market.561.group",
    settlement: { protocol: "x402", network: "eip155:8453", asset: "USDC" },
    offers: [row(a, "Alpha & API"), row(b, "Beta API"), row(hidden, "Not for sale", false)] };
}
function served(doc = source()) {
  return async (url, options) => {
    assert.equal(url, MARKET_CATALOG_URL);
    assert.equal(options.method, "GET");
    assert.equal(options.redirect, "manual");
    return new Response(JSON.stringify(doc), {
      status: 200, headers: { "content-type": "application/json", "cache-control": "no-cache" }
    });
  };
}

test("source-owned seller readout stays one seller, one SKU and no Shop payment assertion", () => {
  const projected = projectOriginalMarketServices(source());
  assert.equal(projected.recordType, "561-group.shop.source-service-discovery.v1");
  assert.equal(projected.source.catalog, MARKET_CATALOG_URL);
  assert.equal(projected.total, 2);
  assert.deepEqual(projected.services.map(x => x.sku), [a, b]);
  assert.equal(projected.services[0].pricePreview, "$0.02");
  assert.equal(projected.services[0].input.bodySchema.required[0], "text");
  assert.equal(projected.services[0].seller.enterprise, "561 Group's actual original provider");
  assert.equal(projected.services[0].shopCheckoutAvailable, false);
  assert.equal(projected.services[0].externalPaidDeliveryVerified, false);
  assert.equal(projected.services[0].inspectUrl,
    "https://market.561.group/?offer=" + encodeURIComponent(a));
  assert.equal(JSON.stringify(projected).includes("secretNeverProject"), false);
  assert.equal(JSON.stringify(projected).includes(hidden), false);
});

test("search and paging select existing identities without inventing catalog rows", () => {
  assert.deepEqual(projectOriginalMarketServices(source(), { query: "beta", limit: 1 })
    .services.map(x => x.sku), [b]);
  const first = projectOriginalMarketServices(source(), { limit: 1 });
  assert.equal(first.nextOffset, 1);
  const second = projectOriginalMarketServices(source(), { offset: 1, limit: 1 });
  assert.deepEqual(second.services.map(x => x.sku), [b]);
  assert.equal(second.nextOffset, null);
  assert.equal(projectOriginalMarketServices(source(), { query: "nothing" }).total, 0);
});

test("human pagination keeps its requested page size, search context and accessible navigation", () => {
  const first = renderServiceBrowse(projectOriginalMarketServices(source(), { query: "api", limit: 1 }));
  assert.match(first, /showing 1–1 of 2/u);
  assert.match(first, /<nav aria-label="Service results pages">/u);
  assert.match(first, /rel="next" href="\/services\?q=api&amp;offset=1&amp;limit=1"/u);
  assert.doesNotMatch(first, /rel="prev"/u);
  const second = renderServiceBrowse(projectOriginalMarketServices(source(), {
    query: "api", offset: 1, limit: 1
  }));
  assert.match(second, /showing 2–2 of 2/u);
  assert.match(second, /rel="prev" href="\/services\?q=api&amp;offset=0&amp;limit=1"/u);
  assert.doesNotMatch(second, /rel="next"/u);
  const none = renderServiceBrowse(projectOriginalMarketServices(source(), { query: "no such offering" }));
  assert.match(none, /showing 0 of 0/u);
  assert.doesNotMatch(none, /aria-label="Service results pages"/u);
});

test("service cards HTML-escape seller descriptions and do not make a fake buy button", () => {
  const html = renderServiceBrowse(projectOriginalMarketServices(source()));
  assert.match(html, /&amp; &lt;script&gt;not markup&lt;\/script&gt;/u);
  assert.doesNotMatch(html, /<script>/u);
  assert.match(html, /original 561 Group x402 merchant/u);
  assert.doesNotMatch(html, /<form[^>]*checkout/u);
});

test("HTTP routes serve source-described machine data and semantic human browse", async () => {
  const get = await serviceBrowseResponse(new Request("https://shop.561.group/services.json?q=alpha"), { fetchSource: served() });
  assert.equal(get.status, 200);
  assert.equal(get.headers.get("access-control-allow-origin"), "*");
  assert.equal(get.headers.get("content-type"), "application/json; charset=utf-8");
  assert.equal((await get.json()).services[0].sku, a);
  const human = await serviceBrowseResponse(new Request("https://shop.561.group/services"), { fetchSource: served() });
  assert.equal(human.status, 200);
  assert.match(human.headers.get("content-security-policy"), /default-src 'none'/u);
  assert.match(await human.text(), /Source-service catalog JSON/u);
  const head = await serviceBrowseResponse(new Request("https://shop.561.group/services.json", { method: "HEAD" }), { fetchSource: served() });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});

test("search rejects abuse before contacting seller; writes never become purchase actions", async () => {
  const noSource = async () => { throw new Error("invalid query reached market"); };
  assert.equal((await serviceBrowseResponse(
    new Request("https://shop.561.group/services?q=" + "a".repeat(121)), { fetchSource: noSource })).status, 400);
  assert.equal((await serviceBrowseResponse(
    new Request("https://shop.561.group/services?limit=1000"), { fetchSource: noSource })).status, 400);
  const post = await serviceBrowseResponse(new Request("https://shop.561.group/services", { method: "POST" }), { fetchSource: noSource });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("allow"), "GET, HEAD");
});

test("mismatched source identity, duplicate NI, secret origin and held products refuse", () => {
  const fakeMarket = source(); fakeMarket.market = "https://another.merchant";
  assert.throws(() => projectOriginalMarketServices(fakeMarket), /source-owned/u);
  const dupe = source(); dupe.offers.push(row(a, "duplicate"));
  assert.throws(() => projectOriginalMarketServices(dupe), /duplicate/u);
  const otherOrigin = source(); otherOrigin.offers[0].url = "https://evil.example/charges";
  assert.throws(() => projectOriginalMarketServices(otherOrigin), /outside/u);
  const heldOnly = source(); heldOnly.offers = [row(hidden, "not listed", false)];
  assert.equal(projectOriginalMarketServices(heldOnly).total, 0);
});

test("shop does not report zero inventory or leak state when merchant response is bad", async () => {
  for (const fetchSource of [
    async () => new Response("down", { status: 503, headers: { "content-type": "text/plain" } }),
    async () => new Response("redirect", { status: 302, headers: { location: "https://evil.example" } }),
    async () => new Response("{bad", { status: 200, headers: { "content-type": "application/json" } }),
    served({ recordType: "incorrect", market: "https://market.561.group", offers: [] }),
  ]) {
    const out = await serviceBrowseResponse(new Request("https://shop.561.group/services.json"), { fetchSource });
    assert.equal(out.status, 503);
    assert.equal(out.headers.get("cache-control"), "no-store");
    const data = await out.json();
    assert.match(data.error, /temporarily unavailable/u);
    assert.equal(data.source, MARKET_CATALOG_URL);
  }
});
