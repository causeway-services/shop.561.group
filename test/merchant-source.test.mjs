import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { validateSchemaNode } from "@red-cup-engineering/schema-org-services-section/vocabulary";
import { compileShopMerchant, GROUP_BRAND_SOURCE } from "../src/merchant-source.mjs";

const brand={
  "@context":"https://schema.org",
  "@id":"https://561.group/#brand",
  "@type":"Brand",
  name:"561 Group",
  identifier:"561-group",
};
const source=()=>JSON.stringify(brand,null,2)+"\n";
const merchant=()=>({brandSource:{...GROUP_BRAND_SOURCE},legalBody:"emsenn"});

test("original Group brand resource is proper schema.org/Brand distinct from the seller",()=>{
  assert.deepEqual(validateSchemaNode(brand).problems,[]);
  const got=compileShopMerchant(merchant(),source());
  assert.equal(got.name,brand.name);
  assert.equal(got.legalBody,"emsenn");
  assert.equal(got.brand["@type"],"Brand");
  assert.equal(got.brand["@id"],brand["@id"]);
  assert.equal(got.brand["@context"],"https://schema.org");
  assert.equal(got.brandSource.recordPath,GROUP_BRAND_SOURCE.recordPath);
  assert.equal(got.brandSource.contentDigest,
    "ni:///sha-256;"+createHash("sha256").update(source()).digest("base64url"));
  assert.ok(!("legalName" in got.brand),"a brand does not magically become a filed seller");
});

test("the actual selected brand name is not a second manually maintained Shop catalog value",()=>{
  const other={...brand,name:"A different lawful future brand"};
  assert.equal(compileShopMerchant(merchant(),JSON.stringify(other)).name,other.name);
  assert.equal(compileShopMerchant(merchant(),JSON.stringify(other)).legalBody,"emsenn");
  const duplicate={...merchant(),name:"561 Group"};
  assert.throws(()=>compileShopMerchant(duplicate,source()),/shadow/u);
});

test("source owner, context, brand identity, vocabulary and seller are independently guarded",()=>{
  const cases=[
    [merchant(),JSON.stringify({...brand,"@type":"Organization"})],
    [merchant(),JSON.stringify({...brand,"@id":"https://example.org/#not-group"})],
    [merchant(),JSON.stringify({...brand,"@context":"https://not-schema.example/"})],
    [merchant(),JSON.stringify({...brand,legalName:"561 Group LLC"})],
    [merchant(),JSON.stringify({...brand,name:""})],
    [{...merchant(),legalBody:""},source()],
    [{...merchant(),brandSource:{...GROUP_BRAND_SOURCE,repository:"unrelated/source"}},source()],
    [{...merchant(),brandSource:{...GROUP_BRAND_SOURCE,recordPath:"../../etc/passwd"}},source()],
    [{...merchant(),brandSource:{...GROUP_BRAND_SOURCE,brandId:"https://example.org"}},source()],
  ];
  for(const [m,jsonld] of cases)
    assert.throws(()=>compileShopMerchant(m,jsonld),TypeError);
});
