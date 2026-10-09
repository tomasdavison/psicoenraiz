import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, contactEmailFields } from "../lib/contact.mjs";
import { sendContact, CONTACT_ENDPOINT, UNCONFIRMED_DELIVERY } from "../lib/send-contact.mjs";

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

test("invalid inquiries do not reach the delivery service", async () => {
  let calls = 0;
  const fetcher = () => { calls++; throw new Error("Must not send"); };
  for (const change of [{ consent: false }, { website: "spam" }, { email: "invalid" }]) {
    await assert.rejects(sendContact({ ...valid, ...change }, { fetcher }));
  }
  assert.equal(calls, 0);
});

test("direct AJAX delivery preserves the reply address and removes hidden institution fields", async () => {
  let outgoing;
  const fetcher = async (url, options) => {
    assert.equal(url, CONTACT_ENDPOINT);
    assert.equal(options.credentials, "omit");
    assert.equal(options.headers.Referer, undefined);
    outgoing = JSON.parse(options.body);
    return Response.json({ success: "true", message: "Email sent" });
  };
  await sendContact({ ...valid, organization: "Old hidden data", topic: "Old topic" }, { fetcher });
  assert.equal(outgoing._replyto, valid.email);
  assert.equal(outgoing.Institución, undefined);
  assert.match(outgoing._subject, /Terapia individual/);
});

test("pending activation is never shown as a sent consultation", async () => {
  await assert.rejects(sendContact(valid, {
    fetcher: async () => Response.json({ success: "true", message: "Please activate your form" }),
  }), /pendiente de habilitación/);
});

test("HTML, provider failures and network failures keep an unconfirmed delivery state", async () => {
  for (const fetcher of [
    async () => new Response("<html>Provider error</html>", { status: 502 }),
    async () => Response.json({ success: false }),
    async () => Response.json({ success: true }, { status: 500 }),
    async () => Response.json(null),
    async () => { throw new TypeError("Failed to fetch"); },
  ]) {
    await assert.rejects(sendContact(valid, { fetcher }), { message: UNCONFIRMED_DELIVERY });
  }
});

test("a slow request is aborted once without automatically sending a duplicate", async () => {
  let calls = 0;
  const fetcher = (url, { signal }) => new Promise((resolve, reject) => {
    calls++;
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
  });
  await assert.rejects(sendContact(valid, { fetcher, timeoutMs: 10 }), { message: UNCONFIRMED_DELIVERY });
  assert.equal(calls, 1);
});
