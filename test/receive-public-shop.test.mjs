import test from 'node:test';
import assert from 'node:assert/strict';
import { receivePublicShop } from '../scripts/receive-public-shop.mjs';

const ORIGIN = 'https://shop.561.group';
const campaign = {
  canonicalUrl: ORIGIN + '/support', merchantDisplayName: 'emsenn', campaignId: 'open-work-2026-10',
  channels: [{id: 'github'}, {id: 'fediverse'}, {id: 'email'}],
  oneTime: {links: {direct: {url: 'https://buy.stripe.com/3cIfZi9HA2Smgni3Io5EY03'},
    github: {url: 'https://buy.stripe.com/9B68wQ9HA50ub2Yen25EY04'},
    fediverse: {url: 'https://buy.stripe.com/cNi8wQg5Y8cG8UQ2Ek5EY05'}}},
  monthly: {url: 'https://buy.stripe.com/28E28s1b4gJcb2Y3Io5EY02'},
};
const catalog = {merchant: {name: '561 Group', legalBody: 'emsenn'},
  offerings: [{id: 'the-x402-economy'}, {id: 'something-else'}]};
const call = fetcher => receivePublicShop({fetcher, campaign, catalog});
const body = (value, type) => new Response(value, {status: 200, headers: {'content-type': type}});
const routing = (rewrite = () => undefined) => async (raw, init) => {
  const url = new URL(raw);
  const key = init.method + ' ' + url.pathname + url.search;
  const custom = rewrite(key, url, init);
  if (custom) return custom;
  if (key === 'GET /') return body('<a href="/support">561 Group</a>', 'text/html');
  if (key === 'GET /catalog.json') return Response.json(catalog);
  if (key === 'GET /support') return body('<div id="billing-support">emsenn <a href="/support/go?kind=one-time&amp;source=direct"></a><a href="/support/go?kind=monthly&amp;source=direct"></a></div>', 'text/html');
  if (key === 'HEAD /support') return new Response(null, {status:200, headers:{'content-type':'text/html'}});
  if (key === 'GET /support/share.json') return Response.json({campaignId: campaign.campaignId,
    items: campaign.channels.map(ch => ({channel: ch.id, shareUrl: campaign.canonicalUrl + '?utm_source=' + ch.id}))});
  if (key === 'GET /sitemap.xml') return body('<loc>' + ORIGIN + '/support</loc>', 'application/xml');
  if (key === 'HEAD /support/go?kind=one-time&source=direct') return new Response(null, {status:303,
    headers:{location:campaign.oneTime.links.direct.url, 'cache-control':'no-store', 'referrer-policy':'no-referrer'}});
  if (key === 'HEAD /support/go?kind=one-time&source=github') return new Response(null, {status:303,
    headers:{location:campaign.oneTime.links.github.url, 'cache-control':'no-store', 'referrer-policy':'no-referrer'}});
  if (key === 'HEAD /support/go?kind=one-time&source=fediverse') return new Response(null, {status:303,
    headers:{location:campaign.oneTime.links.fediverse.url, 'cache-control':'no-store', 'referrer-policy':'no-referrer'}});
  if (key === 'HEAD /support/go?kind=monthly&source=direct') return new Response(null, {status:303,
    headers:{location:campaign.monthly.url, 'cache-control':'no-store', 'referrer-policy':'no-referrer'}});
  if (key === 'POST /support') return new Response(null, {status:405, headers:{allow:'GET, HEAD'}});
  if (key === 'GET /support/go?kind=invalid') return new Response('Offer not found', {status:404});
  return new Response('unexpected request', {status:404});
};

test('positive public buyer route, legal seller, and no implicit payments or redirects', async () => {
  const inputs = [];
  const report = await call(async (url, options) => {
    inputs.push({url, options});
    return routing()(url, options);
  });
  assert.equal(report.kind, 'shop.public-unsigned-buyer-receiving/v1');
  assert.equal(report.acceptedPublicRoutes, true);
  assert.equal(report.cases.length, 12);
  assert.equal(report.cases.every(c => c.finding === 'received'), true);
  assert.equal(report.merchant, 'emsenn');
  assert.equal(report.installedSourceVersion, null);
  assert.equal(report.signedPayment, 'not-attempted');
  assert.equal(report.customerDelivery, 'not-observed');
  assert.equal(report.netSettledCash, 'not-observed');
  assert.equal(inputs.length, 12);
  assert.equal(inputs.every(c => c.url.startsWith(ORIGIN) &&
    c.options.redirect === 'manual' && c.options.credentials === 'omit' &&
    c.options.cache === 'no-store'), true);
  assert.equal(inputs.filter(c => c.options.method === 'POST').length, 1);
  assert.equal(inputs.find(c => c.options.method === 'POST').url, ORIGIN + '/support');
});

test('live 404 is an explicit nonaccepted buyer surface, not a source-success claim', async () => {
  const report = await call(routing((key) => key === 'GET /support' ?
    new Response('Not Found', {status:404}) : undefined));
  assert.equal(report.acceptedPublicRoutes, false);
  assert.deepEqual(report.cases.filter(c => c.finding !== 'received').map(c => [c.case,c.status,c.finding]),
    [['support',404,'unexpected-http-status']]);
});

test('foreign-merchant redirects and broken privacy controls fail without following payment URLs', async () => {
  const called = [];
  const report = await call(async (url, opts) => {
    called.push(url);
    return routing((key) => key === 'HEAD /support/go?kind=one-time&source=direct' ?
      new Response(null, {status:303, headers:{location:'https://buy.stripe.com/WRONG',
        'cache-control':'no-store', 'referrer-policy':'no-referrer'}}) :
      key === 'POST /support' ? new Response(null, {status:200}) : undefined)(url, opts);
  });
  assert.equal(report.acceptedPublicRoutes, false);
  assert.equal(report.cases.find(c => c.case === 'tip-redirect').finding, 'unqualified-merchant-redirect');
  assert.equal(report.cases.find(c => c.case === 'refuse-unsupported-method').finding, 'unexpected-http-status');
  assert.equal(called.every(url => url.startsWith(ORIGIN)), true);
});

test('wrong legal seller and missing original products refuse as incomplete commerce', async () => {
  const report = await call(routing(key => key === 'GET /catalog.json' ?
    Response.json({merchant: {name:'561 Group',legalBody:'unformed-llc'}, offerings:[{id:'invented'}]}) : undefined));
  assert.equal(report.cases.find(c => c.case === 'catalog').finding, 'original-source-consumer-mismatch');
  assert.equal(report.acceptedPublicRoutes, false);
});

test('oversized body, bad content type, and denied transport return finite, private failures', async () => {
  const report = await call(routing(key => {
    if (key === 'GET /support') return new Response('private-buyer@example.invalid', {
      headers:{'content-type':'text/html','content-length':'9999999'}});
    if (key === 'GET /support/share.json') return new Response('{}', {headers:{'content-type':'text/html'}});
    return undefined;
  }));
  assert.equal(report.acceptedPublicRoutes, false);
  assert.equal(report.cases.find(c => c.case === 'support').finding, 'transport-or-bounded-body-refused');
  assert.equal(report.cases.find(c => c.case === 'share').finding, 'unexpected-content-type');
  assert.equal(JSON.stringify(report).includes('private-buyer@example.invalid'), false);
  const failed = await call(async () => {throw new Error('PRIVATE TOKEN - do not print');});
  assert.equal(failed.acceptedPublicRoutes, false);
  assert.equal(failed.cases.every(c => c.finding === 'transport-or-bounded-body-refused'), true);
  assert.equal(JSON.stringify(failed).includes('PRIVATE TOKEN'), false);
});

test('original seller/source and fixed HTTPS origin validate before any network call', async () => {
  let reads = 0;
  const fetcher = async () => {reads++; throw new Error('should not fetch');};
  await assert.rejects(() => receivePublicShop({fetcher, campaign, catalog,
    origin:'https://example.net'}), TypeError);
  await assert.rejects(() => receivePublicShop({fetcher, campaign: {...campaign,merchantDisplayName:'561 Group LLC'}, catalog}), TypeError);
  await assert.rejects(() => receivePublicShop({fetcher, campaign,
    catalog:{...catalog,merchant:{...catalog.merchant, legalBody:'561 Group LLC'}}}), TypeError);
  await assert.rejects(() => receivePublicShop({fetcher, campaign,catalog,timeoutMs:60000}), TypeError);
  assert.equal(reads, 0);
});
