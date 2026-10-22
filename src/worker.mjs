import { validateCatalog } from "@red-cup-engineering/digital-goods-storefront-services-section";
import { createDigitalGoodsStorefrontWorker } from "@red-cup-engineering/digital-goods-storefront-services-section/worker-runtime";
import catalog from "./compiled-catalog.mjs";
import { surface } from "./standards.mjs";
import { createShopFulfillment, createShopStripeAudit } from "./fulfillment.mjs";

export const CATALOG = catalog;
export const CATALOG_VALIDATION = validateCatalog(catalog);

const runtime = createDigitalGoodsStorefrontWorker({
  catalog,
  origin: "https://shop.561.group",
  buyerActor: "urn:ame:shop-561-group-buyer",
  storefront: {
    title: "561 Group Books",
    description: "Books from the 561 Group, as EPUB and PDF. Every edition is proofread independently, and each book's page gives the digests of the exact files you receive.",
    footerHtml: "561 Group. <a href=\"https://market.561.group\">Market</a> · <a href=\"https://bazaar.561.group\">Bazaar</a> · <a href=\"https://shop.561.group\">Shop</a>. Browse books here, or inspect original terms in the Bazaar. Agents: <a href=\"/catalog.json\">Shop catalog JSON (GET)</a>, <a href=\"/mcp\">Shop MCP (POST)</a> for list_products, search_products and get_product, <a href=\"https://bazaar.561.group/discovery.json\">Bazaar discovery JSON (GET)</a>, <a href=\"https://market.561.group/markets/discovery.json\">Market discovery JSON (GET)</a>. Discovery documents identify the existing Bazaar and Market MCP POST endpoints. Live payment and delivery require the current seller’s confirmation.",
  },
});

// The storefront runtime owns every route, price and payment path; the standards surface adds the
// crawler documents, brand assets, missing head metadata and the response headers around it.
const storefront = (request, env) => runtime.fetch(request, {
  ...env,
  fulfillment: createShopFulfillment(env.SHOP_FULFILLMENT),
  goods: env.SHOP_GOODS,
  tokenSecret: env.SHOP_TOKEN_SECRET,
  audit: createShopStripeAudit(env.SHOP_FULFILLMENT),
  // Google sign-in opens when all three are set (wrangler secret put).
  accounts: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, sessionSecret: env.SHOP_SESSION_SECRET },
  // The comma-separated emails that may give books.
  gifters: String(env.SHOP_GIFTERS ?? "").split(",").map((email) => email.trim()).filter(Boolean),
  // The house's agents give books through /api/gifts with this key (pnpm arm-gift-agent); their gifts are Causeway's press office's.
  giftAgent: { key: env.SHOP_GIFT_AGENT_KEY, as: "press@561.group" },
});

export default {
  fetch: (request, env) => surface.fetch(request, (inner) => storefront(inner, env)),
};

export { ShopFulfillment } from "./fulfillment.mjs";
