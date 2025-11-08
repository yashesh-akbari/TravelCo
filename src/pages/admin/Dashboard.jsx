import { Link } from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";

function DashboardContent() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-orange-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <Link to="/admin/trips" className="border rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition">
          <div className="text-lg font-medium">Trips</div>
          <div className="text-xs text-gray-500 mt-1">Create / Edit Trips</div>
        </Link>

        <Link to="/admin/gallery" className="border rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition">
          <div className="text-lg font-medium">Gallery Manager</div>
          <div className="text-xs text-gray-500 mt-1">Manage Trip Images</div>
        </Link>

      </div>

    </div>
  );
}

export default function Dashboard() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}
