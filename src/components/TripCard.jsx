import { Link } from "react-router-dom";

export default function TripCard({ trip }) {
  // Support both old format (title string) and new format (trip object)
  const title = trip?.title || trip || "Trip";
  const slug = trip?.slug || title.toLowerCase().replaceAll(" ", "-");
  const days = trip?.days || 4;
  const price = trip?.price || "19,999";

  return (
    <article className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition">
      <Link to={`/trip/${slug}`} className="block">

        {/* IMAGE */}
        <div className="aspect-video bg-gradient-to-br from-orange-200 to-orange-100 rounded-t-2xl overflow-hidden">
          {trip?.image ? (
            <img 
              src={trip.image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              Trip Image
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-gray-800">{title}</h3>

          <div className="text-[11px] text-gray-500">
            {days} {days === 1 ? "Day" : "Days"} • Starting ₹{price}
          </div>

          <div className="text-orange-600 text-xs font-semibold underline">
            Learn More →
          </div>
        </div>
      </Link>
    </article>
  );
}
