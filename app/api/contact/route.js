import { validateContact, contactEmailFields } from "@/lib/contact.mjs";

export const runtime = "nodejs";

const CONTACT_EMAIL = "lic.juliana.nl@gmail.com";
const response = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return response({ error: "Enviá la consulta desde el formulario de la web." }, 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return response({ error: "Formato de consulta inválido." }, 415);
  }
  const length = Number(request.headers.get("content-length"));
  if (length > 16000) return response({ error: "La consulta es demasiado larga." }, 413);
  let input;
  try {
    const text = await request.text();
    if (text.length > 16000) return response({ error: "La consulta es demasiado larga." }, 413);
    input = JSON.parse(text);
  } catch {
    return response({ error: "Revisá los datos e intentá nuevamente." }, 400);
  }
  const result = validateContact(input);
  if (result.error) return response({ error: result.error }, 400);

  try {
    const delivery = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Referer: "https://www.psicoenraiz.com/" },
      body: JSON.stringify(contactEmailFields(result.data, result.service)),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    const payload = await delivery.json();
    if (!delivery.ok || /activat|confirm.*email/i.test(payload.message || "") || ![true, "true"].includes(payload.success)) {
      return response({ error: "El envío no está disponible en este momento. Podés escribirme a lic.juliana.nl@gmail.com." }, 503);
    }
    return response({ success: true });
  } catch {
    // Do not log names, email addresses or messages.
    return response({ error: "No pudimos confirmar el envío. Tu mensaje sigue acá; podés intentarlo nuevamente o escribirme por email." }, 502);
  }
}
