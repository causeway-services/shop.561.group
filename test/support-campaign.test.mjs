import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { campaign, campaignSharePack, supportResponse, validateSupportCampaign } from "../src/support-campaign.mjs";

const get=(path,init={})=>supportResponse(new Request("https://shop.561.group"+path,init));
test("the installed campaign is an independently checkable, bounded Stripe selection",()=>{
 assert.equal(validateSupportCampaign(campaign),true);
 assert.equal(campaign.oneTime.presetCents,25000);
 assert.equal(campaign.oneTime.maxCents,1000000);
 assert.equal(campaign.merchantDisplayName,"emsenn");
 assert.ok(campaign.proof.every(p=>p.url.startsWith("https://github.com/")));
 assert.equal(new Set(campaign.proof.map(p=>p.url)).size,campaign.proof.length);
});
test("landing is public, indexable, accessible and transparent about merchant and prior work",async()=>{
 const response=get("/support?utm_source=fediverse&utm_campaign=open-work-2026-10");
 assert.equal(response.status,200);
 assert.match(response.headers.get("content-type"),/text\/html/);
 assert.match(response.headers.get("content-security-policy"),/default-src 'none'/);
 assert.equal(response.headers.get("set-cookie"),null);
 const html=await response.text();
 assert.match(html,/One-time tip/iu);
 assert.match(html,/emsenn/u);
 assert.match(html,/charitable donation/u);
 assert.match(html,/\/support\/go\?kind=one-time&amp;source=fediverse|\/support\/go\?kind=one-time&source=fediverse/u);
 for(const item of campaign.proof)assert.ok(html.includes(item.url),item.url);
 assert.match(html,/rel="canonical"/u);
 assert.match(html,/name="viewport"/u);
 assert.match(html,/share.json/u);
});
test("support link href attributes use HTML-safe query delimiters without changing fixed Checkout receivers",async()=>{
 const html=await get("/support?utm_source=github").text();
 assert.match(html,/href="\\/support\\/go\\?kind=one-time&amp;source=github"/u);
 assert.match(html,/href="\\/support\\/go\\?kind=monthly&amp;source=github"/u);
 assert.doesNotMatch(html,/href="\\/support\\/go\\?kind=(?:one-time|monthly)&source=/u);
 const redirect=get("/support/go?kind=one-time&source=github");
 assert.equal(redirect.status,303);
 assert.equal(redirect.headers.get("location"),campaign.oneTime.links.github.url);
});

test("monthly supporter can locate the merchant's real private cancellation, billing and refund intake",async()=>{
 const html=await get("/support").text();
 assert.match(html,/Billing, cancellations and refunds/u);
 assert.match(html,/Monthly support is \\$10\\/month until canceled/u);
 assert.match(html,/https:\\/\\/561\\.group\\/contact\\//u);
 assert.match(html,/mailto:emsenn@561\\.group\\?subject=/u);
 assert.match(html,/refund/u);
 assert.match(html,/any applicable tax or fees/u);
 assert.match(html,/not a payment-card number or credential/u);
 assert.match(html,/not a completed cancellation or refund until/u);
 assert.match(html,/do not purchase books, services, exclusive rights/u);
});

test("source-specific click routes are fixed verified payment links, never open redirects",()=>{
 const cases=[["github",campaign.oneTime.links.github.url],["fediverse",campaign.oneTime.links.fediverse.url],["direct",campaign.oneTime.links.direct.url],["https://evil.example",campaign.oneTime.links.direct.url],["unknown",campaign.oneTime.links.direct.url]];
 for(const [source,link] of cases){
  const response=get("/support/go?kind=one-time&source="+encodeURIComponent(source)+"&next=https://evil.example");
  assert.equal(response.status,303);
  assert.equal(response.headers.get("location"),link);
  assert.equal(response.headers.get("cache-control"),"no-store");
  assert.equal(response.headers.get("referrer-policy"),"no-referrer");
 }
 const monthly=get("/support/go?kind=monthly&source=github");
 assert.equal(monthly.status,303);
 assert.equal(monthly.headers.get("location"),campaign.monthly.url);
 assert.equal(get("/support/go?kind=maybe").status,404);
});
test("JSON share pack produces stable UTM landing URLs and attributable provider links",async()=>{
 const response=get("/support/share.json");
 assert.equal(response.status,200);
 assert.equal(response.headers.get("access-control-allow-origin"),"*");
 const pack=await response.json();
 assert.deepEqual(pack,campaignSharePack());
 for(const item of pack.items){
  const u=new URL(item.shareUrl);
  assert.equal(u.origin,"https://shop.561.group");
  assert.equal(u.pathname,"/support");
  assert.equal(u.searchParams.get("utm_source"),item.channel);
  assert.equal(u.searchParams.get("utm_campaign"),campaign.campaignId);
  assert.match(item.suggestedCopy,/https:\/\/shop.561.group\/support\?/);
  if(["github","fediverse"].includes(item.channel))assert.equal(item.paymentAttribution,"channel-specific");
  if(item.channel==="email")assert.equal(item.paymentAttribution,"direct-fallback");
 }
});
test("source and method refusals do not accept arbitrary URL or alternative seller",async()=>{
 assert.equal(get("/support",{method:"POST"}).status,405);
 assert.equal(get("/support/go",{method:"POST"}).status,405);
 assert.equal(get("/support/",{method:"HEAD"}).status,200);
 assert.equal(await get("/support/",{method:"HEAD"}).text(),"");
 assert.throws(()=>validateSupportCampaign({...campaign,merchantDisplayName:"someone else"}),TypeError);
 assert.throws(()=>validateSupportCampaign({...campaign,oneTime:{...campaign.oneTime,links:{direct:{id:"plink_bad",url:"https://evil.example/"}}}}),TypeError);
 assert.throws(()=>validateSupportCampaign({...campaign,proof:[{...campaign.proof[0],url:"javascript:alert(1)"}]}),TypeError);
 assert.throws(()=>validateSupportCampaign({...campaign,oneTime:{...campaign.oneTime,links:{direct:campaign.oneTime.links.direct,github:campaign.oneTime.links.direct}}}),TypeError);
});
test("original Shop Worker mounts the campaign and indexes it without altering book checkout",()=>{
 const source=readFileSync(new URL("../src/worker.mjs",import.meta.url),"utf8");
 assert.match(source,/import \{ supportResponse \} from ".\/support-campaign.mjs"/);
 assert.match(source,/\/support\/share.json/);
 assert.match(source,/\/support\/go/);
 assert.match(source,/\/support", \.\.\.catalog.offerings/);
 assert.match(source,/return runtime.fetch\(request/);
});
