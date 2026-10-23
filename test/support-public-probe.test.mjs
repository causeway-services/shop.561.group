import test from "node:test";
import assert from "node:assert/strict";
import {probePublicSupport} from "../src/support-public-probe.mjs";

const campaign={
 canonicalUrl:"https://shop.561.group/support",campaignId:"open-work-test",title:"Support source-authored open work",
 merchantNotice:"Receipts belong to the original legal merchant, not automatically to the Group.",
 oneTime:{links:{direct:{id:"plink_direct",url:"https://buy.stripe.com/Direct01"},github:{id:"plink_github",url:"https://buy.stripe.com/Github01"}}},
 monthly:{id:"plink_monthly",url:"https://buy.stripe.com/Monthly01"},
 channels:[{id:"github",medium:"referral"},{id:"email",medium:"email"}]
};
const offer=(c,source)=>source==="monthly"?c.monthly.url:c.oneTime.links[source].url;
function reply(url){
 const parsed=new URL(url);
 if(parsed.pathname==="/support")return new Response(`<h1>${campaign.title}</h1><p>${campaign.merchantNotice}</p><a href="/support/go?kind=one-time">Support</a>`,{status:200,headers:{"content-type":"text/html; charset=utf-8"}});
 if(parsed.pathname==="/support/share.json"){
  const items=campaign.channels.map(ch=>{
   const s=new URL(campaign.canonicalUrl);
   s.searchParams.set("utm_source",ch.id);s.searchParams.set("utm_medium",ch.medium);s.searchParams.set("utm_campaign",campaign.campaignId);
   return {channel:ch.id,medium:ch.medium,shareUrl:s.toString(),paymentLinkId:(campaign.oneTime.links[ch.id]??campaign.oneTime.links.direct).id};
  });
  return Response.json({campaignId:campaign.campaignId,landingUrl:campaign.canonicalUrl,items});
 }
 const kind=parsed.searchParams.get("kind");
 const source=kind==="monthly"?"monthly":parsed.searchParams.get("source");
 return new Response(null,{status:303,headers:{location:offer(campaign,source),"referrer-policy":"no-referrer"}});
}
test("public buyer-route receiving checks merchant, attribution, real link redirects without following Stripe",async()=>{
 const calls=[];
 const receipt=await probePublicSupport({campaign,fetcher:async(url,init)=>{calls.push([url,init]);return reply(url);},now:()=>"2026-10-23T20:30:00Z"});
 assert.equal(receipt.publicRouteReceiving,"passed");
 assert.equal(receipt.checks.length,5);
 assert.ok(receipt.checks.every(x=>x.outcome==="matched"));
 assert.equal(receipt.exactDeployedRevisionReceived,false);
 assert.equal(receipt.groupAfterCostSettledProceedsCents,null);
 assert.equal(receipt.customerAcceptedDelivery,null);
 assert.equal(receipt.paymentAuthorizationAttempted,false);
 assert.ok(calls.every(([url,init])=>url.startsWith("https://shop.561.group/")&&init.method==="GET"&&init.redirect==="manual"&&init.credentials==="omit"));
 assert.ok(calls.every(([url])=>!url.startsWith("https://buy.stripe.com")));
});
test("stale installed merchant disclosure or wrong redirect is failed buyer-route receiving, not paid demand",async()=>{
 const receipt=await probePublicSupport({campaign,fetcher:async url=>{
  const response=reply(url);
  if(url.includes("source=github")&&url.includes("/support/go"))
   return new Response(null,{status:303,headers:{location:"https://buy.stripe.com/Wrong01","referrer-policy":"no-referrer"}});
  return response;
 }});
 assert.equal(receipt.publicRouteReceiving,"failed");
 assert.equal(receipt.checks.find(x=>x.name==="checkout-redirect:github").outcome,"mismatched");
 assert.equal(receipt.customerAcceptedDelivery,null);
});
test("network denial is unknown, not evidence of a failed deployed Worker or no sale",async()=>{
 const receipt=await probePublicSupport({campaign,fetcher:async()=>{throw new Error("credential-containing failure");}});
 assert.equal(receipt.publicRouteReceiving,"unknown");
 assert.ok(receipt.checks.every(x=>x.httpStatus===null&&x.outcome==="unobserved"));
 assert.ok(!JSON.stringify(receipt).includes("credential-containing"));
});
test("refuse substituted Shop origins, duplicate receiver destinations and unbounded timeouts before fetching",async()=>{
 let count=0;const fetcher=async()=>{count++;return reply("https://shop.561.group/support");};
 const invalid=[
  {...campaign,canonicalUrl:"https://bad.example/support"},
  {...campaign,oneTime:{links:{direct:{...campaign.oneTime.links.direct},github:{...campaign.oneTime.links.direct}}}},
  {...campaign,monthly:{...campaign.monthly,url:campaign.oneTime.links.direct.url}}
 ];
 for(const c of invalid)await assert.rejects(probePublicSupport({campaign:c,fetcher}),TypeError);
 await assert.rejects(probePublicSupport({campaign,fetcher,timeoutMs:60000}),TypeError);
 assert.equal(count,0);
});
