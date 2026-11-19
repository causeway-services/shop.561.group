/** Source qualification for externally hosted Stripe support links.
 * The original shop.561.group catalog is compiled into the existing Worker.
 * These links are NOT Shop merchandise or buyer entitlements; they authorize
 * only a narrow authenticated provider-event audit in the existing Shop DO.
 */
export const EXTERNAL_STRIPE_RECEIVER_TYPE='ExternalStripePaymentLinkReceiver';
const SHA=/^[a-f0-9]{40}$/u;
const LINK=/^plink_[A-Za-z0-9]+$/u;
const ACCOUNT=/^acct_[A-Za-z0-9]+$/u;
const REPO=/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u;
const FIELDS=['type','schemaVersion','stripePaymentLinkId','stripeMerchantAccountId',
 'merchantDisplayName','supportedProgramName','sourceObservedOn','sourceRevision'];
const SOURCE=['repository','commitSha','path','blobSha'];
const plain=value=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&
 Object.getPrototypeOf(value)===Object.prototype;
function ownShape(value,keys){
 if(!plain(value))return false;
 const fields=Reflect.ownKeys(value),descriptors=Object.getOwnPropertyDescriptors(value);
 return fields.length===keys.length&&keys.every(k=>
  Object.hasOwn(descriptors,k)&&Object.hasOwn(descriptors[k],'value')&&descriptors[k].enumerable);
}
const text=value=>typeof value==='string'&&value.trim()===value&&value.length>0&&
 !/[\p{Cc}\p{Zl}\p{Zp}]/u.test(value);
const date=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/u.test(value)&&
 Number.isFinite(Date.parse(value+'T00:00:00.000Z'))&&
 new Date(value+'T00:00:00.000Z').toISOString().slice(0,10)===value;
/** Strongly typed original source → ID list for the already-owned Worker
 * signature-verifying webhook receiver. This does not validate an actual
 * Stripe event or independently prove the historical author owns an account. */
export function externalStripePaymentLinkIds(catalog){
 const selected=catalog?.externalStripePaymentLinkReceivers;
 if(selected===undefined)return Object.freeze([]);
 if(!Array.isArray(selected)||selected.length>64)
  throw new TypeError('Shop external Payment Link receivers must be a bounded source list');
 const ids=new Set();
 for(const value of selected){
  if(!ownShape(value,FIELDS)||value.type!==EXTERNAL_STRIPE_RECEIVER_TYPE||
   value.schemaVersion!==1||!LINK.test(value.stripePaymentLinkId??'')||
   !ACCOUNT.test(value.stripeMerchantAccountId??'')||
   !text(value.merchantDisplayName)||!text(value.supportedProgramName)||
   !date(value.sourceObservedOn)||!ownShape(value.sourceRevision,SOURCE)||
   !REPO.test(value.sourceRevision.repository??'')||
   !SHA.test(value.sourceRevision.commitSha??'')||
   !SHA.test(value.sourceRevision.blobSha??'')||
   !text(value.sourceRevision.path)||value.sourceRevision.path.startsWith('/')||
   value.sourceRevision.path.split('/').some(part=>part==='.'||part==='..'))
   throw new TypeError('External Stripe Payment Link has no original source-qualified receiving identity');
  if(ids.has(value.stripePaymentLinkId))
   throw new TypeError('External Stripe Payment Link receiving identity is ambiguous');
  ids.add(value.stripePaymentLinkId);
 }
 return Object.freeze([...ids]);
}
