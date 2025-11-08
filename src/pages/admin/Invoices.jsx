import { useState } from "react";
import PrivateRoute from "../../auth/PrivateRoute";
import { getInvoices, addInvoice, deleteInvoice } from "../../services/invoices";

export default function Invoices() {
  const invoices = getInvoices();

  const [customerName, setCustomerName] = useState("");
  const [tripName, setTripName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewInvoice = () => {
    if (!customerName || !tripName || !amount) return alert("All fields required");

    addInvoice({
      id: crypto.randomUUID(),
      customerName,
      tripName,
      amount,
      date: new Date().toLocaleDateString()
    });

    setCustomerName("");
    setTripName("");
    setAmount("");
    window.location.reload();
  };

  return (
    <PrivateRoute>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-orange-600">Invoices</h1>

        {/* form */}
        <div className="border p-6 rounded-xl bg-white shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Create Invoice</h2>

          <input
            className="border p-2 w-full rounded text-sm"
            placeholder="Customer Name"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />

          <input
            className="border p-2 w-full rounded text-sm"
            placeholder="Trip Name"
            value={tripName}
            onChange={e => setTripName(e.target.value)}
          />

          <input
            className="border p-2 w-full rounded text-sm"
            placeholder="Amount (₹)"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <button
            onClick={addNewInvoice}
            className="bg-orange-600 text-white px-4 py-2 rounded text-sm"
          >
            + Add Invoice
          </button>
        </div>

        {/* list */}
        <div className="border p-6 rounded-xl bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Trip</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Delete</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map(i => (
                <tr key={i.id} className="border-b">
                  <td className="py-2">{i.customerName}</td>
                  <td className="py-2">{i.tripName}</td>
                  <td className="py-2">₹{i.amount}</td>
                  <td className="py-2">{i.date}</td>
                  <td>
                    <button
                      className="text-red-600 underline"
                      onClick={() => {
                        deleteInvoice(i.id)
                        window.location.reload()
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}

              {invoices.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No invoices yet.
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
