/** Read-only installed-public-route receiving for the original Shop support campaign.
 * GET never follows Stripe redirects, sends no cookies, never starts Checkout,
 * and does not establish a deployed revision, paid sale or cleared proceeds.
 */
const isObject=value=>value!==null&&typeof value==="object"&&!Array.isArray(value);
const knownURL=value=>typeof value==="string"&&/^https:\/\/buy\.stripe\.com\/[A-Za-z0-9]+$/.test(value);
const sameOrigin=(left,right)=>new URL(left).origin===new URL(right).origin;

function checkCampaign(campaign){
 if(!isObject(campaign)||campaign.canonicalUrl!=="https://shop.561.group/support"||
    typeof campaign.campaignId!=="string"||typeof campaign.title!=="string"||
    typeof campaign.merchantNotice!=="string"||campaign.merchantNotice.length<15||
    !isObject(campaign.oneTime)||!isObject(campaign.oneTime.links)||
    !isObject(campaign.monthly)||!knownURL(campaign.monthly.url)||
    !Array.isArray(campaign.channels)||!campaign.channels.length)
  throw new TypeError("Source-qualified public Shop support campaign required");
 const links=Object.entries(campaign.oneTime.links);
 if(links.length<1||links.length>8||!links.some(([channel])=>channel==="direct")||
    links.some(([channel,link])=>!/^[a-z0-9-]+$/.test(channel)||!knownURL(link?.url)))
  throw new TypeError("Bounded source-owned support payment-link routes required");
 const ids=new Set(links.map(([,link])=>link.url));
 if(ids.size!==links.length||ids.has(campaign.monthly.url))
  throw new TypeError("Distinct original Stripe routes required");
 return links;
}

function expectedShareRows(campaign){
 return campaign.channels.map(channel=>{
  const source=campaign.oneTime.links[channel.id]??campaign.oneTime.links.direct;
  const url=new URL(campaign.canonicalUrl);
  url.searchParams.set("utm_source",channel.id);
  url.searchParams.set("utm_medium",channel.medium);
  url.searchParams.set("utm_campaign",campaign.campaignId);
  return {channel:channel.id,medium:channel.medium,shareUrl:url.toString(),paymentLinkId:source.id};
 });
}

/** Public, non-mutating probe. `fetcher` injection is for deterministic source-only tests. */
export async function probePublicSupport({campaign,fetcher=globalThis.fetch,timeoutMs=7000,now=()=>new Date().toISOString()}={}){
 const links=checkCampaign(campaign);
 if(typeof fetcher!=="function"||!Number.isInteger(timeoutMs)||timeoutMs<100||timeoutMs>30000)
  throw new TypeError("Bounded read-only fetch implementation required");
 const origin=new URL(campaign.canonicalUrl).origin;
 const cases=[
  {name:"landing",path:"/support?utm_source=github",kind:"landing"},
  {name:"share-pack",path:"/support/share.json",kind:"share"},
  ...links.map(([channel,link])=>({
   name:`checkout-redirect:${channel}`,path:`/support/go?kind=one-time&source=${encodeURIComponent(channel)}`,
   kind:"redirect",destination:link.url
  })),
  {name:"checkout-redirect:monthly",path:"/support/go?kind=monthly&source=direct",kind:"redirect",destination:campaign.monthly.url}
 ];
 const checks=await Promise.all(cases.map(async ({name,path,kind,destination})=>{
  const url=new URL(path,origin);
  if(!sameOrigin(url.href,campaign.canonicalUrl))throw new TypeError("Probe may not leave the original Shop origin");
  try{
   const response=await fetcher(url.href,{
    method:"GET",redirect:"manual",credentials:"omit",cache:"no-store",
    headers:{accept:kind==="share"?"application/json":"text/html,*/*;q=0.5"},
    signal:AbortSignal.timeout(timeoutMs)
   });
   if(!response||typeof response.status!=="number"||!response.headers)
    return {name,requestPath:url.pathname,outcome:"unobserved",httpStatus:null};
   let matches=false;
   if(kind==="redirect"){
    matches=response.status===303&&response.headers.get("location")===destination&&
      response.headers.get("referrer-policy")==="no-referrer";
   }else if(kind==="landing"&&response.status===200&&
     /text\/html/i.test(response.headers.get("content-type")??"")){
    const html=await response.text();
    matches=html.length<250000&&html.includes(campaign.title)&&
     html.includes(campaign.merchantNotice)&&html.includes("/support/go?kind=one-time");
   }else if(kind==="share"&&response.status===200&&
     /application\/json/i.test(response.headers.get("content-type")??"")){
    const payload=await response.json();
    const expected=expectedShareRows(campaign);
    matches=isObject(payload)&&payload.campaignId===campaign.campaignId&&
      payload.landingUrl===campaign.canonicalUrl&&Array.isArray(payload.items)&&
      payload.items.length===expected.length&&expected.every(item=>payload.items.some(actual=>
       actual?.channel===item.channel&&actual?.medium===item.medium&&
       actual?.shareUrl===item.shareUrl&&actual?.paymentLinkId===item.paymentLinkId));
   }
   return {name,requestPath:url.pathname,outcome:matches?"matched":"mismatched",httpStatus:response.status};
  }catch{
   // A network problem is UNKNOWN, not proof of no deployment. Do not log
   // response text, cookies, credentials, or a Stripe Checkout destination.
   return {name,requestPath:url.pathname,outcome:"unobserved",httpStatus:null};
  }
 }));
 const publicRouteReceiving=checks.every(check=>check.outcome==="matched")?"passed":
  checks.some(check=>check.outcome==="mismatched")?"failed":"unknown";
 return {
  type:"ShopPublicSupportBuyerRouteObservation",schemaVersion:1,
  observedAt:now(),origin,sourceCampaignId:campaign.campaignId,
  publicRouteReceiving,checks,
  exactDeployedRevisionReceived:false,
  paymentAuthorizationAttempted:false,
  stripeCheckoutFollowed:false,
  customerAcceptedDelivery:null,
  groupAfterCostSettledProceedsCents:null
 };
}
