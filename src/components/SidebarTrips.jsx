import { Link } from "react-router-dom";

// future: this will come from localStorage getTrips()
// for now dummy sample:
export default function SidebarTrips() {
  const sampleTrips = [
    { title: "Goa Beach Tour", price: "12,999", days: 4 },
    { title: "Kashmir Snow Trip", price: "18,499", days: 5 },
    { title: "Rajasthan Desert Safari", price: "14,999", days: 3 },
  ];

  return (
    <aside className="space-y-4">
      <h2 className="text-lg font-semibold text-orange-600">Popular Trips</h2>

      <div className="space-y-4">
        {sampleTrips.map((trip, index) => {
          const slug = trip.title.toLowerCase().replaceAll(" ", "-");

          return (
            <Link
              to={`/trip/${slug}`}
              key={index}
              className="block border rounded-xl bg-white shadow-sm hover:shadow-md transition p-3"
            >
              <div className="font-semibold text-sm text-gray-800">{trip.title}</div>
              <div className="text-[11px] text-gray-500 mt-[2px]">
                {trip.days} Days • ₹{trip.price}
              </div>

              <div className="text-[11px] font-semibold text-orange-600 underline mt-1">
                View Trip →
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
