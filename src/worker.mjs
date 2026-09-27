import { validateCatalog } from "@red-cup-engineering/digital-goods-storefront-services-section";
import { createDigitalGoodsStorefrontWorker } from "@red-cup-engineering/digital-goods-storefront-services-section/worker-runtime";
import catalog from "./compiled-catalog.mjs";
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
    footerHtml: "561 Group. Agents buy these books at <a href=\"https://market.561.group\">market.561.group</a> over x402, from the same accepted files.",
  },
});

export default {
  fetch(request, env) {
    return runtime.fetch(request, {
      ...env,
      fulfillment: createShopFulfillment(env.SHOP_FULFILLMENT),
      goods: env.SHOP_GOODS,
      tokenSecret: env.SHOP_TOKEN_SECRET,
      audit: createShopStripeAudit(env.SHOP_FULFILLMENT),
      // Google sign-in opens when all three are set (wrangler secret put).
      accounts: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, sessionSecret: env.SHOP_SESSION_SECRET },
      // The comma-separated emails that may give books.
      gifters: String(env.SHOP_GIFTERS ?? "").split(",").map((email) => email.trim()).filter(Boolean),
    });
  },
};

export { ShopFulfillment } from "./fulfillment.mjs";
