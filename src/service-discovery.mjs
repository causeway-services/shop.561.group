// Read-only human and machine storefront projection of the ORIGINAL x402 seller.
// Shop does not become another merchant, invent prices or accept agent payment here.
export const MARKET_CATALOG_URL = "https://market.561.group/v1/catalog";
const MARKET_ORIGIN = "https://market.561.group";
const MAX_UPSTREAM_BYTES = 4_000_000;
const MAX_LISTED = 500;

function sourceIdentity(row) {
  if (!row || typeof row !== "object" || Array.isArray(row) ||
      typeof row.sku !== "string" ||
      !/^ni:\/\/\/sha-256;[A-Za-z0-9_-]{43}$/u.test(row.sku) ||
      typeof row.name !== "string" || !row.name.trim() ||
      !["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].includes(row.method) ||
      typeof row.url !== "string")
    throw new TypeError("Market supplied an invalid listed offer");
  let original;
  try { original = new URL(row.url); } catch { throw new TypeError("Market offer has no usable origin"); }
  if (original.origin !== MARKET_ORIGIN || original.username || original.password)
    throw new TypeError("Market listed an offer outside its original seller");
  return row.sku;
}

function selector(options = {}) {
  const query = options.query ?? "";
  const offset = options.offset ?? 0, limit = options.limit ?? 20;
  if (typeof query !== "string" || query.length > 120 ||
      !Number.isSafeInteger(offset) || offset < 0 || offset > 500 ||
      !Number.isSafeInteger(limit) || limit < 1 || limit > 50)
    throw new TypeError("Service browsing requires a bounded query, offset and limit");
  const terms = [...new Set(query.trim().toLowerCase().split(/\s+/u).filter(Boolean))];
  if (terms.length > 8) throw new TypeError("Service query has too many terms");
  return { query, terms, offset, limit };
}

/** This does not advertise Shop checkout, accept a price as payable, or restate a seller grant. */
export function projectOriginalMarketServices(source, options = {}) {
  const { query, terms, offset, limit } = selector(options);
  if (!source || source.recordType !== "561-group.x402-market-catalog" ||
      source.market !== MARKET_ORIGIN || source.settlement?.protocol !== "x402" ||
      !Array.isArray(source.offers) || source.offers.length > MAX_LISTED)
    throw new TypeError("Shop requires the source-owned 561 Group x402 seller readout");
  const listed = source.offers.filter(row => row?.listed === true);
  const identities = listed.map(sourceIdentity);
  if (new Set(identities).size !== identities.length)
    throw new TypeError("Original Market seller contains duplicate listed identities");
  const matching = listed.filter(row => {
    const haystack = [row.sku, row.name, row.description, row.category,
      row.gateway, row.operation, row.method, row.seller?.enterprise,
      row.compute?.package].map(v => String(v ?? "").toLowerCase()).join(" ");
    return terms.every(term => haystack.includes(term));
  });
  return Object.freeze({
    recordType: "561-group.shop.source-service-discovery.v1",
    source: Object.freeze({ catalog: MARKET_CATALOG_URL, market: source.market,
      readoutType: source.recordType, settlementProtocol: source.settlement.protocol }),
    qualifications: Object.freeze({
      listing: "original-seller-declared, not independently proven payable or delivered",
      checkout: "Shop read-only; current x402 quote and payment remain with original Market",
    }),
    query, total: matching.length, offset, limit,
    nextOffset: offset + limit < matching.length ? offset + limit : null,
    services: Object.freeze(matching.slice(offset, offset + limit).map(row => Object.freeze({
      sku: row.sku, name: row.name, description: row.description ?? "",
      category: row.category ?? "unclassified", gateway: row.gateway,
      operation: row.operation, method: row.method, endpoint: row.url,
      pricePreview: typeof row.price === "string" ? row.price : null,
      // Publicly project an explicit seller identity, never upstream private metadata.
      seller: typeof row.seller?.enterprise === "string" && row.seller.enterprise.trim()
        ? Object.freeze({ enterprise: row.seller.enterprise }) : null,
      cell: row.cell ?? null, law: row.law ?? null,
      input: row.request ?? null, output: row.output ?? null,
      sourceRightsVerification: row.sourceRightsVerification ?? "not-declared",
      inspectUrl: MARKET_ORIGIN + "/?offer=" + encodeURIComponent(row.sku),
      listed: true, shopCheckoutAvailable: false,
      externalPaidDeliveryVerified: false,
    }))),
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/gu, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
}

export function renderServiceBrowse(projection) {
  const { query, offset, nextOffset, services } = projection;
  const form = `<form action="/services" method="GET" role="search"><label for="service-query">Find a service</label> <input id="service-query" name="q" value="${escapeHtml(query)}" maxlength="120" placeholder="e.g. schema validation"> <button type="submit">Search</button></form>`;
  const list = services.map(row => `<li><article><h2><a href="${escapeHtml(row.inspectUrl)}">${escapeHtml(row.name)}</a></h2><p>${escapeHtml(row.description)}</p><p><strong>Price preview:</strong> ${escapeHtml(row.pricePreview ?? "Consult original offer")} · ${escapeHtml(row.method)} · ${escapeHtml(row.category)}. Provider: ${escapeHtml(row.seller?.enterprise ?? "Not independently established")}. Source rights: ${escapeHtml(row.sourceRightsVerification)}. Original seller listing; current paid availability and delivery unverified.</p><p><a href="${escapeHtml(row.inspectUrl)}">Inspect x402 service contract</a></p></article></li>`).join("");
  const page = new URLSearchParams([["q", query], ["offset", String(nextOffset ?? Math.max(0, offset - 20))]]);
  const nav = nextOffset !== null ? `<p><a href="/services?${escapeHtml(page)}">More services</a></p>` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>561 Group Services · Shop</title><meta name="description" content="Browse original 561 Group source-qualified x402 services, then inspect current terms at the original merchant."><style>body{font:1rem/1.55 system-ui,sans-serif;color:#222;max-width:76rem;margin:auto;padding:1rem 2rem}header,footer{border-block:1px solid #aaa;padding:.8rem 0}a{color:#174b90}li{margin:0 0 1.25rem}ul{padding-left:1.25rem}article{max-width:62rem}h2{font-size:1.25rem}input{min-width:min(60vw,24rem);padding:.4rem}button{padding:.45rem}small{color:#555}</style></head><body><header><a href="/">561 Group Shop</a> · <a href="https://bazaar.561.group">Bazaar</a> · <a href="https://market.561.group">Market</a></header><main><h1>Services for people and agents</h1><p>These are source-listed services from the original 561 Group x402 merchant. Browse freely. A listed service is not a verified live payment or delivery; inspect its current original terms before authorizing a purchase.</p>${form}<p>${projection.total} matching source-listed services.</p><ul>${list}</ul>${nav}<p><a href="/services.json">Machine-readable service catalog</a> · <a href="https://market.561.group/v1/catalog">Original typed operation catalog</a></p></main><footer><small>Shop presents existing seller declarations. Market controls x402 contracts and payment; Bazaar federates discovery. No purchase or wallet authority is granted here.</small></footer></body></html>`;
}

function reject(status, message) {
  return Response.json({ error: message, source: MARKET_CATALOG_URL }, {
    status, headers: { "cache-control": "no-store", "access-control-allow-origin": "*",
      "x-content-type-options": "nosniff" }
  });
}

/** Source read is independently injectable for a real original Worker request test. */
export async function serviceBrowseResponse(request, { fetchSource = fetch } = {}) {
  const url = new URL(request.url);
  if (!["GET", "HEAD"].includes(request.method))
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD" } });
  let selection;
  try {
    selection = selector({
      query: url.searchParams.get("q") ?? "",
      offset: url.searchParams.has("offset") ? Number(url.searchParams.get("offset")) : 0,
      limit: url.searchParams.has("limit") ? Number(url.searchParams.get("limit")) : 20,
    });
  } catch {
    return reject(400, "Invalid service search arguments");
  }
  let projection;
  try {
    const response = await fetchSource(MARKET_CATALOG_URL, {
      method: "GET", redirect: "manual", headers: { accept: "application/json" }
    });
    if (response.status !== 200 ||
        !response.headers.get("content-type")?.includes("application/json") ||
        Number(response.headers.get("content-length") ?? 0) > MAX_UPSTREAM_BYTES)
      throw new TypeError("Original seller read is unavailable");
    const payload = await response.text();
    if (new TextEncoder().encode(payload).byteLength > MAX_UPSTREAM_BYTES)
      throw new TypeError("Seller read exceeds expected size");
    projection = projectOriginalMarketServices(JSON.parse(payload), selection);
  } catch {
    return reject(503, "Source-qualified service catalog temporarily unavailable");
  }
  const json = url.pathname === "/services.json";
  const body = json ? JSON.stringify(projection) : renderServiceBrowse(projection);
  return new Response(request.method === "HEAD" ? null : body, {
    status: 200,
    headers: { "content-type": json ? "application/json; charset=utf-8" : "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
      "access-control-allow-origin": json ? "*" : "https://shop.561.group",
      "x-content-type-options": "nosniff",
      ...(json ? {} : { "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'" }),
    }
  });
}
