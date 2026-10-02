# shop.561.group

The 561 Group's storefront for people: the books a person buys and reads,
the publications a person subscribes to, and merch when it opens. Agents
buy market-listed books at `market.561.group` over x402, from the same
accepted files. APIs, agent briefings and games are sold on their own sites
and are not listed here. The design is in
`engineering-services-section/content/text/documents/articles/notes/2026/09/27/2026-09-27-note-on-the-human-storefront.md`.

## What this is

A Cloudflare Worker (`src/worker.mjs`) that composes
`@red-cup-engineering/digital-goods-storefront-services-section`, which
owns everything below. This site owns its catalog, its branding, its
bindings and the `ShopFulfillment` Durable Object registration.

- The storefront, rendered by TUFTE: search, facets, book pages with
  covers, contents, formats and sizes, and each edition's verification
  record. Search engines and link previews get Open Graph and schema.org
  data.
- Card checkout through Stripe, and delivery of each book's paid release:
  the pointer at `goods/<release>/release.json` in `shop-561-group-goods`,
  the same one the market reads.
- Reader accounts through Google sign-in (any verified Google account; an
  account is its email).
- A library per reader. It always serves the newest accepted edition.
- Gifts. A gifter named in `SHOP_GIFTERS` gives a book to an email address
  from `/gifts` and gets a link to send. The link delivers the book at once,
  and the recipient keeps it by signing in with that address. A gift can be
  withdrawn.
- A gift API for the house's agents. Review copies are gifts: the outreach
  runner gives one through `/api/gifts` with the gift-agent key, and every
  such gift is recorded as given by `press@561.group`.

## The catalog

`catalog.json` lists the offerings. A book row names:

- its manuscript;
- its acceptance record, or the directory of its files for an edition
  older than acceptance records;
- the cover the ebook pipeline made.

A historical rendition without an `EbookEditionAcceptance` may be listed only
as `coming-soon`. Its surviving files make the work inspectable but do not
turn fabrication into editorial proof or an accepted edition. A cover is
optional until the publication is accepted.

`scripts/compile-catalog.mjs` reads those records into
`src/compiled-catalog.mjs`: title, series, contents, page count, file
sizes, SHA-256s, edition digest and the proof's counts. It also copies the
covers into `public/covers/` (untracked), which the Worker serves as
static assets. Edition state is untracked and is read from the main
worktree, so a deploy from a clean worktree compiles the same catalog.

## Routes

| Route | Behavior |
|---|---|
| `GET /` | The catalog, with search and facets. |
| `GET /goods/:id` | One book's page. |
| `POST /checkout/:id` | Starts a Stripe Checkout Session (same-origin only) and records the signed-in reader's account on it. |
| `POST /webhooks/stripe` | Verifies a Stripe signature and admits a paid, complete session as an entitlement. |
| `GET /thanks?session_id=` | Downloads for a purchase, and "keep it in your library". |
| `GET /library` | The signed-in reader's books. |
| `GET /gifts`, `POST /gifts` | The gifter's form and the gifts they have given. |
| `GET /gifts/:id` | A gift's link: the book, the note and the download. |
| `POST /gifts/:id/revoke` | Withdraws a gift. |
| `GET /api/gifts`, `POST /api/gifts` | Bearer `SHOP_GIFT_AGENT_KEY`. The giftable books; give one (`{offering, email, note?, reference?}` → `{id, url, disposition}`). A `reference` names the same gift every time, so a repeat never gives twice. |
| `GET /api/gifts/:id`, `POST /api/gifts/:id/revoke` | A gift the agent gave: its status; withdraw it. |
| `GET /oauth/login`, `/oauth/callback`, `/oauth/logout` | Google sign-in. |
| `GET /download/:token` | A signed, one-hour link to the entitlement's current release bytes. |
| `GET /catalog.json` | The compiled catalog. |

## Bindings and secrets

- Durable Object `SHOP_FULFILLMENT` / `ShopFulfillment`: checkouts,
  entitlements, accounts and gifts.
- R2 bucket `shop-561-group-goods` (`SHOP_GOODS`): release pointers and
  bundles.
- KV `SHOP_ENTITLEMENTS`: historical custody only. It grants nothing.
- Secrets:
  - `SHOP_TOKEN_SECRET`
  - `SHOP_SESSION_SECRET`
  - `SHOP_GIFTERS` (comma-separated emails)
  - `SHOP_GIFT_AGENT_KEY`: the gift API's key. `pnpm arm-gift-agent` makes
    it, keeps the node's copy at
    `~/.config/561-group/shop.561.group/gift-agent.key` (0600) and puts it
    into the Worker; nothing is printed.
  - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: the Group's Google OAuth
    client, with `https://shop.561.group/oauth/callback` registered as a
    redirect URI.
- Card checkout's secrets: `STRIPE_SECRET_KEY` (a restricted key with only
  Checkout Sessions: Write), `STRIPE_WEBHOOK_SECRET` (the signing secret of
  the destination for `checkout.session.completed` at `/webhooks/stripe`) and
  `STRIPE_CUSTOMER_CONTRACT_TOKEN` (minted when the founder arms, accepting
  the customer-settlement contract). Until all three are set, each book says
  card checkout opens soon and offers x402. `pnpm arm-checkout` sets them:
  the founder signs in to Stripe in the node's assisted browser, creates the
  key and the destination there with the values its step panel shows, and
  pastes each secret into the panel. The script checks the key with Stripe
  and puts each secret into the Worker with `wrangler secret put`; nothing is
  printed or written to disk. It keeps secrets that are already set unless
  `--replace`, and `--test` arms with test-mode Stripe instead.

## Deploying

From a clean worktree of the commit:

```sh
pnpm --filter "@causeway-services/shop..." install --offline --frozen-lockfile
node scripts/compile-catalog.mjs
wrangler deploy
```

## Testing

```sh
node --test test/*.test.mjs
```
