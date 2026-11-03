import assert from "node:assert/strict";
import test from "node:test";
import worker, { CATALOG } from "../src/worker.mjs";

const FORBIDDEN = /morgan|sennhauser|emsenn/iu;
const noGoods = { async get() { return null; }, async head() { return null; } };
const env = { SHOP_GOODS: noGoods, SHOP_TOKEN_SECRET: "test-secret" };
const get = (path, init) => worker.fetch(new Request(`https://shop.561.group${path}`, init), env);
const book = CATALOG.offerings[0].id;

test("no page or document names the Leader, and a leaky path is made repository-relative", async () => {
  const pages = ["/", "/?q=x402", `/goods/${book}`, "/catalog.json", "/llms.txt", "/robots.txt", "/sitemap.xml", "/.well-known/security.txt"];
  for (const path of pages) {
    const text = await (await get(path)).text();
    assert.doesNotMatch(text, FORBIDDEN, path);
  }
  const inner = await worker.fetch(new Request("https://shop.561.group/catalog.json"), env);
  assert.ok(inner.ok);
  // The surface scrubs whatever the wrapped Worker returns.
  const { createStandardsSurface } = await import("../src/standards-surface.mjs");
  const { surface } = await import("../src/standards.mjs");
  assert.ok(surface.fetch);
  const probe = createStandardsSurface({ origin: "https://shop.561.group", name: "x", description: "d".repeat(60), brandAssets: {}, llmsTxt: "# x", lastmod: "2026-10-22", sitemapPaths: () => [], robotsDisallow: [], csp: "default-src 'none'" });
  const leaky = JSON.stringify({ record: { path: "lib/emsenn/services/561-group/services/engineering-services-section/lib/agency/x.json", owner: "emsenn" } });
  const out = await (await probe.fetch(new Request("https://shop.561.group/x"), () => new Response(leaky, { headers: { "content-type": "application/json" } }))).text();
  assert.doesNotMatch(out, FORBIDDEN);
  assert.match(out, /engineering-services-section:lib\/agency\/x\.json/u);
});

test("home page carries the web's standard head metadata, JSON-LD and security headers", async () => {
  const home = await get("/");
  assert.equal(home.status, 200);
  const html = await home.text();
  const title = html.match(/<title>([^<]*)<\/title>/u)[1];
  assert.ok(title.length >= 10 && title.length <= 70);
  const description = html.match(/name="description"[^>]*content="([^"]*)"/u)[1];
  assert.ok(description.length >= 50 && description.length <= 170);
  for (const needle of ['<html lang="en"', 'name="viewport"', 'rel="canonical" href="https://shop.561.group/"', 'property="og:title"', 'property="og:description"', 'property="og:url"',
    'property="og:image" content="https://shop.561.group/card.png"', 'name="twitter:card" content="summary_large_image"', 'rel="icon"', 'rel="apple-touch-icon"',
    "OnlineStore", "SearchAction", "parentOrganization", "https://services.561.group/", "https://561.group/"]) assert.ok(html.includes(needle), needle);
  assert.equal((html.match(/rel="canonical"/gu) ?? []).length, 1);
  assert.equal((html.match(/property="og:image"/gu) ?? []).length, 1);
  for (const [, body] of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gu)) JSON.parse(body);
  assert.equal(home.headers.get("strict-transport-security"), "max-age=63072000");
  assert.equal(home.headers.get("x-content-type-options"), "nosniff");
  assert.equal(home.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  const csp = home.headers.get("content-security-policy");
  assert.match(csp, /frame-ancestors 'none'/u);
  assert.match(csp, /object-src 'none'/u);
});

test("a book page keeps its own metadata, cover image and Book JSON-LD", async () => {
  const html = await (await get(`/goods/${book}`)).text();
  assert.match(html, /"@type":"Book"/u);
  assert.match(html, new RegExp(`property="og:image" content="https://shop\\.561\\.group/covers/`, "u"));
  assert.equal((html.match(/property="og:image"/gu) ?? []).length, 1);
  assert.equal((html.match(/rel="canonical"/gu) ?? []).length, 1);
  assert.equal((html.match(/application\/ld\+json/gu) ?? []).length, 1);
});

test("crawler documents", async () => {
  const robots = await (await get("/robots.txt")).text();
  for (const agent of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"]) assert.match(robots, new RegExp(`User-agent: ${agent}\\n`, "u"));
  for (const path of ["/api/", "/oauth/", "/checkout/", "/mcp"]) assert.match(robots, new RegExp(`Disallow: ${path}\\n`, "u"));
  assert.match(robots, /Sitemap: https:\/\/shop\.561\.group\/sitemap\.xml/u);
  const sitemap = await (await get("/sitemap.xml")).text();
  assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/u);
  for (const offering of CATALOG.offerings) assert.ok(sitemap.includes(`/goods/${offering.id}<`), offering.id);
  const llms = await (await get("/llms.txt")).text();
  assert.match(llms, /^# .+\n\n> /u);
  assert.match(llms, /https:\/\/market\.561\.group\/x402\//u);
  assert.match(llms, /shop\.561\.group\/mcp/u);
  assert.match(llms, /catalog\.json/u);
  const security = await (await get("/.well-known/security.txt")).text();
  assert.match(security, /^Contact: mailto:cto@561\.group$/mu);
  const expires = new Date(security.match(/^Expires: (.+)$/mu)[1]);
  assert.ok(expires > new Date() && expires - new Date() <= 366 * 24 * 3600 * 1000);
  assert.match(security, /^Canonical: https:\/\/shop\.561\.group\/\.well-known\/security\.txt$/mu);
  for (const path of ["/favicon.svg", "/apple-touch-icon.png", "/logo.png", "/card.png"]) {
    const asset = await get(path);
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get("content-type"), /^image\//u);
  }
});

test("commerce behavior is unchanged: unknown paths 404 and checkout stays closed without its capabilities", async () => {
  assert.equal((await get("/absent-path/")).status, 404);
  const checkout = await get(`/checkout/${book}`, { method: "POST" });
  assert.ok([400, 401, 403, 404, 405, 409, 501, 503].includes(checkout.status), String(checkout.status));
  assert.equal(checkout.headers.get("strict-transport-security"), "max-age=63072000");
});
