#!/usr/bin/env node
/** Deterministic campaign handoff. Source is the same typed Shop record used
 * by GET /support, GET /support/share.json and actual checkout routing.
 * Never attempts a post, email, charge, or account change.
 */
import {campaign,campaignSharePack} from "../src/support-campaign.mjs";
const pack=campaignSharePack();
const mode=process.argv[2]??"--markdown";
if(mode==="--json"){
 process.stdout.write(JSON.stringify(pack,null,2)+"\n");
}else if(mode==="--csv"){
 const lines=[["campaign","channel","utm_medium","landing_url","stripe_payment_link_id","settlement_attribution"].join(",")];
 const quoted=value=>'"'+String(value).replaceAll('"','""')+'"';
 for(const item of pack.items)lines.push([pack.campaignId,item.channel,item.medium,item.shareUrl,item.paymentLinkId,item.paymentAttribution].map(quoted).join(","));
 process.stdout.write(lines.join("\n")+"\n");
}else if(mode==="--markdown"){
 process.stdout.write("# "+campaign.title+" — outbound campaign pack\n\n");
 process.stdout.write("Canonical public page: "+pack.landingUrl+"\n\n");
 process.stdout.write("Live Stripe attribution: each completed one-time payment can be classified by its original Payment Link ID; direct-fallback channels do not have individual settled-payment attribution. Stripe gross checkout is not bank-settled cash, and refunds/fees are separate.\n\n");
 for(const item of pack.items){
  process.stdout.write("## "+item.channel+"\n\n"+item.suggestedCopy+"\n\n");
  process.stdout.write("Attribution: "+item.paymentAttribution+"; link ID: `"+item.paymentLinkId+"`.\n\n");
 }
 process.stdout.write("Direct monthly support: "+campaign.monthly.url+" (existing $10/month subscription; not this campaign's one-time tip).\n");
}else{
 console.error("Usage: node scripts/export-support-campaign.mjs [--markdown|--json|--csv]");
 process.exitCode=2;
}
