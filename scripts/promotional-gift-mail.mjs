#!/usr/bin/env node
// Real promotional send + retail gift, using Fastmail JMAP and existing shop grants.
// A one-recipient job is persisted before submission. An uncertain send is NEVER
// automatically repeated: reconcile it against Fastmail first to avoid duplicates.
import { readFile, writeFile, rename, mkdir, open } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { fulfillPromotionalSend, shopGiftAdapters } from "../src/promotion-email-gifts.mjs";

const USINGS = ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail", "urn:ietf:params:jmap:submission"];
const fail = (message) => { throw new Error(message); };
const required = (value, name) => typeof value === "string" && value.trim() ? value.trim() : fail(`missing ${name}`);
const email = (value) => { const v = required(value, "email"); if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/u.test(v)) fail("invalid email"); return v.toLowerCase(); };
async function save(file, value) {
  await mkdir(dirname(file), { recursive: true, mode: 0o700 });
  const temp = `${file}.${process.pid}.tmp`;
  await writeFile(temp, JSON.stringify(value, null, 2) + "\\n", { mode: 0o600, flag: "wx" });
  await rename(temp, file);
}
async function requestJson(url, token, body) {
  const r = await fetch(url, { method: body ? "POST" : "GET", headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  if (!r.ok) fail(`Fastmail HTTP ${r.status}`);
  return r.json();
}
function response(data, type, id) {
  const match = data.methodResponses?.find(x => x[0] === type && x[2] === id);
  if (!match) fail(`JMAP ${type} missing response`);
  return match[1];
}
async function sendFastmail(job, token) {
  const session = await requestJson("https://api.fastmail.com/jmap/session", token);
  const accountId = session.primaryAccounts?.["urn:ietf:params:jmap:submission"];
  if (!accountId || !session.apiUrl) fail("Fastmail submission account unavailable");
  const ids = await requestJson(session.apiUrl, token, { using: USINGS, methodCalls: [["Identity/get", { accountId }, "identities"]] });
  const identity = response(ids, "Identity/get", "identities").list?.find(i => i.email?.toLowerCase() === job.from);
  if (!identity) fail("sender is not a verified Fastmail identity");
  // The JMAP response must acknowledge actual EmailSubmission creation.
  const draft = { from: [{ email: job.from }], to: [{ email: job.to }], subject: job.subject, textBody: [{ partId: "body", type: "text/plain" }], bodyValues: { body: { value: job.body } }, keywords: { "$draft": true } };
  const result = await requestJson(session.apiUrl, token, { using: USINGS, methodCalls: [
    ["Email/set", { accountId, create: { draft } }, "draft"],
    ["EmailSubmission/set", { accountId, create: { submission: { emailId: "#draft", identityId: identity.id } }, onSuccessDestroyEmail: ["#submission"] }, "submission"]
  ] });
  const createdDraft = response(result, "Email/set", "draft").created?.draft;
  const submitted = response(result, "EmailSubmission/set", "submission");
  if (!createdDraft?.id || !submitted.created?.submission?.id) fail("Fastmail did not acknowledge submission; verify remotely before retrying");
  return { accepted: true, status: "sent", provider: "fastmail-jmap", messageId: submitted.created.submission.id, to: [job.to] };
}
export async function runJob(file, { send = sendFastmail, grant } = {}) {
  const record = JSON.parse(await readFile(file, "utf8"));
  if (record.state === "received") return record;
  if (!["prepared", "send-accepted", "grant-failed"].includes(record.state)) fail("unknown or uncertain send state; reconcile manually, do not resend");
  const key = required(process.env.SHOP_GIFT_AGENT_KEY, "SHOP_GIFT_AGENT_KEY");
  const adapters = grant ?? shopGiftAdapters({ key });
  if (record.state === "prepared") {
    const token = required(process.env.FASTMAIL_JMAP_TOKEN, "FASTMAIL_JMAP_TOKEN");
    record.state = "send-uncertain";
    await save(file, record);
    // A crash between JMAP submission and receipt persistence leaves send-uncertain.
    // Operator MUST verify the JMAP submission before changing state.
    const receipt = await send(record, token);
    if (!receipt?.accepted || receipt.status !== "sent" || receipt.to?.length !== 1 || email(receipt.to[0]) !== record.to || !receipt.messageId) fail("mail submission was not verified");
    record.receipt = receipt;
    record.state = "send-accepted";
    await save(file, record);
  }
  try {
    const result = await fulfillPromotionalSend({ receipt: record.receipt, offering: record.offering, recipient: record.to, ...adapters });
    record.gift = result;
    record.state = "received";
    await save(file, record);
    return record;
  } catch (error) {
    record.state = "grant-failed";
    record.lastError = error.message;
    await save(file, record);
    throw error;
  }
}
export async function prepareJob(file, spec) {
  const job = { state: "prepared", id: randomUUID(), from: email(spec.from), to: email(spec.to), offering: required(spec.offering, "offering"), subject: required(spec.subject, "subject"), body: required(spec.body, "body") };
  if (job.to === job.from) fail("self-send not a recipient gift");
  await mkdir(dirname(file), { recursive: true, mode: 0o700 });
  const handle = await open(file, "wx", 0o600);
  try { await handle.writeFile(JSON.stringify(job, null, 2) + "\\n"); } finally { await handle.close(); }
  return job;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [mode, path, specification] = process.argv.slice(2);
  try {
    if (!path || !["prepare", "run"].includes(mode)) fail("usage: node scripts/promotional-gift-mail.mjs prepare JOB.json SPEC.json | run JOB.json");
    const file = resolve(path);
    if (mode === "prepare") {
      if (!specification) fail("provide SPEC.json");
      const spec = JSON.parse(await readFile(resolve(specification), "utf8"));
      await prepareJob(file, spec);
      console.log("Prepared private promotional gift job");
    } else {
      const result = await runJob(file);
      console.log(JSON.stringify({ state: result.state, giftId: result.gift?.id, giftUrl: result.gift?.url }));
    }
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
