import { validateCatalog } from "@red-cup-engineering/digital-goods-storefront-services-section";
import { createDigitalGoodsStorefrontWorker } from "@red-cup-engineering/digital-goods-storefront-services-section/worker-runtime";
import catalog from "../catalog.json" with { type: "json" };
import { createShopFulfillment, createShopStripeAudit } from "./fulfillment.mjs";

export const CATALOG = catalog;
export const CATALOG_VALIDATION = validateCatalog(catalog);

const runtime = createDigitalGoodsStorefrontWorker({
  catalog,
  origin: "https://shop.561.group",
  buyerActor: "urn:ame:shop-561-group-buyer",
});

export default {
  fetch(request, env) {
    return runtime.fetch(request, {
      ...env,
      fulfillment: createShopFulfillment(env.SHOP_FULFILLMENT),
      goods: env.SHOP_GOODS,
      tokenSecret: env.SHOP_TOKEN_SECRET,
      audit: createShopStripeAudit(env.SHOP_FULFILLMENT),
    });
  },
};

export { ShopFulfillment } from "./fulfillment.mjs";
