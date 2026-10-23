import assert from "node:assert/strict";
import test from "node:test";
import { acceptedShopBooks, bookAtomFeed } from "../src/book-feed.mjs";

function book(id, options = {}) {
  return {
    id, title: options.title ?? "Accepted & Reviewed <Book>",
    status: options.status ?? "live", blurb: options.blurb ?? "A <careful> source summary",
    priceCents: options.priceCents ?? 1250, currency: options.currency ?? "usd",
    book: { edition: { digest: options.digest ?? "ni:///sha-256;source-edition",
      acceptedAt: options.acceptedAt ?? "2026-10-20T15:00:00Z" } },
  };
}

test("Atom publishes only accepted live editions, newest first, not held merchandise", () => {
  const original = { offerings: [
    book("older", { acceptedAt: "2026-10-01T10:00:00Z" }),
    book("not-accepted", { digest: "" }),
    book("not-for-sale", { status: "coming-soon" }),
    book("newer", { acceptedAt: "2026-10-21T10:00:00Z", title: "New edition" }),
    { id: "merch", title: "Unreleased merchandise", status: "coming-soon" },
    book("bad-date", { acceptedAt: "not-a-date" }),
  ] };
  assert.deepEqual(acceptedShopBooks(original).map(b => b.id), ["newer", "older"]);
  const feed = bookAtomFeed(original);
  assert.match(feed, /<feed xmlns="http:\/\/www.w3.org\/2005\/Atom">/u);
  assert.match(feed, /<updated>2026-10-21T10:00:00Z<\/updated>/u);
  assert.ok(feed.indexOf("/goods/newer") < feed.indexOf("/goods/older"));
  for (const hidden of ["not-accepted", "not-for-sale", "bad-date", "Unreleased merchandise"]) {
    assert.equal(feed.includes(hidden), false);
  }
  assert.match(feed, /Confirm current availability, payment and delivery/u);
  assert.doesNotMatch(feed, /checkout\.session|payment_authorization|buy_now/u);
});

test("Atom escapes authored text and preserves original Shop detail identities", () => {
  const feed = bookAtomFeed({ offerings: [book("special&edition", { title: 'Tea & <Tools> "Today"',
    blurb: "Learn > repeat & grow", priceCents: 2500 })] });
  assert.match(feed, /Tea &amp; &lt;Tools&gt; &quot;Today&quot;/u);
  assert.match(feed, /Learn &gt; repeat &amp; grow/u);
  assert.match(feed, /\/goods\/special%26edition/u);
  assert.match(feed, /Catalog list price: \$25\.00/u);
  assert.doesNotMatch(feed, /<Tools>|<script>|href="[^"]*&edition/u);
});

test("Atom returns no invented feed when no accepted live books exist", () => {
  assert.equal(bookAtomFeed({offerings:[]}), null);
  assert.equal(bookAtomFeed({offerings:[book("soon",{status:"coming-soon"})]}), null);
});
