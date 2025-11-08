import { useState, useEffect } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual API endpoint
        const response = await fetch("https://api.example.com/services");
        
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
        // Fallback to sample data if API fails
        setServices([
          { id: 1, title: "Flight Booking", description: "Book flights to any destination", icon: "✈️" },
          { id: 2, title: "Hotel Reservation", description: "Find the best hotels for your stay", icon: "🏨" },
          { id: 3, title: "Travel Insurance", description: "Protect your journey with insurance", icon: "🛡️" },
          { id: 4, title: "Visa Assistance", description: "Get help with visa applications", icon: "📋" },
          { id: 5, title: "24/7 Support", description: "Round-the-clock customer support", icon: "📞" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-orange-600">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border rounded-xl p-6 bg-white shadow-sm animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && services.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-orange-600">Our Services</h2>
        <div className="border rounded-xl p-6 bg-white shadow-sm text-center text-gray-500">
          <p>Unable to load services. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-orange-600">Our Services</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {services.map((service) => (
          <div
            key={service.id || service.title}
            className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition text-center"
          >
            <div className="text-4xl mb-3">{service.icon || "⭐"}</div>
            <h3 className="font-semibold text-sm text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-xs text-gray-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

