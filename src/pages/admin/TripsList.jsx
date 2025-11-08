import { Link, useNavigate } from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";
import { getTrips, deleteTrip } from "../../services/trips";

export default function TripsList() {
  const navigate = useNavigate();
  const trips = getTrips();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this trip?")) {
      deleteTrip(id);
      window.location.reload(); // refresh the page after delete
    }
  };

  return (
    <PrivateRoute>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">Trips List</h1>
          <Link
            to="/admin/trips/new"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700"
          >
            + Create New Trip
          </Link>
        </div>

        <div className="border rounded-xl bg-white p-4 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Days</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {trips.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No trips yet. Create one!
                  </td>
                </tr>
              )}

              {trips.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="py-2">{t.title}</td>
                  <td className="py-2">{t.type}</td>
                  <td className="py-2">{t.days} days</td>
                  <td className="py-2 space-x-3">
                    <Link to={`/admin/trips/${t.id}`} className="underline text-blue-600">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(t.id)} className="underline text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </PrivateRoute>
  );
}
