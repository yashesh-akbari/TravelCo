import TripCard from "../components/TripCard";
import ImageSlider from "../components/ImageSlider";
import Services from "../components/Services";
import { getTrips } from "../services/trips";

export default function Home() {
  // Fetch trips from localStorage
  const allTrips = getTrips();
  const domesticTrips = allTrips.filter(trip => trip.type === "Domestic");
  const internationalTrips = allTrips.filter(trip => trip.type === "International");

  // Beautiful travel location images for slider
  const domesticImages = [
    { 
      url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80", 
      alt: "Taj Mahal, Agra - Beautiful monument at sunrise" 
    },
    { 
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", 
      alt: "Goa Beach - Serene beach with palm trees" 
    },
    { 
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80", 
      alt: "Kashmir Valley - Snow-capped mountains and lakes" 
    },
    { 
      url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80", 
      alt: "Rajasthan Desert - Golden sand dunes at sunset" 
    },
    { 
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80", 
      alt: "Kerala Backwaters - Peaceful waterways and greenery" 
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* MAIN */}
      <section className="space-y-10">

        {/* Domestic */}
        <div className="space-y-4">
          {/* Image Slider */}
          <ImageSlider images={domesticImages} />
          
          <h2 className="text-xl font-semibold text-orange-600">Domestic Packages</h2>

          {/* Trip Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {domesticTrips.length > 0 ? (
              domesticTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-sm py-8">
                No domestic trips available yet.
              </div>
            )}
          </div>

          {/* See More Link */}
          <div className="flex justify-center">
            <a href="/destinations/domestic" className="text-sm underline text-orange-600 hover:text-orange-700">See more</a>
          </div>
        </div>


        {/* International */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-orange-600">International Packages</h2>

          {/* Trip Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {internationalTrips.length > 0 ? (
              internationalTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-sm py-8">
                No international trips available yet.
              </div>
            )}
          </div>

          {/* See More Link */}
          <div className="flex justify-center">
            <a href="/destinations/international" className="text-sm underline text-orange-600 hover:text-orange-700">See more</a>
          </div>
        </div>

        {/* Services Section */}
        <Services />

        {/* Banner */}
        <div className="rounded-xl border p-8 text-center bg-orange-50">
          <h3 className="text-2xl font-bold text-orange-700">Plan Your Dream Holiday</h3>
          <p className="text-gray-700 mt-2">Talk to our experts for custom itineraries.</p>
          <a href="/contact" className="inline-block mt-4 underline text-orange-700">Contact us</a>
        </div>

      </section>
    </div>
  );
}
