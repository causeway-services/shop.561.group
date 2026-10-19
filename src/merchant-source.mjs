/**
 * Original Causeway Shop merchant selector. The actual Group brand is a
 * schema.org/Brand owned by the Group. A brand is neither a Person,
 * incorporated Organization, contracting seller nor entitlement to collect
 * payment. Those remain distinct sources/permissions.
 *
 * This reader uses the original Red Cup schema.org vocabulary validator;
 * there is no local RDF parser or parallel corporate brand register.
 */
import { createHash } from "node:crypto";
import { validateSchemaNode } from "@red-cup-engineering/schema-org-services-section/vocabulary";

const SOURCE = "561-group/561-group-services-section";
const PATH = "561-group-services-section/data/records/service-records/561-group-services-section-enterprise-brand-service-record.json";
const BRAND_ID = "https://561.group/#brand";
const fail = message => { throw new TypeError("Shop merchant source: " + message); };

export const GROUP_BRAND_SOURCE = Object.freeze({
  repository: SOURCE, recordPath: PATH, brandId: BRAND_ID,
});

/**
 * Compile one merchant from its distinct original Group brand and the
 * Shop's *separate* legal seller assertion. Inputs are source bytes and a
 * declaration selected by the actual Shop manifest, never an inferred local
 * checkout or a silent default to a proposed LLC name.
 */
export function compileShopMerchant(merchant, brandText) {
  if (!merchant || typeof merchant !== "object" || Array.isArray(merchant))
    fail("typed merchant source declaration is required");
  const { brandSource, legalBody, website } = merchant;
  if (!brandSource || brandSource.repository !== SOURCE
    || brandSource.recordPath !== PATH || brandSource.brandId !== BRAND_ID)
    fail("merchant must select the original corporate brand source, not a stale or arbitrary file");
  if (Object.hasOwn(merchant, "name"))
    fail("do not shadow the Group's authoritative brand name in the Shop catalog");
  if (typeof legalBody !== "string" || !legalBody.trim())
    fail("the separate contracting seller must be explicitly sourced by Shop governance");
  if (website !== undefined && (typeof website !== "string" || !/^https:\/\//u.test(website)))
    fail("merchant website must be an HTTPS URL");
  if (typeof brandText !== "string" || !brandText.trim() || brandText.length > 128 * 1024)
    fail("one bounded original brand JSON-LD source is required");
  let brand;
  try { brand = JSON.parse(brandText); }
  catch { fail("original brand source must be valid JSON-LD"); }
  if (!brand || Array.isArray(brand) || typeof brand !== "object"
    || brand["@context"] !== "https://schema.org"
    || brand["@id"] !== BRAND_ID || brand["@type"] !== "Brand"
    || typeof brand.name !== "string" || !brand.name.trim()
    || typeof brand.identifier !== "string" || !brand.identifier.trim())
    fail("original Group source is not a qualified schema.org Brand with its expected identity");
  // The vocabulary reader also rejects undeclared properties or properties
  // owned by other schema.org types, not merely JSON syntactic defects.
  const validation = validateSchemaNode(brand);
  if (!validation.valid)
    fail("schema.org vocabulary refuses brand: " + validation.problems.map(p => p.message).join("; "));
  const digest = "ni:///sha-256;" + createHash("sha256").update(brandText).digest("base64url");
  return Object.freeze({
    name: brand.name, legalBody, ...(website ? { website } : {}),
    brand: structuredClone(brand),
    brandSource: Object.freeze({ ...GROUP_BRAND_SOURCE, contentDigest: digest }),
  });
}
