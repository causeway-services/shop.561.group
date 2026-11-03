import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { prepareJob, runJob, sendFastmail } from "../scripts/promotional-gift-mail.mjs";

test("one accepted send grants and receipts, repeated run does not send twice", async () => {
  const dir = await mkdtemp(join(tmpdir(), "shop-promo-")); const file = join(dir, "job.json");
  await prepareJob(file, { from: "press@example.org", to: "reader@example.org", offering: "ice-out", subject: "An advance copy", body: "Here is the book." });
  let sends = 0, grants = 0;
  const send = async job => { sends++; return { accepted: true, status: "sent", provider: "fastmail-jmap", messageId: "sub123", to: [job.to] }; };
  const grant = { shopGrant: async () => { grants++; return { id: "g1" }; }, shopRead: async () => ({ offering: "ice-out", email: "reader@example.org", status: "active" }) };
  const old = process.env.SHOP_GIFT_AGENT_KEY, oldMail = process.env.FASTMAIL_JMAP_TOKEN;
  try {
    process.env.SHOP_GIFT_AGENT_KEY = "test"; process.env.FASTMAIL_JMAP_TOKEN = "test";
    assert.equal((await runJob(file, { send, grant })).state, "grant-verified");
    assert.equal((await runJob(file, { send, grant })).state, "grant-verified");
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
    assert.equal((await runJob(file, { send, grant })).state, "grant-verified");
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

test("Fastmail submission creates the email in the actual Drafts mailbox", async () => {
  const requests = [];
  const reply = data => ({ ok: true, json: async () => data });
  const fetchImpl = async (url, options) => {
    if (url.endsWith("/session")) return reply({
      apiUrl: "https://jmap.fastmail.com/jmap/api/",
      primaryAccounts: {
        "urn:ietf:params:jmap:mail": "account1",
        "urn:ietf:params:jmap:submission": "account1",
      },
    });
    const body = JSON.parse(options.body);
    requests.push(body);
    if (body.methodCalls.some(([name]) => name === "Identity/get")) return reply({
      methodResponses: [
        ["Identity/get", { list: [{ id: "identity1", email: "press@example.org" }] }, "identities"],
        ["Mailbox/query", { ids: ["real-drafts-mailbox"] }, "drafts"],
      ],
    });
    const createdEmail = body.methodCalls.find(([name]) => name === "Email/set")[1].create.draft;
    if (createdEmail.mailboxIds?.["real-drafts-mailbox"] !== true)
      return reply({ methodResponses: [
        ["Email/set", { notCreated: { draft: { type: "invalidProperties", properties: ["mailboxIds"] } } }, "draft"],
        ["EmailSubmission/set", { notCreated: { submission: { type: "notFound" } } }, "submission"],
      ] });
    return reply({ methodResponses: [
      ["Email/set", { created: { draft: { id: "email1" } } }, "draft"],
      ["EmailSubmission/set", { created: { submission: { id: "submission1" } } }, "submission"],
    ] });
  };
  const receipt = await sendFastmail({
    from: "press@example.org", to: "reader@example.org", subject: "Your copy", body: "We are making a copy available.",
  }, "test-token", fetchImpl);
  assert.equal(receipt.accepted, true);
  assert.equal(receipt.messageId, "submission1");
  assert.deepEqual(receipt.to, ["reader@example.org"]);
  assert.equal(requests[0].methodCalls[1][0], "Mailbox/query");
  assert.equal(requests[1].methodCalls[0][1].create.draft.mailboxIds["real-drafts-mailbox"], true);
});

test("JMAP failed EmailSubmission cannot produce an accepted send receipt", async () => {
  const reply = data => ({ ok: true, json: async () => data });
  const fetchImpl = async (url, options) => {
    if (url.endsWith("/session")) return reply({
      apiUrl: "https://jmap.fastmail.com/jmap/api/",
      primaryAccounts: {
        "urn:ietf:params:jmap:mail": "account1",
        "urn:ietf:params:jmap:submission": "account1",
      },
    });
    const { methodCalls } = JSON.parse(options.body);
    if (methodCalls[0][0] === "Identity/get") return reply({ methodResponses: [
      ["Identity/get", { list: [{ id: "identity1", email: "press@example.org" }] }, "identities"],
      ["Mailbox/query", { ids: ["drafts1"] }, "drafts"],
    ] });
    return reply({ methodResponses: [
      ["Email/set", { created: { draft: { id: "email1" } } }, "draft"],
      ["EmailSubmission/set", { notCreated: { submission: { type: "forbidden" } } }, "submission"],
    ] });
  };
  await assert.rejects(sendFastmail({
    from: "press@example.org", to: "reader@example.org", subject: "Book", body: "Read",
  }, "test-token", fetchImpl), /did not acknowledge submission/);
});

test("historical grant-readback records do not falsely claim reader receipt or resend", async () => {
  const dir = await mkdtemp(join(tmpdir(), "shop-promo-")); const file = join(dir, "job.json");
  const record = await prepareJob(file, {
    from: "press@example.org", to: "reader@example.org", offering: "ice-out", subject: "Book", body: "Read",
  });
  await writeFile(file, JSON.stringify({ ...record, state: "received", gift: { id: "g1", verified: true } }));
  const outcome = await runJob(file, { send: async () => { throw new Error("should not resend"); } });
  assert.equal(outcome.state, "grant-verified");
  assert.equal(JSON.parse(await readFile(file, "utf8")).state, "grant-verified");
});
