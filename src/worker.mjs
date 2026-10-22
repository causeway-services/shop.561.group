import { validateCatalog } from "@red-cup-engineering/digital-goods-storefront-services-section";
import * as storefrontRuntime from "@red-cup-engineering/digital-goods-storefront-services-section/worker-runtime";
import { externalStripePaymentLinkIds } from "./external-stripe-payment-link-receiving.mjs";
const {createDigitalGoodsStorefrontWorker}=storefrontRuntime;
import catalog from "./compiled-catalog.mjs";
import { createShopFulfillment, createShopStripeAudit } from "./fulfillment.mjs";
import { serviceBrowseResponse } from "./service-discovery.mjs";

export const CATALOG = catalog;
export const CATALOG_VALIDATION = validateCatalog(catalog);
export const ORIGINAL_EXTERNAL_STRIPE_PAYMENT_LINK_IDS=externalStripePaymentLinkIds(catalog);
export const EXTERNAL_STRIPE_PAYMENT_LINK_RECEIVER_INSTALLED=
 storefrontRuntime.SUPPORTS_EXTERNAL_STRIPE_PAYMENT_LINK_AUDIT===true;

const runtime = createDigitalGoodsStorefrontWorker({
  catalog,
  origin: "https://shop.561.group",
  buyerActor: "urn:ame:shop-561-group-buyer",
  storefront: {
    title: "561 Group Books and Services",
    description: "Books from the 561 Group, with accepted EPUB and PDF edition digests, plus read-only discovery of the original x402 seller’s services. Source listings are not proof of available payment or delivery.",
    footerHtml: "561 Group. <a href=\"https://market.561.group\">Market</a> · <a href=\"https://bazaar.561.group\">Bazaar</a> · <a href=\"https://shop.561.group\">Shop</a> · <a href=\"/services\">Services</a>. Browse books and source-listed services, or inspect original terms in the Bazaar. Agents: <a href=\"/services.json\">Source-service catalog JSON (GET)</a>, <a href=\"/catalog.json\">Shop catalog JSON (GET)</a>, <a href=\"/mcp\">Shop MCP (POST)</a> for list_products, search_products and get_product, <a href=\"https://bazaar.561.group/discovery.json\">Bazaar discovery JSON (GET)</a>, <a href=\"https://market.561.group/markets/discovery.json\">Market discovery JSON (GET)</a>. Discovery documents identify the existing Bazaar and Market MCP POST endpoints. Live payment and delivery require the current seller’s confirmation.",
  },
});

// Crawler documents are the catalog's own view: the storefront and one page per offering.
const ORIGIN = "https://shop.561.group";
function sitemap() {
  const paths = ["/", "/services", ...catalog.offerings.map((offering) => `/goods/${offering.id}`)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${ORIGIN}${path}</loc></url>`).join("\n")}\n</urlset>\n`;
}

export default {
  fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (request.method === "GET" && pathname === "/robots.txt") {
      return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /oauth/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
    }
    if (request.method === "GET" && pathname === "/sitemap.xml") return new Response(sitemap(), { headers: { "content-type": "application/xml; charset=utf-8" } });
    if (pathname === "/services" || pathname === "/services.json") {
      return serviceBrowseResponse(request, { fetchSource: env.MARKET_SERVICE_CATALOG_FETCH ?? fetch });
    }
    return runtime.fetch(request, {
      ...env,
      fulfillment: createShopFulfillment(env.SHOP_FULFILLMENT),
      goods: env.SHOP_GOODS,
      tokenSecret: env.SHOP_TOKEN_SECRET,
      audit: createShopStripeAudit(env.SHOP_FULFILLMENT),
      // Source-qualified emsenn merchant event observations are distinct from
      // this Shop's book checkout and entitlement custody. Older installed
      // suppliers must NOT receive an unimplemented capability assertion.
      externalPaymentLinks:EXTERNAL_STRIPE_PAYMENT_LINK_RECEIVER_INSTALLED
       ?ORIGINAL_EXTERNAL_STRIPE_PAYMENT_LINK_IDS:[],
      // Google sign-in opens when all three are set (wrangler secret put).
      accounts: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, sessionSecret: env.SHOP_SESSION_SECRET },
      // The comma-separated emails that may give books.
      gifters: String(env.SHOP_GIFTERS ?? "").split(",").map((email) => email.trim()).filter(Boolean),
      // The house's agents give books through /api/gifts with this key (pnpm arm-gift-agent); their gifts are Causeway's press office's.
      giftAgent: { key: env.SHOP_GIFT_AGENT_KEY, as: "press@561.group" },
    });
  },
};

export { ShopFulfillment } from "./fulfillment.mjs";
