// Pure source provenance rule shared by the full Group edition compiler and
// standalone Shop source-checks. This does not read source editions or infer
// whether a generated image is legally publishable.
export function generatedIllustrationsFrom(manifest) {
  return (manifest.assets ?? [])
    .filter((asset) => typeof asset.provenance?.model === "string")
    .map((asset) => ({ path: asset.path, role: asset.role, model: asset.provenance.model, ...(asset.provenance.provider ? { provider: asset.provenance.provider } : {}) }));
}
