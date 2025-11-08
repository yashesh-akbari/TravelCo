import { useState } from "react";
import PrivateRoute from "../../auth/PrivateRoute";
import { getExpenses, addExpense, deleteExpense } from "../../services/expenses";

export default function Expenses() {
  const expenses = getExpenses();

  const [vendorName, setVendorName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = () => {
    if (!vendorName || !purpose || !amount) return alert("All fields required");

    addExpense({
      id: crypto.randomUUID(),
      vendorName,
      purpose,
      amount,
      date: new Date().toLocaleDateString()
    });

    setVendorName("");
    setPurpose("");
    setAmount("");
    window.location.reload();
  };

  return (
    <PrivateRoute>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-orange-600">Outvoices / Expenses</h1>

        {/* form */}
        <div className="border p-6 rounded-xl bg-white shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Add Expense</h2>

          <input
            className="border p-2 w-full rounded text-sm"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={e => setVendorName(e.target.value)}
          />

          <input
            className="border p-2 w-full rounded text-sm"
            placeholder="Purpose"
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
          />

          <input
            className="border p-2 w-full rounded text-sm"
            placeholder="Amount (₹)"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <button
            onClick={addNewExpense}
            className="bg-orange-600 text-white px-4 py-2 rounded text-sm"
          >
            + Add Expense
          </button>
        </div>

        {/* list */}
        <div className="border p-6 rounded-xl bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Vendor</th>
                <th className="text-left py-2">Purpose</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Delete</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map(e => (
                <tr key={e.id} className="border-b">
                  <td className="py-2">{e.vendorName}</td>
                  <td className="py-2">{e.purpose}</td>
                  <td className="py-2">₹{e.amount}</td>
                  <td className="py-2">{e.date}</td>
                  <td>
                    <button
                      className="text-red-600 underline"
                      onClick={() => { deleteExpense(e.id); window.location.reload(); }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}

              {expenses.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No expenses yet.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </div>
    </PrivateRoute>
  );
}
