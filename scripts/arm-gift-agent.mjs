#!/usr/bin/env node
// Arms the shop's gift API for the house's agents (review copies, say): makes
// a key, keeps it on the node at ~/.config/561-group/shop.561.group/gift-agent.key
// (0600, the copy agents read) and puts the same key into the Worker as
// SHOP_GIFT_AGENT_KEY with `wrangler secret put`. The key is never printed.
// A key already on file is kept and put again unless --replace.
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { chmod, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = dirname(dirname(fileURLToPath(import.meta.url)));
export const GIFT_AGENT_KEY_PATH = join(process.env.HOME ?? homedir(), ".config", "561-group", "shop.561.group", "gift-agent.key");

function wrangler(args, input) {
  const run = spawnSync(join(SITE, "node_modules", ".bin", "wrangler"), args, { cwd: SITE, input, encoding: "utf8" });
  if (run.status !== 0) throw new Error(`wrangler ${args.slice(0, 2).join(" ")} failed: ${(run.stderr || run.stdout).trim().split("\n").slice(-3).join(" ")}`);
  return run.stdout;
}

const args = process.argv.slice(2);
if (args.some((arg) => arg !== "--replace")) { console.error("usage: arm-gift-agent [--replace]"); process.exit(2); }
try {
  let key = args.includes("--replace") ? null : (await readFile(GIFT_AGENT_KEY_PATH, "utf8").catch(() => "")).trim() || null;
  const made = !key;
  if (made) {
    key = randomBytes(32).toString("base64url");
    await mkdir(dirname(GIFT_AGENT_KEY_PATH), { recursive: true, mode: 0o700 });
    await chmod(dirname(GIFT_AGENT_KEY_PATH), 0o700);
    const staging = `${GIFT_AGENT_KEY_PATH}.${process.pid}.tmp`;
    await writeFile(staging, `${key}\n`, { mode: 0o600 });
    await rename(staging, GIFT_AGENT_KEY_PATH);
  }
  wrangler(["secret", "put", "SHOP_GIFT_AGENT_KEY"], key);
  console.log(JSON.stringify({ surface: "shop.561.group", secret: "SHOP_GIFT_AGENT_KEY", key: made ? "made" : "kept", onNode: GIFT_AGENT_KEY_PATH }, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
