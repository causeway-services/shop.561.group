# Open-work patronage marketing — original Shop campaign

**Original provider:** [shop.561.group](https://github.com/causeway-services/shop.561.group), the 561 Group's one-provider Shop, NOT the multi-provider Bazaar or the Market dashboard.

**Source of truth:** `data/records/marketing/open-work-campaign.json`. It contains a documented snapshot of the payment routes observed from the connected, **live emsenn sole-proprietor Stripe account on 2026-10-22**. Provider payment truth remains in Stripe; the source record is a public campaign projection, not a merchant credential or ledger. The existing `externalStripePaymentLinkReceivers` source/Shop webhook path is separate from this marketing presentation and is **not** silently extended or claimed installed for newly made tips.

## Real buyer actions

- `GET /support`: indexable human proof-of-work page, canonical metadata, two authentic payment choices and honest receiving-merchant disclosure. `?utm_source=github|fediverse|email` chooses a source for that page's one-time CTA. Unknown input is treated as direct.
- `GET /support/go?kind=one-time&source=github|fediverse|direct`: 303 to the matching **actual** fixed Stripe Payment Link with `cache-control: no-store` and `referrer-policy: no-referrer`. No arbitrary return URLs or unverified merchant destinations. One-time amounts are customer-chosen $5–$10,000 because Stripe's live API limits custom-amount prices to $10,000. Larger bespoke contributions can use a separate invoice/payment route, rather than having the campaign pretend the variable price has no bound.
- `GET /support/go?kind=monthly`: the existing $10/month recurring Stripe support link. It is not reclassified as one-time appreciation.
- `GET /support/share.json`: machine-readable, public, versioned outbound texts and tagged landing-page URLs.
- `pnpm marketing:open-work`: copies shareable Fediverse, GitHub and qualified email drafts from the *same* source.
- `pnpm marketing:attribution`: exports the expected source-channel → original Stripe Payment Link ID mapping. An email visitor uses the direct fallback and is **not** falsely counted as an email-attributed payment.

## Marketing experiment (small, real, repeatable)

1. **GitHub**: put the one-time Stripe route on the original Group TIPS/funding page and link readers of published code or research to the proof page. Do not change a third-party organization's code or represent a private repository as public.
2. **Fediverse**: publish one short, independently inspectable artifact and its provenance before each patronage appeal. Use the generated tagged landing link from the Group's own authorized publishing channels, without synthetic endorsements or deceptive personae.
3. **Warm outreach**: share one or two relevant public artifacts with individually relevant contacts who plausibly support independent open work; use the email variant only for consentful introductions and authentic replies, not bought lists or unsolicited bulk campaigns.
4. **Experiment**: compare positive replies, verified referral visits (where a qualified privacy-respecting host metric exists), Stripe checkout sessions, paid tips and refunds per tagged payment-link ID; improve the public proof, first sentence and channel mix from actual measured demand. Never invent conversion rates.

## Receiving and bookkeeping

The Stripe product is `prod_VUXqIGf67kh5jW`; variable price `price_1UTYl0J1vYnPQu2NNFgu6zTV`. Observed one-time Payment Link IDs:

- direct `plink_1UTYlBJ1vYnPQu2NMI05UJzD`
- GitHub `plink_1UTYn0J1vYnPQu2NCojQuuMY`
- Fediverse `plink_1UTYn2J1vYnPQu2NPN1weGJ6`

Existing monthly provider link: `plink_1USMywJ1vYnPQu2NWHtcqx0b`. All four links were observed live on the same merchant account during this work. One-time links share the same price but carry separate `campaign` and `channel` metadata on resulting Checkout Sessions, allowing settlement queries to disambiguate original intent. A link view or button click is never a payment. A successful Checkout Session is gross collected consideration, **not** bank-settled net cash: use the original Tips verification, Stripe fee/refund and bank-ledger receiving before reporting funds available.

No gift, equity, charitable deductibility, special access, ongoing deliverable, sponsored findings, tax advice, or investment return is offered. Source codes remain under their own repository licenses and CARE obligations; the company brand and sole-proprietor receiving merchant are distinct. The cash recipient and refund/payment support are visible in checkout.

## Deployment and rollback

Before making `/support` a live campaign destination, run `pnpm check`, `pnpm test`, `pnpm marketing:open-work`, and `pnpm wrangler deploy --dry-run` in an installation with the original pinned supplier packages; independently verify real HTTP `/support`, `/support/share.json`, redirect links and `/sitemap.xml` after the authorized Worker release. The source-only GitHub preflight independently executes `node --test test/support-campaign.test.mjs` and the export commands without remote credentials. The source branch or green test alone never proves Cloudflare deployment. Rollback can remove the support route or deactivate a Stripe Payment Link after correct authorization; the existing book/gift storefront and recurring support remain unchanged. Do not automatically move tip money into any other account.
