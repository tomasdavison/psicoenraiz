import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateContact, contactEmailFields } from "../lib/contact.mjs";

const valid = { name: "Persona de prueba", email: "prueba@example.com", service: "individual", consent: true, message: "Consulta de disponibilidad" };

test("a clinical inquiry needs no message or phone; consent is required", () => {
  const result = validateContact({ ...valid, message: "" });
  assert.ok(result.data);
  assert.equal(result.data.phone, "");
  assert.ok(validateContact({ ...valid, consent: false }).error);
});

test("business and school inquiries require the institution and topic", () => {
  for (const service of ["empresas", "educacion"]) {
    assert.ok(validateContact({ ...valid, service }).error);
    assert.ok(validateContact({ ...valid, service, organization: "Institución de prueba", topic: "Comunicación", modality: "virtual" }).data);
  }
});

test("changing to a clinical inquiry does not forward institutional details", () => {
  const result = validateContact({ ...valid, organization: "Datos anteriores", topic: "Tema anterior" });
  const fields = contactEmailFields(result.data, result.service);
  assert.equal(fields.Institución, undefined);
  assert.equal(fields.email, valid.email);
  assert.equal(fields._replyto, valid.email);
});

test("invalid addresses, service names, excessive text and spam fields are rejected", () => {
  for (const change of [{ email: "incorrecto" }, { email: "a@example.com\r\nInjected: yes" }, { service: "inventado" }, { message: "x".repeat(1201) }, { website: "spam" }]) {
    assert.ok(validateContact({ ...valid, ...change }).error);
  }
});

const source = (await readFile(new URL("../app/api/contact/route.js", import.meta.url), "utf8"))
  .replace('"@/lib/contact.mjs"', JSON.stringify(new URL("../lib/contact.mjs", import.meta.url).href));
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const request = (body = valid, extra = {}) => new Request("https://www.psicoenraiz.com/api/contact", {
  method: "POST", headers: { "content-type": "application/json", origin: "https://www.psicoenraiz.com", ...extra }, body: JSON.stringify(body),
});

test("the route rejects cross-origin and invalid submissions before contacting the provider", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Provider must not be called"); };
  try {
    assert.equal((await POST(request(valid, { origin: "https://example.com" }))).status, 403);
    assert.equal((await POST(request({ ...valid, consent: false }))).status, 400);
    assert.equal((await POST(request(valid, { "content-length": "20000" }))).status, 413);
  } finally { globalThis.fetch = original; }
});

test("success is returned only after provider acceptance and the reply address is preserved", async () => {
  const original = globalThis.fetch;
  let outgoing;
  globalThis.fetch = async (url, options) => {
    assert.match(url, /^https:\/\/formsubmit.co\/ajax\//);
    outgoing = JSON.parse(options.body);
    return Response.json({ success: "true", message: "Email sent" });
  };
  try {
    const result = await POST(request());
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), { success: true });
    assert.equal(outgoing._replyto, valid.email);
    assert.match(outgoing._subject, /Terapia individual/);
  } finally { globalThis.fetch = original; }
});

test("activation, service errors and timeouts are never reported as successful delivery", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => Response.json({ success: "true", message: "Please activate your form" });
    assert.equal((await POST(request())).status, 503);
    globalThis.fetch = async () => Response.json({ success: false }, { status: 500 });
    assert.equal((await POST(request())).status, 503);
    globalThis.fetch = async () => { throw new Error("timeout"); };
    const result = await POST(request());
    assert.equal(result.status, 502);
    assert.match((await result.json()).error, /Tu mensaje sigue acá/);
  } finally { globalThis.fetch = original; }
});
