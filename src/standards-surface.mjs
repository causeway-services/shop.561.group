/**
 * The web's ordinary standards for one 561 Group commerce property, as a wrapper
 * around the Worker that serves it. The wrapped Worker keeps every route, price
 * and payment path it has; this adds only what a crawler, a social card
 * renderer, an answer engine and a browser's security model expect:
 *
 *  - robots.txt, sitemap.xml, llms.txt, /.well-known/security.txt (RFC 9116)
 *  - the brand icons and the Open Graph card
 *  - missing head metadata on HTML pages (description, canonical, Open Graph,
 *    Twitter card, icons, WebSite and Organization JSON-LD); metadata a page
 *    already carries is never replaced, except the home page's card type
 *  - transport and content-handling headers on every response, and a
 *    Content-Security-Policy on HTML responses that do not carry one
 *  - Leader requirement R3: no public response names the Leader. Superproject
 *    path prefixes are made repository-relative and any remaining occurrence of
 *    a forbidden name is replaced before the response leaves.
 *
 * This file is copied verbatim into each site that uses it (published packages
 * cannot be a deploy dependency before their repository's main is received);
 * keep the copies identical.
 * @module
 */

const AI_CRAWLERS = Object.freeze(['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot',
  'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot']);
const CAUSEWAY = Object.freeze({ '@type': 'Organization', '@id': 'https://services.561.group/#organization', name: 'Causeway Services', url: 'https://services.561.group/' });
const GROUP = Object.freeze({ '@type': 'Organization', '@id': 'https://561.group/#organization', name: '561 Group', url: 'https://561.group/' });
const SUPERPROJECT_PREFIX = /(?:[\w.@-]+\/)*services\/561-group\/services\/([\w.-]+)\//gu;
const TEXTUAL = /^(?:text\/(?!event-stream)|application\/(?:json|[\w.+-]+\+json|xml|[\w.+-]+\+xml|javascript))/iu;

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/gu, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const escapeXml = escapeHtml;
const jsonLd = (value) => `<script type="application/ld+json">${JSON.stringify(value).replace(/</gu, '\\u003c')}</script>`;

/** Text with the Leader's superproject paths made repository-relative and any remaining forbidden name replaced. */
export function scrubPublicText(text) {
  return text.replace(SUPERPROJECT_PREFIX, '$1:').replace(/emsenn|sennhauser/giu, 'withheld');
}

/**
 * @param {object} site
 * @param {string} site.origin Canonical origin, no trailing slash.
 * @param {string} site.name Site name, for JSON-LD and Open Graph.
 * @param {string} site.description 50-160 characters, used where a page has none.
 * @param {object} site.brandAssets Map of absolute path to {type, body}; must include /card.png, /favicon.svg, /apple-touch-icon.png and /logo.png.
 * @param {string} site.llmsTxt The /llms.txt body (llmstxt.org).
 * @param {() => ReadonlyArray<{path: string, changefreq?: string}>} site.sitemapPaths Pages and documents to list.
 * @param {string} site.lastmod ISO date (YYYY-MM-DD) of this release.
 * @param {ReadonlyArray<string>} site.robotsDisallow Machine and POST endpoints that crawlers should skip.
 * @param {string} site.csp Content-Security-Policy for HTML responses that carry none.
 * @param {string} [site.searchTarget] URL template with {search_term_string}, when the site has search.
 * @param {string} [site.organizationType] Extra schema.org type for the site's own entity, e.g. OnlineStore.
 * @param {string} [site.organizationDescription]
 * @param {(pathname: string) => boolean} [site.canonicalKeepsQuery] Whether a page's identity includes its query string.
 * @param {number} [site.securityTxtDays] Days until security.txt expires (default 180).
 */
export function createStandardsSurface(site) {
  const { origin } = site;
  const card = `${origin}/card.png`;
  const readOnly = new Set(['GET', 'HEAD']);
  const securityHeaders = (headers) => {
    headers.set('strict-transport-security', 'max-age=63072000');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('referrer-policy', 'strict-origin-when-cross-origin');
    return headers;
  };
  const standalone = (request, body, type, cache = 'public, max-age=3600', status = 200) => {
    const headers = securityHeaders(new Headers({ 'content-type': type, 'cache-control': cache }));
    return new Response(request.method === 'HEAD' ? null : body, { status, headers });
  };

  const robotsText = () => {
    const rules = `Allow: /\n${site.robotsDisallow.map((path) => `Disallow: ${path}`).join('\n')}\n`;
    return `# ${new URL(origin).host}: crawling the pages and public documents is welcome.\n# Machine and POST endpoints are disallowed.\n\n`
      + `${AI_CRAWLERS.map((agent) => `User-agent: ${agent}`).join('\n')}\n${rules}\nUser-agent: *\n${rules}\nSitemap: ${origin}/sitemap.xml\n`;
  };
  const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${site.sitemapPaths().map(({ path, changefreq = 'weekly' }) =>
    `  <url><loc>${escapeXml(origin + path)}</loc><lastmod>${escapeXml(site.lastmod)}</lastmod><changefreq>${changefreq}</changefreq></url>`).join('\n')}\n</urlset>\n`;
  const securityTxt = (now = Date.now()) => {
    const expires = new Date(now + (site.securityTxtDays ?? 180) * 24 * 3600 * 1000).toISOString().replace(/\.\d+Z$/u, 'Z');
    return `Contact: mailto:cto@561.group\nExpires: ${expires}\nPreferred-Languages: en\nCanonical: ${origin}/.well-known/security.txt\n`;
  };

  /** The home page's WebSite and Organization graph. */
  const graph = () => ({
    '@context': 'https://schema.org',
    '@graph': [
      { ...CAUSEWAY, parentOrganization: GROUP },
      GROUP,
      {
        '@type': ['Organization', ...(site.organizationType ? [site.organizationType] : [])], '@id': `${origin}/#organization`,
        name: site.name, url: `${origin}/`, logo: `${origin}/logo.png`, image: card,
        description: site.organizationDescription ?? site.description,
        parentOrganization: [{ ...CAUSEWAY, parentOrganization: GROUP }, GROUP],
      },
      {
        '@type': 'WebSite', '@id': `${origin}/#website`, name: site.name, url: `${origin}/`, inLanguage: 'en', description: site.description,
        publisher: { '@id': `${origin}/#organization` },
        ...(site.searchTarget ? { potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: site.searchTarget }, 'query-input': 'required name=search_term_string' } } : {}),
      },
    ],
  });

  /** Add the head metadata a page lacks. Existing metadata is kept. */
  function enhanceHtml(html, url) {
    const end = html.search(/<\/head>/iu);
    if (end < 0) return html;
    let head = html.slice(0, end);
    const has = (pattern) => pattern.test(head);
    const title = head.match(/<title[^>]*>([^<]*)<\/title>/iu)?.[1]?.trim() ?? site.name;
    const home = url.pathname === '/';
    const canonical = `${origin}${url.pathname}${site.canonicalKeepsQuery?.(url.pathname) ? url.search : ''}`;
    const description = head.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/iu)?.[1] ?? escapeHtml(site.description);
    let add = '';
    if (!has(/<meta[^>]+name=["']description["']/iu)) add += `<meta name="description" content="${escapeHtml(site.description)}">`;
    if (!has(/<link[^>]+rel=["']canonical["']/iu)) add += `<link rel="canonical" href="${escapeHtml(canonical)}">`;
    if (!has(/property=["']og:type["']/iu)) add += '<meta property="og:type" content="website">';
    if (!has(/property=["']og:title["']/iu)) add += `<meta property="og:title" content="${escapeHtml(title)}">`;
    if (!has(/property=["']og:description["']/iu)) add += `<meta property="og:description" content="${description}">`;
    if (!has(/property=["']og:url["']/iu)) add += `<meta property="og:url" content="${escapeHtml(canonical)}">`;
    if (!has(/property=["']og:site_name["']/iu)) add += `<meta property="og:site_name" content="${escapeHtml(site.name)}">`;
    if (!has(/property=["']og:image["']/iu)) {
      add += `<meta property="og:image" content="${card}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escapeHtml(site.name)}">`;
      if (has(/name=["']twitter:card["']/iu)) head = head.replace(/(name=["']twitter:card["'][^>]*content=["'])summary(["'])/iu, '$1summary_large_image$2');
    }
    if (!has(/name=["']twitter:card["']/iu)) add += `<meta name="twitter:card" content="summary_large_image">`;
    if (!has(/rel=["']icon["']/iu)) add += '<link rel="icon" href="/favicon.svg" type="image/svg+xml">';
    if (!has(/rel=["']apple-touch-icon["']/iu)) add += '<link rel="apple-touch-icon" href="/apple-touch-icon.png">';
    if (!has(/rel=["']alternate["'][^>]*llms\.txt/iu)) add += '<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt">';
    if (home && !has(/application\/ld\+json/iu)) add += jsonLd(graph());
    return add ? head + add + html.slice(end) : head + html.slice(end);
  }

  /** The transport and content-handling headers, the page policy and R3, applied to a response this site serves. */
  async function finish(request, response) {
    const headers = securityHeaders(new Headers(response.headers));
    const type = headers.get('content-type') ?? '';
    const isHtml = /^text\/html/iu.test(type);
    if (isHtml && !headers.has('content-security-policy')) headers.set('content-security-policy', site.csp);
    if (response.body === null || request.method === 'HEAD' || !TEXTUAL.test(type)) {
      return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, statusText: response.statusText, headers });
    }
    let text = scrubPublicText(await response.text());
    if (isHtml) text = enhanceHtml(text, new URL(request.url));
    headers.delete('content-length');
    return new Response(text, { status: response.status, statusText: response.statusText, headers });
  }

  const assets = site.brandAssets;
  return Object.freeze({
    graph, robotsText, sitemapXml, securityTxt, enhanceHtml,
    /**
     * @param {Request} request
     * @param {(request: Request) => Promise<Response> | Response} inner The wrapped Worker's fetch.
     * @returns {Promise<Response>}
     */
    async fetch(request, inner) {
      const { pathname } = new URL(request.url);
      if (readOnly.has(request.method)) {
        if (pathname === '/robots.txt') return standalone(request, robotsText(), 'text/plain; charset=utf-8');
        if (pathname === '/sitemap.xml') return standalone(request, sitemapXml(), 'application/xml; charset=utf-8');
        if (pathname === '/llms.txt') return standalone(request, site.llmsTxt, 'text/plain; charset=utf-8');
        if (pathname === '/.well-known/security.txt') return standalone(request, securityTxt(), 'text/plain; charset=utf-8');
        if (Object.hasOwn(assets, pathname)) return standalone(request, assets[pathname].body, assets[pathname].type, 'public, max-age=86400');
      }
      return finish(request, await inner(request));
    },
  });
}
