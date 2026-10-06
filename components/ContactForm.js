"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_SERVICES } from "@/lib/contact.mjs";

export default function ContactForm() {
  const [service, setService] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const statusRef = useRef(null);
  const institutional = CONTACT_SERVICES.some(item => item.value === service && item.institutional);

  useEffect(() => {
    const preselect = event => {
      const link = event.target.closest?.("[data-contact-service]");
      if (!link) return;
      const value = link.getAttribute("data-contact-service");
      if (CONTACT_SERVICES.some(item => item.value === value)) {
        setService(value);
        setState("idle");
        setError("");
      }
    };
    document.addEventListener("click", preselect);
    return () => document.removeEventListener("click", preselect);
  }, []);

  useEffect(() => {
    if (state === "success") statusRef.current?.focus();
  }, [state]);

  async function submit(event) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    fields.consent = fields.consent === "on";
    setError("");
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.error || "No pudimos confirmar el envío. Intentá nuevamente o escribime por email.");
      form.reset();
      setState("success");
    } catch (failure) {
      setState("error");
      setError(failure.name === "TimeoutError" || failure.name === "AbortError" ? "No pudimos confirmar el envío. Tu mensaje sigue acá; podés intentarlo nuevamente o escribirme por email." : failure.message);
    }
  }

  if (state === "success") return (
    <div className="contact-success" role="status" tabIndex={-1} ref={statusRef}>
      <span className="contact-eyebrow">Consulta enviada</span>
      <h3>Gracias por escribirme.</h3>
      <p>Te responderé al email que dejaste para conversar sobre tu consulta y cómo seguir.</p>
      <button className="contact-submit" onClick={() => { setService(""); setState("idle"); }}>Enviar otra consulta</button>
    </div>
  );

  return (
    <form className="contact-form" onSubmit={submit} aria-label="Formulario de contacto" aria-busy={state === "sending"}>
      <span className="contact-eyebrow">Primer contacto</span>
      <h3>¿Cómo puedo acompañarte?</h3>
      <p className="contact-form-intro">Elegí el tipo de consulta y dejame un medio de contacto. Te responderé por email.</p>
      <p className="contact-required">Los campos con * son obligatorios.</p>
      <fieldset disabled={state === "sending"}>
        <div className="contact-fields">
          <div className="contact-field contact-wide">
            <label htmlFor="contact-service">Quiero consultar por *</label>
            <select id="contact-service" name="service" value={service} onChange={event => { setService(event.target.value); setError(""); }} required>
              <option value="" disabled>Elegí una opción</option>
              {CONTACT_SERVICES.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-name">Tu nombre *</label>
            <input id="contact-name" name="name" autoComplete="name" maxLength={100} required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email *</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
          </div>
          {institutional && <>
            <div className="contact-institution-heading contact-wide">
              <span>Sobre la propuesta</span>
              <p>Para charlas, talleres y otras propuestas de salud mental adaptadas a tu equipo o institución.</p>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-organization">Empresa o institución *</label>
              <input id="contact-organization" name="organization" autoComplete="organization" maxLength={160} required />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-role">Tu rol <span>(opcional)</span></label>
              <input id="contact-role" name="role" autoComplete="organization-title" maxLength={100} />
            </div>
            <div className="contact-field contact-wide">
              <label htmlFor="contact-topic">¿Qué les interesa trabajar? *</label>
              <textarea id="contact-topic" name="topic" rows={3} maxLength={500} aria-describedby="contact-topic-help" required />
              <p id="contact-topic-help" className="contact-help">Por ejemplo, estrés laboral, vínculos, comunicación o acompañamiento a familias y docentes.</p>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-modality">Modalidad <span>(opcional)</span></label>
              <select id="contact-modality" name="modality" defaultValue="">
                <option value="">Elegí una opción</option>
                <option value="virtual">Virtual</option>
                <option value="presencial">Presencial</option>
                <option value="definir">A definir</option>
              </select>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-location">Ciudad o país <span>(opcional)</span></label>
              <input id="contact-location" name="location" maxLength={120} />
            </div>
          </>}
          <div className="contact-field contact-wide">
            <label htmlFor="contact-phone">Teléfono <span>(opcional)</span></label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} aria-describedby="contact-phone-help" />
            <p id="contact-phone-help" className="contact-help">Si preferís que luego te contacte por ese medio, incluí el código de país.</p>
          </div>
          <div className="contact-field contact-wide">
            <label htmlFor="contact-message">{institutional ? "¿Querés sumar algo más?" : "¿Querés contarme algo?"} <span>(opcional)</span></label>
            <textarea id="contact-message" name="message" rows={3} maxLength={1200} aria-describedby="contact-message-help" />
            <p id="contact-message-help" className="contact-help">Con unas líneas alcanza. Los detalles personales o clínicos podemos conversarlos en un espacio de entrevista.</p>
          </div>
          <div className="contact-honey" aria-hidden="true">
            <label htmlFor="contact-website">Sitio web</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
        </div>
        <label className="contact-consent" htmlFor="contact-consent">
          <input id="contact-consent" name="consent" type="checkbox" required />
          <span>Acepto que mis datos se utilicen para responder a esta consulta. *</span>
        </label>
        <details className="contact-privacy">
          <summary>Cómo se envían tus datos</summary>
          <p>El formulario utiliza FormSubmit para enviar tus datos de contacto y el mensaje al correo de Juliana. FormSubmit informa que conserva los envíos durante 30 días. No uses este espacio para enviar información clínica detallada. Podés solicitar la eliminación del correo recibido escribiendo a <a href="mailto:lic.juliana.nl@gmail.com">lic.juliana.nl@gmail.com</a>. Consultá la <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">política de privacidad de FormSubmit</a>.</p>
        </details>
        <button className="contact-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar consulta"}<span aria-hidden="true">→</span></button>
      </fieldset>
      {error && <p className="contact-error" role="alert">{error} <a href="mailto:lic.juliana.nl@gmail.com">Escribirme por email</a></p>}
    </form>
  );
}
