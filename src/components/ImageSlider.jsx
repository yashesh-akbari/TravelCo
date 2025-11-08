import { useState } from "react";

export default function ImageSlider({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border bg-white shadow-sm">
      <div className="aspect-[16/6] relative overflow-hidden">
        {/* Image Container */}
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out" 
          style={{ 
            width: `${images.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / images.length}%)`
          }}
        >
          {images.map((img, index) => (
            <div key={index} className="h-full flex-shrink-0" style={{ width: `${100 / images.length}%` }}>
              {img.url ? (
                <img 
                  src={img.url} 
                  alt={img.alt || `Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center text-gray-400">
                  {img.alt || `Image ${index + 1}`}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

