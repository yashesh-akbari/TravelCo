const KEY = "travel_invoices";

export function getInvoices() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function saveInvoices(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addInvoice(inv) {
  const list = getInvoices();
  list.push(inv);
  saveInvoices(list);
}

export function deleteInvoice(id) {
  const list = getInvoices().filter(i => i.id !== id);
  saveInvoices(list);
}
