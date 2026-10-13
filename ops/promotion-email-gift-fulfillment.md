# Promotion-email gift fulfillment — operational contract

Owner: Causeway Public Services (books/press), consuming the Red Cup digital-goods storefront's existing fulfillment primitives. First receiving case: Sigrid Song, *Ice Out*. Status: specified; outbound-mail-to-entitlement orchestration and live receiving **not yet verified**.

## The actual practice

An authorized press agent decides to give a named recipient a retail ebook (or explicitly a time-limited review edition) while promoting the work by email. The email includes the normal public book page `https://shop.561.group/goods/<offering>` and may carry `gift-to-email=<recipient>` as an *intention/evidence correlation hint*. The recipient must acquire their own copy **because the email was successfully sent through an authorized channel to that address**, not because they clicked a URL or because an arbitrary visitor supplied an address in a query string. The email may include a private gift URL when the grant has actually been recorded. Do not confuse gift (current retail release, library access) with advance review copy (stamped artifact, bounded window and review terms).

## Existing capabilities to reuse, not rewrite

- Shop Worker in `src/worker.mjs` composes Red Cup's digital-goods storefront runtime; its Durable Object is the authoritative entitlement store.
- `POST /api/gifts` with bearer `SHOP_GIFT_AGENT_KEY` accepts `{offering,email,note?,reference?}`, returns `{id,url,disposition}`. Stable `reference` makes retries idempotent. House grants are attributed to `press@561.group`.
- `GET /api/gifts/:id` and `POST /api/gifts/:id/revoke` receive or withdraw gifts.
- For review copies, artifact first staged in `shop-561-group-goods` and then `POST /api/review-copies` with matching edition/bytes, expiry, and recipient. Do not provide a full retail gift where the intended right is a review window.
- Recipients retain ordinary gifted books by authenticating as the matching email. Public `GET /gifts/:id` permits immediate gift-link access.
- `scripts/arm-gift-agent.mjs` provisions the key; never expose it in an email, URL, logs, repository, or client code.

## One transaction, not a collection of fire-and-forget actions

1. **Authorize**: approve exactly one book, edition/right class, recipient, from-address, and campaign. Record the actual recipient of each message (including personalization) before dispatch. Validate address and promotional-consent/legal basis independently; gifting does not waive anti-spam requirements.
2. **Prepare**: generate a campaign/message id and a stable grant reference (e.g. `press-email:<message-id>:<offering>:<recipient-key>`). Preserve full recipient email only in access-controlled operational storage. Reject inconsistent reuse of the same reference.
3. **Dispatch**: use the approved mail connector; require the provider's successful send acceptance/message ID, not merely a drafted or queued message. Record the mail message ID, sender, recipient, campaign, offering, exact outbound URL and send timestamp. An attempted, drafted, rejected or failed send does **not** grant the book.
4. **Grant**: after send acceptance, invoke existing `POST /api/gifts` with recipient/offering/stable reference; persist its grant id, disposition and returned private gift URL. Retry transient failures with the *same* reference. Do not create another entitlement store or mint one from a public GET request.
5. **Receive**: read back `GET /api/gifts/:id` and verify the recipient, offering and active status. Confirm that a matching signed-in reader sees the book in their library (using a consented test mailbox); receive a real download, matching current accepted edition digest. A successful API POST alone is insufficient for production acceptance.
6. **Reconcile**: persist states `prepared → send-accepted → grant-pending → granted → received`, with `send-failed`, `grant-failed`, `revoked`, and `review-expired` as appropriate. Run a repair sweep for *sent but ungranted* recipients, reusing the original reference. Audit without double granting.
7. **Notify**: initial promotional message should truthfully say the copy is being given only if the gift has already been successfully granted; otherwise phrase the email as an offer, and send the private entitlement link in a follow-up after granting. If the required practice is explicitly **send triggers grant**, keep promotion wording consistent with this asynchronous ordering. Never silently pretend the initial outbound message contained a URL that did not exist yet.

## URL handling and trust boundaries

`gift-to-email` on a shop product link is **not a bearer entitlement token or an authorization request**. It is untrusted and may be leaked in email scanners, previews, referrers, analytics and forwarded messages. Prefer correlating the email recipient through the authorized sender's dispatch record, with an opaque campaign/message identifier in the public URL and no personally identifying query string. If the legacy `gift-to-email` syntax is accepted by internal email composition, strip the address from the public browsing URL, set `Referrer-Policy: no-referrer`, avoid analytics capture of personal emails, and NEVER permit a request to mint a grant based on query parameters.

## Operational receiving cases

- Genuine outbound success + transient gift API failure → reconciliation creates **one** grant.
- Draft/failed outbound → **zero** grants.
- Duplicate send notification/replay → one reference, one active grant; mismatched repeated request rejected.
- Multiple recipients in a mail campaign → distinct recipient-bound grants, no cross-recipient rights.
- Forwarded/public URL with another email → zero grants.
- Recipient account signs in using actual intended address → retained library entitlement.
- A recipient's non-Google sign-in scenario is documented honestly; Google is the currently documented account provider.
- Preview/scanner click → no grant; cancellation/revocation correctly propagated.
- Review copy expiry/withdrawal → 410 on access; never accidentally become permanent retail grant.
- Staging missing or edition digest mismatch → review copy not issued.
- Reconcile after process crash from send-accepted state → same gift reference, no duplicate.
- Production evidence records mail acceptance, grant readback, library/read access, artifact digest, and revocation, omitting secrets and unnecessary personal data.

## Ownership and closure

Causeway press owns campaign decision, sender identity, recipient/campaign ledger and delivery reconciliation. Red Cup owns reusable entitlement/gift semantics and integrity of authenticated grant issuance. Coesite owns actual deployed bindings, durable-state receipt, delivery monitoring and recovery. Science evaluates the evidence and failure modes. All must use the existing shop's Durable Object instead of inventing a parallel gift database.

**Not done until:** an approved live test message is sent, its shop gift is present *only after* send acceptance, independent recipient access is verified, replay and failure repair are exercised, and the operating agent can perform the whole procedure without handcrafted requests. Do not report production readiness based on this document, existing routes or a green unit test.
