# shop.561.group

The one page that lists the 561 Group's offers outside of Binding Generations:
merch and links out to the metered APIs
(`market.561.group`) and the games catalog (`play.561.group`) that are
sold elsewhere.

## What this is

A Cloudflare Worker (`src/worker.mjs`) composing two published packages
rather than re-implementing either:

- `@red-cup-engineering/digital-goods-storefront-services-section` --
  catalog validation, buyer-facing view-model shaping, static HTML
  rendering, and signed/expiring download tokens (Web Crypto only).
- `@red-cup-engineering/stripe-services-section` -- the card rail:
  Checkout Session creation and verified-webhook ingestion over an
  ActivityStreams `Offer`/`Accept` envelope.

`catalog.json` in this site owns its non-publishing offers. Publishing offers
link to Binding Generations, which owns their price, status, and artifact
metadata.

This site owns its catalog, routing, `SHOP_GOODS` R2 binding, and the
receiver-specific `ShopFulfillment` Durable Object registration. The
published storefront runtime owns checkout and entitlement transitions.
`SHOP_ENTITLEMENTS` remains bound for historical custody, but it is not
an automatic download grant: a historical purchase needs verified
migration into the Durable Object before it can be delivered.

## Routes

| Route | Behavior |
|---|---|
| `GET /` | Renders the catalog from the engine. |
| `GET /goods/:id` | Renders one offering's product page from the engine. |
| `GET /catalog.json` | Serves `catalog.json` verbatim. |
| `POST /checkout/:id` | Starts a Stripe Checkout Session for a `live`/`test-only` offering, stores its immutable checkout record, then 303s to Stripe. |
| `POST /webhooks/stripe` | Verifies a Stripe signature and atomically admits a matching paid, complete Checkout Session into one Durable Object entitlement. |
| `GET /thanks?session_id=...` | Issues one signed, one-hour download token per good in the immutable purchased-goods snapshot. |
| `GET /download/:token` | Verifies the token and streams the good from R2. |

## Bindings and hands items

Provisioned this deploy:

- KV namespace `SHOP_ENTITLEMENTS` (`9372634aa5ca4c87937c6d3dd457bef6`).
- SQLite-backed Durable Object `SHOP_FULFILLMENT` / `ShopFulfillment`.
- R2 bucket `shop-561-group-goods`, binding `SHOP_GOODS`, for historical
  fulfillment snapshots that remain under this receiver's custody.
- Secret `SHOP_TOKEN_SECRET` (`wrangler secret put`, random, not in
  source).

**Hands items -- the founder's own account actions, not set here:**
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and
`STRIPE_CUSTOMER_CONTRACT_TOKEN` (`wrangler secret put` from the
authorized payment relationship). Until they are set, purchase is
unavailable and no charge can be started.

The fulfillment object has an internal durable revocation operation for
a verified withdrawal or refund. Automatic Stripe refund-webhook
handling is pending and is not represented as active behavior.

## Deploying

```sh
npm install
npm test
npx wrangler deploy
```

## A stripe-services-section fix this site's deploy required

`@red-cup-engineering/stripe-services-section@0.1.7`'s `src/service.mjs`
computed `createRequire(import.meta.url)` and
`fileURLToPath(import.meta.url)` at module top level. That crashed this
Worker's deploy (`workerd` validation: "must be a file URL object... Received
'undefined'") even though the only code path that needs either --
`loadCatalog`'s on-disk fallback -- is never reached when a caller (this
Worker, always) supplies `options.catalog` and `options.store`, exactly
as the module's own doc comment already promised. Fixed upstream, in
place, as `@red-cup-engineering/stripe-services-section@0.1.8` (deferred
both into a lazy `packageRoot()` helper and a call-time `createRequire()`
inside `loadCatalog`; no exported symbol changed) -- this site pins that
version. Publish receipt:
`web2-platform-services-section/data/logs/` via
`semantic-record-journal-service` (`red-cup-engineering.package-publish-service-record`,
`ni:///sha-256;VmX7fFU1Jqn1JsZo1J3i2-SQWt1qYxUgCpOdgDaDjr8`).

## Testing

```sh
npm test
```

Plain `node --test`, fake KV/R2/`fetch` doubles -- no live Stripe or
Cloudflare calls.
