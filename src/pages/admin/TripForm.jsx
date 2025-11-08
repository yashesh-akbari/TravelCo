import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addTrip, getTripById, updateTrip } from "../../services/trips";

export default function TripForm() {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();

  // if edit mode
  const existing = id ? getTripById(id) : null;

  const [title, setTitle] = useState(existing?.title || "");
  const [type, setType] = useState(existing?.type || "Domestic");
  const [price, setPrice] = useState(existing?.price || "");
  const [itinerary, setItinerary] = useState(existing?.itinerary || []);
  const [tripImages, setTripImages] = useState(existing?.images || existing?.image ? [existing.image] : []);
  const [inclusions, setInclusions] = useState(existing?.inclusions || {
    meal: false,
    hotel: false,
    transport: false,
    sightseeing: false,
    support: false,
    visa: false
  });

  // Automatically update days based on itinerary length
  const days = itinerary.length || 1;

  // Initialize itinerary if editing and no itinerary exists
  useEffect(() => {
    if (existing && existing.itinerary && existing.itinerary.length > 0) {
      setItinerary(existing.itinerary);
    }
  }, [existing]);

  const handleAddDay = () => {
    setItinerary([
      ...itinerary,
      { dayTitle: "", dayDescription: "" }
    ]);
  };

  const handleDeleteDay = (index) => {
    if (confirm("Are you sure you want to delete this day?")) {
      const newDays = itinerary.filter((_, i) => i !== index);
      setItinerary(newDays);
    }
  };

  const handleChangeDay = (index, field, value) => {
    const newDays = [...itinerary];
    newDays[index][field] = value;
    setItinerary(newDays);
  };

  const handleTripImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} size should be less than 5MB`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTripImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input
    e.target.value = "";
  };

  const removeTripImage = (index) => {
    setTripImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDayImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newDays = [...itinerary];
        newDays[index].dayImage = reader.result;
        setItinerary(newDays);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Validation: Title is required
    if (!title || title.trim() === "") {
      alert("Please enter a trip title");
      return;
    }

    // Validation: At least one day must be added
    if (itinerary.length === 0) {
      alert("Error: You must add at least one day to the day-wise plan before saving the trip.\n\nPlease click '+ Add Day' to add days to your itinerary.");
      return;
    }

    const data = {
      id: existing?.id || crypto.randomUUID(),
      title: title.trim(),
      type,
      price: price.trim(),
      days: itinerary.length, // Use itinerary length for days
      itinerary,
      images: tripImages,
      image: tripImages[0] || "", // Keep first image for backward compatibility
      inclusions,
      slug: title.toLowerCase().replaceAll(" ", "-")
    };

    if (existing) {
      updateTrip(existing.id, data);
    } else {
      addTrip(data);
    }

    navigate("/admin/trips");
  };

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

      <h1 className="text-2xl font-bold text-orange-600">
        {existing ? "Edit Trip" : "Create Trip"}
      </h1>

      <div className="space-y-4 border rounded-xl p-6 bg-white shadow-sm">

        <div>
          <label className="text-sm font-medium">Trip Title</label>
          <input
            className="border w-full p-2 rounded mt-1 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goa Beach Tour"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Trip Type</label>
          <select
            className="border w-full p-2 rounded mt-1 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Domestic</option>
            <option>International</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Starting Price (₹)</label>
          <input
            type="text"
            className="border w-full p-2 rounded mt-1 text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="19,999"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Trip Cover Images (Multiple)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="border w-full p-2 rounded mt-1 text-sm"
            onChange={handleTripImageChange}
          />
          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB per image. You can select multiple images.</p>
          {tripImages.length > 0 && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tripImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img} alt={`Cover ${idx + 1}`} className="w-full h-32 object-cover rounded border" />
                  <button
                    onClick={() => removeTripImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* DAY WISE ITINERARY */}
      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Day Wise Plan</h2>
          <button
            onClick={handleAddDay}
            className="bg-orange-600 text-white px-4 py-1 text-sm rounded-lg hover:bg-orange-700"
          >
            + Add Day
          </button>
        </div>

        {itinerary.map((d, idx) => (
          <div key={idx} className="border rounded-lg p-4 space-y-3 relative">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Day {idx + 1}</div>
              <button
                onClick={() => handleDeleteDay(idx)}
                className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700"
              >
                Delete Day
              </button>
            </div>
            <input
              className="border w-full p-2 rounded text-sm"
              placeholder="Day title"
              value={d.dayTitle || ""}
              onChange={(e) => handleChangeDay(idx, "dayTitle", e.target.value)}
            />
            <textarea
              className="border w-full p-2 rounded text-sm"
              rows={3}
              placeholder="Day Description"
              value={d.dayDescription || ""}
              onChange={(e) => handleChangeDay(idx, "dayDescription", e.target.value)}
            />
            <div>
              <label className="text-xs font-medium text-gray-600">Day Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                className="border w-full p-2 rounded mt-1 text-sm"
                onChange={(e) => handleDayImageChange(idx, e)}
              />
              {d.dayImage && (
                <div className="mt-2">
                  <img src={d.dayImage} alt={`Day ${idx + 1}`} className="max-w-xs max-h-32 rounded border" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inclusion Section */}
      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Inclusions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inclusions.meal}
              onChange={(e) => setInclusions({...inclusions, meal: e.target.checked})}
              className="w-4 h-4 text-orange-600 rounded"
            />
            <span className="text-sm">Meal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inclusions.hotel}
              onChange={(e) => setInclusions({...inclusions, hotel: e.target.checked})}
              className="w-4 h-4 text-orange-600 rounded"
            />
            <span className="text-sm">Hotel</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inclusions.transport}
              onChange={(e) => setInclusions({...inclusions, transport: e.target.checked})}
              className="w-4 h-4 text-orange-600 rounded"
            />
            <span className="text-sm">Transport</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inclusions.sightseeing}
              onChange={(e) => setInclusions({...inclusions, sightseeing: e.target.checked})}
              className="w-4 h-4 text-orange-600 rounded"
            />
            <span className="text-sm">Sightseeing</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inclusions.support}
              onChange={(e) => setInclusions({...inclusions, support: e.target.checked})}
              className="w-4 h-4 text-orange-600 rounded"
            />
            <span className="text-sm">24/7 Support</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inclusions.visa}
              onChange={(e) => setInclusions({...inclusions, visa: e.target.checked})}
              className="w-4 h-4 text-orange-600 rounded"
            />
            <span className="text-sm">Visa</span>
          </label>
        </div>
      </div>

      {itinerary.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Required:</strong> You must add at least one day to the day-wise plan before saving the trip.
          </p>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={itinerary.length === 0}
        className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
          itinerary.length === 0
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Save Trip
      </button>
    </div>
  );
}
