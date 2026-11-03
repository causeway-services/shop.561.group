/**
 * Atom 1.0 discovery projection of the original Shop catalog. A feed entry
 * describes an accepted, source-listed edition; it is not checkout admission,
 * publisher authorization for an outside retailer, or proof of a paid sale.
 */
const ORIGIN = 'https://shop.561.group';
const FEED_URL = `${ORIGIN}/books.atom`;

function xml(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function acceptedShopBooks(catalog) {
  return (catalog?.offerings ?? [])
    .filter((item) => item.status === 'live'
      && item.book?.edition?.digest
      && Number.isFinite(Date.parse(item.book.edition.acceptedAt ?? ''))
      && typeof item.id === 'string' && item.id.length > 0
      && typeof item.title === 'string' && item.title.length > 0)
    .sort((a, b) => Date.parse(b.book.edition.acceptedAt) - Date.parse(a.book.edition.acceptedAt)
      || a.id.localeCompare(b.id));
}

function listingPrice(item) {
  if (!Number.isSafeInteger(item.priceCents) || item.priceCents < 0
    || !/^[a-zA-Z]{3}$/.test(item.currency ?? '')) return '';
  try {
    const price = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: item.currency.toUpperCase(),
    }).format(item.priceCents / 100);
    return `Catalog list price: ${price}.`;
  } catch {
    return '';
  }
}

export function bookAtomFeed(catalog) {
  const offerings = acceptedShopBooks(catalog);
  if (offerings.length === 0) return null;
  const updated = offerings[0].book.edition.acceptedAt;
  const entries = offerings.map((item) => {
    const href = `${ORIGIN}/goods/${encodeURIComponent(item.id)}`;
    const summary = [item.blurb, listingPrice(item),
      'Confirm current availability, payment and delivery on the product page.']
      .filter(Boolean).join(' ');
    return `  <entry>\n    <title>${xml(item.title)}</title>\n    <id>${xml(href)}</id>\n    <updated>${xml(item.book.edition.acceptedAt)}</updated>\n    <link rel="alternate" type="text/html" href="${xml(href)}"/>\n    <summary type="text">${xml(summary)}</summary>\n  </entry>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<feed xmlns="http://www.w3.org/2005/Atom">\n` +
    `  <title>561 Group books</title>\n` +
    `  <subtitle>Source-listed accepted editions. Dates reflect edition acceptance, not current checkout availability.</subtitle>\n` +
    `  <id>${FEED_URL}</id>\n` +
    `  <updated>${xml(updated)}</updated>\n` +
    `  <author><name>Causeway Services</name></author>\n` +
    `  <link rel="self" type="application/atom+xml" href="${FEED_URL}"/>\n` +
    `  <link rel="alternate" type="text/html" href="${ORIGIN}/"/>\n` +
    `${entries}\n</feed>\n`;
}
