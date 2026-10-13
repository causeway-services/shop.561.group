import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { prepareJob, runJob } from "../scripts/promotional-gift-mail.mjs";

test("one accepted send grants and receipts, repeated run does not send twice", async () => {
  const dir = await mkdtemp(join(tmpdir(), "shop-promo-")); const file = join(dir, "job.json");
  await prepareJob(file, { from: "press@example.org", to: "reader@example.org", offering: "ice-out", subject: "An advance copy", body: "Here is the book." });
  let sends = 0, grants = 0;
  const send = async job => { sends++; return { accepted: true, status: "sent", provider: "fastmail-jmap", messageId: "sub123", to: [job.to] }; };
  const grant = { shopGrant: async () => { grants++; return { id: "g1" }; }, shopRead: async () => ({ offering: "ice-out", email: "reader@example.org", status: "active" }) };
  const old = process.env.SHOP_GIFT_AGENT_KEY, oldMail = process.env.FASTMAIL_JMAP_TOKEN;
  try {
    process.env.SHOP_GIFT_AGENT_KEY = "test"; process.env.FASTMAIL_JMAP_TOKEN = "test";
    assert.equal((await runJob(file, { send, grant })).state, "received");
    assert.equal((await runJob(file, { send, grant })).state, "received");
    assert.equal(sends, 1); assert.equal(grants, 1);
  } finally { if (old === undefined) delete process.env.SHOP_GIFT_AGENT_KEY; else process.env.SHOP_GIFT_AGENT_KEY = old; if (oldMail === undefined) delete process.env.FASTMAIL_JMAP_TOKEN; else process.env.FASTMAIL_JMAP_TOKEN = oldMail; }
});
test("send accepted then grant failure retries grant without another send", async () => {
  const dir = await mkdtemp(join(tmpdir(), "shop-promo-")); const file = join(dir, "job.json");
  await prepareJob(file, { from: "press@example.org", to: "reader@example.org", offering: "ice-out", subject: "Book", body: "Read" });
  let sends = 0, grants = 0;
  const old = process.env.SHOP_GIFT_AGENT_KEY, oldMail = process.env.FASTMAIL_JMAP_TOKEN;
  try {
    process.env.SHOP_GIFT_AGENT_KEY = "test"; process.env.FASTMAIL_JMAP_TOKEN = "test";
    const send = async job => { sends++; return { accepted: true, status: "sent", provider: "fastmail-jmap", messageId: "submission2", to: [job.to] }; };
    const grant = { shopGrant: async () => { if (++grants === 1) throw new Error("network failed"); return { id: "g1" }; }, shopRead: async () => ({ offering: "ice-out", email: "reader@example.org", status: "active" }) };
    await assert.rejects(runJob(file, { send, grant }), /network failed/);
    assert.equal(JSON.parse(await readFile(file, "utf8")).state, "grant-failed");
    assert.equal((await runJob(file, { send, grant })).state, "received");
    assert.equal(sends, 1); assert.equal(grants, 2);
  } finally { if (old === undefined) delete process.env.SHOP_GIFT_AGENT_KEY; else process.env.SHOP_GIFT_AGENT_KEY = old; if (oldMail === undefined) delete process.env.FASTMAIL_JMAP_TOKEN; else process.env.FASTMAIL_JMAP_TOKEN = oldMail; }
});
test("uncertain send is never automatically repeated", async () => {
  const dir = await mkdtemp(join(tmpdir(), "shop-promo-")); const file = join(dir, "job.json");
  await prepareJob(file, { from: "press@example.org", to: "reader@example.org", offering: "ice-out", subject: "Book", body: "Read" });
  const old = process.env.SHOP_GIFT_AGENT_KEY, oldMail = process.env.FASTMAIL_JMAP_TOKEN;
  try {
    process.env.SHOP_GIFT_AGENT_KEY = "test"; process.env.FASTMAIL_JMAP_TOKEN = "test";
    await assert.rejects(runJob(file, { send: async () => { throw new Error("unknown outcome"); }, grant: {} }), /unknown outcome/);
    await assert.rejects(runJob(file, { send: async () => { throw new Error("must not send"); }, grant: {} }), /uncertain/);
  } finally { if (old === undefined) delete process.env.SHOP_GIFT_AGENT_KEY; else process.env.SHOP_GIFT_AGENT_KEY = old; if (oldMail === undefined) delete process.env.FASTMAIL_JMAP_TOKEN; else process.env.FASTMAIL_JMAP_TOKEN = oldMail; }
});
