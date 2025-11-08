import { useNavigate } from "react-router-dom";
import TripCard from "../components/TripCard";
import { getTrips } from "../services/trips";

export default function International() {
  const navigate = useNavigate();
  const internationalTrips = getTrips().filter(trip => trip.type === "International");

  return (
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

      <h1 className="text-2xl font-bold text-orange-600">International Trips</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {internationalTrips.length > 0 ? (
          internationalTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-sm py-8">
            No international trips available yet.
          </div>
        )}
      </div>
    </div>
  );
}
