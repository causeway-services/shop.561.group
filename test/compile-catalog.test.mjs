import assert from "node:assert/strict";
import test from "node:test";
import { generatedIllustrationsFrom } from "../scripts/compile-catalog.mjs";

test("compile-catalog carries generated illustration model provenance and ignores code-drawn assets", () => {
  assert.deepEqual(generatedIllustrationsFrom({ assets: [
    { path: "art/generated.png", role: "illustration", provenance: { provider: "cloudflare-workers-ai", model: "flux-1-schnell" } },
    { path: "art/ornament.tikz", role: "ornament", provenance: { method: "code-drawn" } },
  ] }), [{ path: "art/generated.png", role: "illustration", provider: "cloudflare-workers-ai", model: "flux-1-schnell" }]);
});
