/**
 * The standards surface of shop.561.group: its identity, crawler documents and page policy.
 * Nothing here is a book, a price or a route of the Shop; the catalog and the storefront
 * runtime own those. The sitemap lists the catalog's own offerings.
 */
import catalog from "./compiled-catalog.mjs";
import { BRAND_ASSETS } from "./brand-assets.mjs";
import { createStandardsSurface } from "./standards-surface.mjs";

export const ORIGIN = "https://shop.561.group";
export const DESCRIPTION = "Books from the 561 Group, as EPUB and PDF. Every edition is proofread independently, and each book's page gives the digests of the exact files you receive.";
/** Release date for sitemap lastmod; bump with each deploy. */
export const LASTMOD = "2026-10-22";

export const LLMS_TXT = `# 561 Group Shop

> ${DESCRIPTION} The Shop is the storefront for people of Causeway Services, part of the 561 Group: books to buy and read, a library per reader, and gifts.

shop.561.group is inside bazaar.561.group, which is inside market.561.group. People buy here; software that pays per request uses the Market.

## Books

${catalog.offerings.map((offering) => `- [${offering.title}](${ORIGIN}/goods/${offering.id}): ${String(offering.blurb ?? "").replace(/\\s+/gu, " ").slice(0, 140)}`).join("\n")}

## Machine interfaces

- [Shop catalog JSON](${ORIGIN}/catalog.json): every offering with prices and edition digests (GET)
- [Shop MCP](${ORIGIN}/mcp): POST JSON-RPC with list_products, search_products and get_product
- [Bazaar discovery](https://bazaar.561.group/discovery.json): compare the Shop's books with the Market's services
- [Market x402 services](https://market.561.group/x402/): how software pays per request over HTTP 402

## Optional

- [561 Group Bazaar](https://bazaar.561.group/)
- [561 Group Market](https://market.561.group/)
- [Causeway Services](https://services.561.group/)
- [561 Group](https://561.group/)
`;

export const surface = createStandardsSurface({
  origin: ORIGIN,
  name: "561 Group Books",
  description: DESCRIPTION,
  organizationType: "OnlineStore",
  organizationDescription: "The 561 Group's storefront for people: books as EPUB and PDF, a library per reader, and gifts.",
  brandAssets: BRAND_ASSETS,
  llmsTxt: LLMS_TXT,
  lastmod: LASTMOD,
  sitemapPaths: () => [
    { path: "/", changefreq: "weekly" },
    ...catalog.offerings.map((offering) => ({ path: `/goods/${offering.id}` })),
    { path: "/catalog.json" },
    { path: "/llms.txt" },
  ],
  // Account, payment and machine endpoints; checkout is POST-only.
  robotsDisallow: ["/api/", "/oauth/", "/checkout/", "/mcp"],
  searchTarget: `${ORIGIN}/?q={search_term_string}`,
  // The storefront runtime sets a stricter nonce-based policy of its own; this is the fallback for any HTML it does not cover.
  csp: "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'",
});
