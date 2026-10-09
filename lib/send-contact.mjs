import { validateContact, contactEmailFields } from "./contact.mjs";

// FormSubmit's AJAX integration runs in the visitor's browser, with the
// site's real origin/referrer, rather than forwarding through our server.
export const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/lic.juliana.nl@gmail.com";
export const UNCONFIRMED_DELIVERY = "No pudimos confirmar el envío. Tu mensaje sigue acá; podés intentarlo nuevamente o escribirme por email.";

export async function sendContact(input, { fetcher = globalThis.fetch, timeoutMs = 30000 } = {}) {
  const result = validateContact(input);
  if (result.error) throw new Error(result.error);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const delivery = await fetcher(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(contactEmailFields(result.data, result.service)),
      signal: controller.signal,
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin",
    });
    let payload;
    try {
      payload = await delivery.json();
    } catch {
      throw new Error(UNCONFIRMED_DELIVERY);
    }
    if (/activat|confirm.*email/i.test(payload?.message || "")) {
      throw new Error("El formulario está pendiente de habilitación. Tu mensaje sigue acá; por ahora, podés escribirme por email.");
    }
    if (!delivery.ok || ![true, "true"].includes(payload?.success)) {
      throw new Error(UNCONFIRMED_DELIVERY);
    }
  } catch (failure) {
    // Never show raw provider responses or network details to visitors.
    if (failure?.message === UNCONFIRMED_DELIVERY || failure?.message?.startsWith("El formulario está pendiente")) throw failure;
    throw new Error(UNCONFIRMED_DELIVERY);
  } finally {
    clearTimeout(timer);
  }
}
