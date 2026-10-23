import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import catalog from '../src/compiled-catalog.mjs';
import {campaign} from '../src/support-campaign.mjs';
import {externalStripePaymentLinkIds,EXTERNAL_STRIPE_RECEIVER_TYPE} from '../src/external-stripe-payment-link-receiving.mjs';
import {ORIGINAL_EXTERNAL_STRIPE_PAYMENT_LINK_IDS,
 EXTERNAL_STRIPE_PAYMENT_LINK_RECEIVER_INSTALLED} from '../src/worker.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const authored=JSON.parse(readFileSync(join(root,'catalog.json'),'utf8'));
const schema=JSON.parse(readFileSync(join(root,'data/records/schema/external-stripe-payment-link-receiver.schema.json'),'utf8'));
const sole=authored.externalStripePaymentLinkReceivers[0];

test('the original Shop source and compiled Worker audit ALL four existing emsenn support links',()=>{
 const offeredIds=[campaign.monthly.id,...Object.values(campaign.oneTime.links).map(link=>link.id)];
 assert.equal(authored.externalStripePaymentLinkReceivers.length,4);
 assert.deepEqual(catalog.externalStripePaymentLinkReceivers,authored.externalStripePaymentLinkReceivers);
 assert.deepEqual(externalStripePaymentLinkIds(catalog),offeredIds);
 assert.deepEqual(ORIGINAL_EXTERNAL_STRIPE_PAYMENT_LINK_IDS,offeredIds);
 assert.equal(Object.isFrozen(ORIGINAL_EXTERNAL_STRIPE_PAYMENT_LINK_IDS),true);
 assert.equal(sole.type,EXTERNAL_STRIPE_RECEIVER_TYPE);
 assert.equal(sole.schemaVersion,1);
 assert.equal(sole.stripePaymentLinkId,'plink_1USMywJ1vYnPQu2NWHtcqx0b');
 assert.equal(sole.stripeMerchantAccountId,'acct_18eDiqJ1vYnPQu2N');
 assert.equal(sole.merchantDisplayName,'emsenn');
 assert.equal(sole.supportedProgramName,'561 Group public education and technical infrastructure');
 assert.deepEqual(sole.sourceRevision,{
  repository:'causeway-services/emsenn-youtube-services-section',
  commitSha:'40dd6c9b9c2392f407fd0d22b1b587d80010ffd6',
  path:'config.json',blobSha:'e4fc13ccce67c2d07069825ab3e3b0dc93784aca'
 });
 assert.equal(EXTERNAL_STRIPE_PAYMENT_LINK_RECEIVER_INSTALLED,true===EXTERNAL_STRIPE_PAYMENT_LINK_RECEIVER_INSTALLED,
  'installed supplier capability must be a stable boolean, never an inferred source merge');
});

test('one-time tip links have independent source provenance and remain outside Group book sales',()=>{
 const oneTime=authored.externalStripePaymentLinkReceivers.slice(1);
 assert.equal(oneTime.length,Object.keys(campaign.oneTime.links).length);
 for(const [index,channel] of ['direct','github','fediverse'].entries()){
  const receiver=oneTime[index];
  assert.equal(receiver.stripePaymentLinkId,campaign.oneTime.links[channel].id);
  assert.equal(receiver.stripeMerchantAccountId,sole.stripeMerchantAccountId);
  assert.equal(receiver.merchantDisplayName,campaign.merchantDisplayName);
  assert.equal(receiver.sourceObservedOn,'2026-10-23');
  assert.deepEqual(receiver.sourceRevision,{
   repository:'causeway-services/shop.561.group',
   commitSha:'2b518ed679852b27460c2658c8c882baff6dd2a7',
   path:'data/records/marketing/open-work-campaign.json',
   blobSha:'0e87974fe0808c389e0d2cc15ae182661c56a35f'
  });
  assert.equal('bookOfferingId' in receiver,false);
  assert.equal('cashReceived' in receiver,false);
  assert.equal('customerEmail' in receiver,false);
 }
 assert.notEqual(catalog.merchant.name,campaign.merchantDisplayName,
  'a paid personal support link does not establish 561 Group book-sale cash');
});

test('industry JSON Schema 2020-12 declares exact original source fields and no consumer/merchant conflation',()=>{
 assert.equal(schema.$schema,'https://json-schema.org/draft/2020-12/schema');
 assert.equal(schema.$id,'urn:561:shop:external-stripe-payment-link-receiver:v1');
 assert.equal(schema.type,'object');
 assert.equal(schema.additionalProperties,false);
 assert.deepEqual(new Set(schema.required),new Set(Object.keys(sole)));
 assert.deepEqual(new Set(schema.properties.sourceRevision.required),new Set(Object.keys(sole.sourceRevision)));
 assert.equal(schema.properties.type.const,EXTERNAL_STRIPE_RECEIVER_TYPE);
 assert.equal(schema.properties.schemaVersion.const,1);
 assert.equal(schema.properties.sourceRevision.additionalProperties,false);
 assert.equal(schema.properties.stripeMerchantAccountId.pattern,'^acct_[A-Za-z0-9]+$');
 assert.equal('beneficiaryName' in sole,false);
 assert.equal('customerEmail' in sole,false);
 assert.equal('cashReceived' in sole,false);
 assert.equal('bookOfferingId' in sole,false);
});

test('unrelated independent Shops have zero external receivers; invalid provenance fails closed',()=>{
 assert.deepEqual(externalStripePaymentLinkIds({merchant:{name:'Other Shop'},offerings:[]}),[]);
 const same=(changes={})=>({...sole,...changes});
 for(const invalid of [
  {externalStripePaymentLinkReceivers:null},
  {externalStripePaymentLinkReceivers:{}},
  {externalStripePaymentLinkReceivers:[same({stripePaymentLinkId:'not-a-link'})]},
  {externalStripePaymentLinkReceivers:[same({stripeMerchantAccountId:'561-group-merchant'})]},
  {externalStripePaymentLinkReceivers:[same({merchantDisplayName:''})]},
  {externalStripePaymentLinkReceivers:[same({supportedProgramName:''})]},
  {externalStripePaymentLinkReceivers:[same({sourceObservedOn:'2026-02-31'})]},
  {externalStripePaymentLinkReceivers:[same({sourceRevision:{...sole.sourceRevision,commitSha:'unverified'}})]},
  {externalStripePaymentLinkReceivers:[same({sourceRevision:{...sole.sourceRevision,path:'../config.json'}})]},
  {externalStripePaymentLinkReceivers:[same({customer:'fictional'})]},
  {externalStripePaymentLinkReceivers:[sole,sole]},
 ]){
  assert.throws(()=>externalStripePaymentLinkIds(invalid),TypeError);
 }
 let getterReads=0;
 const dangerous={...sole};
 Object.defineProperty(dangerous,'stripePaymentLinkId',{enumerable:true,get(){
  getterReads++;return sole.stripePaymentLinkId;
 }});
 assert.throws(()=>externalStripePaymentLinkIds({externalStripePaymentLinkReceivers:[dangerous]}),TypeError);
 assert.equal(getterReads,0);
});
