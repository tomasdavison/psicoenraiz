export const CONTACT_SERVICES = [
  { value: "individual", label: "Terapia individual" },
  { value: "pareja", label: "Terapia de pareja" },
  { value: "familias", label: "Adolescentes y orientación a familias" },
  { value: "supervision", label: "Supervisión clínica" },
  { value: "empresas", label: "Empresas y organizaciones", institutional: true },
  { value: "educacion", label: "Escuelas e instituciones educativas", institutional: true },
  { value: "otra", label: "Otra consulta" },
];

export function validateContact(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Revisá los datos de la consulta." };
  }
  const limits = { name: 100, email: 254, phone: 40, message: 1200, organization: 160, role: 100, topic: 500, location: 120, modality: 20, service: 30, website: 200 };
  const data = {};
  for (const [key, max] of Object.entries(limits)) {
    if (input[key] !== undefined && typeof input[key] !== "string") {
      return { error: "Revisá los datos de la consulta." };
    }
    data[key] = (input[key] || "").trim();
    if (data[key].length > max) return { error: "Uno de los campos es demasiado largo." };
  }
  if (data.website) return { error: "No pudimos enviar la consulta. Escribime por email." };
  if (!data.name || !data.email || !data.service || input.consent !== true) {
    return { error: "Completá tu nombre, email y tipo de consulta, y aceptá el uso de tus datos para responderte." };
  }
  if (/[\r\n]/.test(data.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: "Ingresá un email válido para que pueda responderte." };
  }
  const service = CONTACT_SERVICES.find(item => item.value === data.service);
  if (!service) return { error: "Elegí un tipo de consulta válido." };
  if (service.institutional && (!data.organization || !data.topic)) {
    return { error: "Completá el nombre de la institución y el tema que les interesa trabajar." };
  }
  if (service.institutional && !["", "virtual", "presencial", "definir"].includes(data.modality)) {
    return { error: "Elegí una modalidad válida." };
  }
  // Do not forward hidden institutional fields after a visitor changes service.
  if (!service.institutional) {
    for (const key of ["organization", "role", "topic", "location", "modality"]) data[key] = "";
  }
  return { data, service };
}

export function contactEmailFields(data, service) {
  const fields = {
    name: data.name,
    email: data.email,
    _replyto: data.email,
    _subject: `Psico.enraiz · ${service.label}`,
    _template: "table",
    _url: "https://www.psicoenraiz.com/#contacto",
    Consulta: service.label,
    "Uso de datos": "Aceptado para responder a esta consulta",
  };
  const optional = { phone: "Teléfono", message: "Mensaje", organization: "Institución", role: "Rol", topic: "Tema de interés", location: "Ciudad o país", modality: "Modalidad" };
  for (const [key, label] of Object.entries(optional)) {
    if (data[key]) fields[label] = data[key];
  }
  return fields;
}
