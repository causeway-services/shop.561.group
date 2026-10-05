#!/usr/bin/env node
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import localCatalog from "../src/compiled-catalog.mjs";

export const DEFAULT_PUBLIC_CATALOG_URL = "https://shop.561.group/catalog.json";

function offeringContract(row) {
  return Object.freeze({
    id: row.id,
    status: row.status,
    priceCents: row.priceCents,
    currency: row.currency,
    release: row.release,
  });
}

export function publicCatalogContract(catalog) {
  return Object.freeze({
    merchant: Object.freeze({
      name: catalog?.merchant?.name ?? null,
      legalBody: catalog?.merchant?.legalBody ?? null,
    }),
    offerings: Object.freeze(
      [...(catalog?.offerings ?? [])]
        .map(offeringContract)
        .sort((left, right) => String(left.id).localeCompare(String(right.id))),
    ),
  });
}

function diffScalar(path, expected, observed, out) {
  if (expected !== observed) out.push(Object.freeze({ path, expected, observed }));
}

export function comparePublicCatalogContract(expectedCatalog, observedCatalog) {
  const expected = publicCatalogContract(expectedCatalog);
  const observed = publicCatalogContract(observedCatalog);
  const differences = [];

  diffScalar("merchant.name", expected.merchant.name, observed.merchant.name, differences);
  diffScalar("merchant.legalBody", expected.merchant.legalBody, observed.merchant.legalBody, differences);

  const expectedById = new Map(expected.offerings.map((row) => [row.id, row]));
  const observedById = new Map(observed.offerings.map((row) => [row.id, row]));
  const ids = [...new Set([...expectedById.keys(), ...observedById.keys()])].sort();

  for (const id of ids) {
    const expectedRow = expectedById.get(id);
    const observedRow = observedById.get(id);
    if (!expectedRow) {
      differences.push(Object.freeze({ path: `offerings.${id}`, expected: null, observed: observedRow }));
      continue;
    }
    if (!observedRow) {
      differences.push(Object.freeze({ path: `offerings.${id}`, expected: expectedRow, observed: null }));
      continue;
    }
    for (const field of ["status", "priceCents", "currency", "release"]) {
      diffScalar(`offerings.${id}.${field}`, expectedRow[field], observedRow[field], differences);
    }
  }

  return Object.freeze({
    expected,
    observed,
    differences: Object.freeze(differences),
    conforms: differences.length === 0,
  });
}

function unknownResult({ url, observedAt, reason, httpStatus = null, detail = null }) {
  return Object.freeze({
    kind: "causeway.shop.public-catalog-observation",
    url,
    observedAt,
    state: "unknown",
    httpStatus,
    reason,
    detail,
    contract: null,
  });
}

export async function observePublicCatalog({
  url = DEFAULT_PUBLIC_CATALOG_URL,
  fetchImpl = globalThis.fetch,
  expectedCatalog = localCatalog,
  timeoutMs = 10_000,
  now = () => new Date(),
} = {}) {
  const observedAt = now().toISOString();
  if (typeof fetchImpl !== "function") {
    return unknownResult({ url, observedAt, reason: "fetch-unavailable" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    response = await fetchImpl(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "user-agent": "561-group-public-receiver-observer/1",
      },
      redirect: "follow",
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeout);
    return unknownResult({
      url,
      observedAt,
      reason: error?.name === "AbortError" ? "timeout" : "network-error",
      detail: String(error?.message ?? error),
    });
  }
  clearTimeout(timeout);

  if (!response?.ok) {
    return unknownResult({
      url,
      observedAt,
      reason: "http-non-success",
      httpStatus: response?.status ?? null,
    });
  }

  let observedCatalog;
  try {
    observedCatalog = await response.json();
  } catch (error) {
    return unknownResult({
      url,
      observedAt,
      reason: "invalid-json",
      httpStatus: response.status,
      detail: String(error?.message ?? error),
    });
  }

  const contract = comparePublicCatalogContract(expectedCatalog, observedCatalog);
  return Object.freeze({
    kind: "causeway.shop.public-catalog-observation",
    url,
    observedAt,
    state: contract.conforms ? "supported" : "refuted",
    httpStatus: response.status,
    reason: contract.conforms ? "public-contract-matches-source" : "public-contract-differs-from-source",
    detail: null,
    contract,
  });
}

function parseArgs(argv) {
  const options = { url: DEFAULT_PUBLIC_CATALOG_URL, timeoutMs: 10_000 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--url") options.url = argv[++index] ?? "";
    else if (arg === "--timeout-ms") options.timeoutMs = Number(argv[++index]);
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (!options.url) throw new Error("--url must not be empty");
  if (!Number.isFinite(options.timeoutMs) || options.timeoutMs <= 0) {
    throw new Error("--timeout-ms must be a positive number");
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const result = await observePublicCatalog(options);
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  if (result.state === "refuted") process.exitCode = 1;
  else if (result.state === "unknown") process.exitCode = 2;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await main();
}
