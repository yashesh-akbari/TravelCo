import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripBySlug } from "../services/trips";
import ImageSlider from "../components/ImageSlider";

export default function TripDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const trip = getTripBySlug(slug);
  const [expandedDays, setExpandedDays] = useState({});

  // If trip not found, show message
  if (!trip) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="border rounded-xl p-8 bg-white shadow-sm text-center">
          <h1 className="text-2xl font-bold text-orange-600 mb-4">Trip Not Found</h1>
          <p className="text-gray-600">The trip you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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
      
      {/* Hero / Title */}
      <div className="space-y-4">
        {/* Cover Images Slider */}
        {trip.images && trip.images.length > 0 ? (
          <ImageSlider images={trip.images.map(img => ({ url: img, alt: trip.title }))} />
        ) : trip.image ? (
          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="aspect-video bg-gray-200 overflow-hidden">
              <img 
                src={trip.image} 
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              COVER IMAGE
            </div>
          </div>
        )}
        
        {/* Trip Info */}
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <h1 className="text-2xl font-bold text-orange-600">
            {trip.title}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">
              {trip.days} {trip.days === 1 ? "Day" : "Days"}
            </p>
            {trip.type && (
              <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                {trip.type}
              </span>
            )}
          </div>
          {trip.price && (
            <p className="text-gray-600 mt-1">
              Starting from ₹{trip.price}
            </p>
          )}
        </div>
      </div>

      {/* Trip Summary */}
      {trip.description && (
        <section className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
          <h2 className="text-xl font-semibold text-orange-600">Trip Summary</h2>
          <p className="text-sm text-gray-700">
            {trip.description}
          </p>
        </section>
      )}

      {/* Itinerary */}
      <section className="border rounded-xl p-5 bg-white shadow-sm space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Itinerary</h2>

        {trip.itinerary && trip.itinerary.length > 0 ? (
          <>
            <div className="space-y-6">
              {trip.itinerary.map((day, index) => {
                const isExpanded = expandedDays[index];
                return (
                  <div key={index} className="space-y-3">
                    {/* Day Header */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Day {index + 1} {day.dayTitle ? `— ${day.dayTitle}` : ""}
                      </h3>
                    </div>
                    
                    {isExpanded ? (
                      <div className="ml-14 space-y-4">
                        {/* Image and Description Layout */}
                        <div className="flex flex-col md:flex-row gap-4">
                          {day.dayImage && (
                            <div className="flex-shrink-0">
                              <div className="rounded-lg overflow-hidden max-w-md">
                                <img 
                                  src={day.dayImage} 
                                  alt={`Day ${index + 1} - ${day.dayTitle || ""}`}
                                  className="w-full h-48 sm:h-64 md:h-80 object-cover"
                                />
                              </div>
                            </div>
                          )}
                          <div className="flex-1">
                            {day.dayTitle && (
                              <h4 className="font-semibold text-base text-gray-800 mb-2">
                                {day.dayTitle}
                              </h4>
                            )}
                            {day.dayDescription && (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {day.dayDescription}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* See less link */}
                        <button
                          onClick={() => {
                            setExpandedDays(prev => ({
                              ...prev,
                              [index]: false
                            }));
                          }}
                          className="text-orange-600 underline text-sm hover:text-orange-700 transition"
                        >
                          See less
                        </button>
                      </div>
                    ) : (
                      <div className="ml-14">
                        <button
                          onClick={() => {
                            setExpandedDays(prev => ({
                              ...prev,
                              [index]: true
                            }));
                          }}
                          className="text-orange-600 underline text-sm hover:text-orange-700 transition"
                        >
                          See details & photo
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* WhatsApp Inquiry Button */}
            <div className="pt-4 border-t">
              <button
                onClick={() => {
                  const whatsappMessage = `*Trip Inquiry*\n\n*Trip:* ${trip.title}\n*Days:* ${trip.days} ${trip.days === 1 ? "Day" : "Days"}\n\nI'm interested in this trip. Please provide more details and pricing information.`;
                  const encodedMessage = encodeURIComponent(whatsappMessage);
                  const whatsappNumber = "918849740889";
                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="w-full bg-green-600 text-white px-6 py-4 rounded-lg text-base font-semibold hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-md"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Inquire about this Trip on WhatsApp
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 text-sm py-8">
            No itinerary details available for this trip.
          </div>
        )}
      </section>

      {/* Inclusion Section */}
      {trip.inclusions && (
        <section className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
          <h2 className="text-xl font-semibold text-orange-600">Inclusions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {trip.inclusions.meal && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Meal</span>
              </div>
            )}
            {trip.inclusions.hotel && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Hotel</span>
              </div>
            )}
            {trip.inclusions.transport && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Transport</span>
              </div>
            )}
            {trip.inclusions.sightseeing && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sightseeing</span>
              </div>
            )}
            {trip.inclusions.support && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 Support</span>
              </div>
            )}
            {trip.inclusions.visa && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Visa</span>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
