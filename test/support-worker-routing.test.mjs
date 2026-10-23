/** Source-only Cloudflare routing contract for the original Shop's dynamic
 * support buyer endpoints. Neither this test nor Wrangler dry-run establishes
 * which revision is installed on the actual custom domain.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const source = readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8");
// This canonical Wrangler file uses standalone JSONC line comments only.
const config = JSON.parse(source.replace(/^\s*\/\/[^\r\n]*$/gmu, ""));

test("the original Shop /support buyer routes must reach its Worker before static assets", () => {
  assert.equal(config.name, "shop-561-group");
  assert.equal(config.main, "src/worker.mjs");
  assert.equal(config.workers_dev, false);
  assert.deepEqual(config.routes, [{pattern: "shop.561.group", custom_domain: true}]);
  assert.equal(config.assets.directory, "./public");
  assert.deepEqual(config.assets.run_worker_first, ["/support", "/support/*"]);
});

test("book covers and unrelated assets retain assets-first delivery", () => {
  assert.ok(Array.isArray(config.assets.run_worker_first));
  assert.equal(config.assets.run_worker_first.includes("/*"), false);
  assert.equal(config.assets.run_worker_first.includes("*"), false);
  assert.equal(config.assets.run_worker_first.includes("/goods/*"), false);
  assert.equal(config.assets.run_worker_first.includes("/books/*"), false);
});
