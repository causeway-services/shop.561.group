#!/usr/bin/env node
// Arms card checkout on shop.561.group: the person at the node signs in to
// Stripe in the assisted browser and creates the shop's restricted key and
// webhook destination there, and each secret goes straight into the Worker's
// secrets with `wrangler secret put`, never to output or disk. Secrets the
// Worker already has are kept unless --replace. Prints a receipt with no
// secret in it.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { armCheckout } from "@red-cup-engineering/stripe-services-section/provisioning";

const SITE = dirname(dirname(fileURLToPath(import.meta.url)));
const SURFACE = "shop.561.group";
const USAGE = "usage: arm-checkout [--test] [--replace]";

function wrangler(args, input) {
  const run = spawnSync(join(SITE, "node_modules", ".bin", "wrangler"), args, { cwd: SITE, input, encoding: "utf8" });
  if (run.status !== 0) throw new Error(`wrangler ${args.slice(0, 2).join(" ")} failed: ${(run.stderr || run.stdout).trim().split("\n").slice(-3).join(" ")}`);
  return run.stdout;
}

const args = process.argv.slice(2);
if (args.some((arg) => !["--test", "--replace"].includes(arg))) {
  console.error(USAGE);
  process.exit(2);
}
try {
  const present = JSON.parse(wrangler(["secret", "list", "--format", "json"])).map(({ name }) => name);
  const { merchant } = JSON.parse(readFileSync(join(SITE, "catalog.json"), "utf8"));
  const receipt = await armCheckout({
    surface: SURFACE,
    webhookUrl: `https://${SURFACE}/webhooks/stripe`,
    merchant: merchant.legalBody,
    mode: args.includes("--test") ? "test" : "live",
    present,
    replace: args.includes("--replace"),
    store: async (name, value) => { wrangler(["secret", "put", name], value); },
  });
  console.log(JSON.stringify(receipt, null, 2));
  if (receipt.stoppedEarly) process.exitCode = 1;
} catch (error) {
  console.error(error.message ?? error);
  process.exitCode = 1;
}
