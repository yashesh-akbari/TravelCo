const KEY = "travel_expenses";

export function getExpenses() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function saveExpenses(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addExpense(exp) {
  const list = getExpenses();
  list.push(exp);
  saveExpenses(list);
}

export function deleteExpense(id) {
  const list = getExpenses().filter(e => e.id !== id);
  saveExpenses(list);
}
