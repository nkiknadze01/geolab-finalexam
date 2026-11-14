// crypto.randomUUID მუშაობს მხოლოდ უსაფრთხო კონტექსტში (https/localhost).
// http://192.168.x.x-ზე გახსნისას ის undefined არის და აპი თეთრდებოდა — ამიტომ fallback გვაქვს.
export function uid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}
