import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { auditPublicationSources } from "../scripts/audit-publication-source.mjs";

const digest = "ni:///sha-256;" + "A".repeat(43);
const setup = t => {
  const root = mkdtempSync(join(tmpdir(), "publication-source-"));
  t.after(() => rmSync(root, { recursive:true, force:true }));
  const book = join(root, "books", "example");
  mkdirSync(book, { recursive:true });
  writeFileSync(join(book,"ebook.json"),JSON.stringify({slug:"example",title:"Example",author:"Author",description:"Grounded manuscript"}));
  mkdirSync(join(root,"accepted"));
  writeFileSync(join(root,"accepted","example.json"),JSON.stringify({
    type:"EbookEditionAcceptance",status:"accepted",acceptedAt:"2026-09-30T12:00:00Z",
    editionInputDigest:digest,artifacts:{epub:{sha256:digest},screenPdf:{sha256:digest}}
  }));
  const catalog = join(root,"catalog.json");
  const run = row => {
    writeFileSync(catalog, JSON.stringify({ offerings:[row] }));
    return auditPublicationSources({ catalogPath:catalog, servicesRoot:root });
  };
  const row = { id:"example",release:"example",status:"live",currency:"usd",priceCents:399,
    book:{ manuscript:"books/example", acceptance:"accepted/example.json" }};
  return { run, row, root, book };
};

test("accepted source is not misrepresented as a verified public release", t => {
  const {run,row} = setup(t);
  const a=run(row);
  assert.equal(a.valid,true);
  assert.equal(a.entries[0].edition,"accepted");
  assert.equal(a.entries[0].channelRelease,"not-verified-in-source-preflight");
});

test("a coming-soon book may have an accepted edition without becoming live", t => {
  const {run,row}=setup(t);
  const a=run({...row,status:"coming-soon"});
  assert.equal(a.valid,true);
  assert.equal(a.entries[0].offerStatus,"coming-soon");
});

test("live without acceptance and forged acceptance digests fail closed", t => {
  const {run,row,root}=setup(t);
  assert.match(run({...row,book:{manuscript:"books/example"}}).errors.join(" "),/no tracked edition acceptance/);
  writeFileSync(join(root,"accepted","example.json"),JSON.stringify({
    type:"EbookEditionAcceptance",status:"accepted",acceptedAt:"2026-09-30T12:00:00Z",
    editionInputDigest:digest,artifacts:{epub:{sha256:"bad"},screenPdf:{sha256:digest}}
  }));
  assert.match(run(row).errors.join(" "),/lacks exact source identity/);
});

test("manuscript and acceptance cannot traverse outside services root", t => {
  const {run,row}=setup(t);
  assert.match(run({...row,book:{manuscript:"../outside"}}).errors.join(" "),/path escapes/);
  assert.match(run({...row,book:{manuscript:"books/example",acceptance:"../other"}}).errors.join(" "),/path escapes/);
});

test("edition specifications with historical digests give a warning, not false failure", t => {
  const {run,row,book}=setup(t);
  writeFileSync(join(book,"edition-specification.json"),JSON.stringify({
    projections:[{configuration:{editionInputDigest:"ni:///sha-256;"+"B".repeat(43)}}]
  }));
  const a=run(row);
  assert.equal(a.valid,true);
  assert.equal(a.warnings.length,1);
});

test("a missing source under a proven but unmounted Gitlink is explicitly unverified", t => {
  const {run,row,root} = setup(t);
  const catalogPath=join(root,"catalog.json");
  const source="books/remote";
  const pinned="a".repeat(40);
  const deferredRow={...row,book:{manuscript:source+"/my-book",acceptance:source+"/editions/accepted.json"}};
  writeFileSync(catalogPath,JSON.stringify({offerings:[deferredRow]}));
  const report=auditPublicationSources({catalogPath,servicesRoot:root,gitlinks:[{source,commit:pinned}]});
  assert.equal(report.valid,true);
  assert.equal(report.complete,false);
  assert.equal(report.checked,0);
  assert.equal(report.deferred,1);
  assert.equal(report.unverified[0].sourceCommit,pinned);
  assert.equal(report.unverified[0].edition,"not-verified");
  // A caller who has actually mounted the owner cannot use a missing
  // manuscript beneath it as an unverified exception.
  mkdirSync(join(root,source),{recursive:true});
  writeFileSync(join(root,source,"README.md"),"owner initialized");
  const initialized=auditPublicationSources({catalogPath,servicesRoot:root,gitlinks:[{source,commit:pinned}]});
  assert.equal(initialized.valid,false);
  assert.equal(initialized.unverified.length,0);
});
