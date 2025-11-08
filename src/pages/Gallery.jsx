import { Link } from "react-router-dom";
import { getGallery } from "../services/gallery";

export default function Gallery() {
  const galleryImages = getGallery();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">Gallery</h1>

      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div key={img.id} className="relative group bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="w-full aspect-square rounded-t-lg overflow-hidden bg-gray-200 relative">
                <img 
                  src={img.url} 
                  alt={img.title || "Gallery image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="p-3">
                {img.title && (
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{img.title}</h3>
                )}
                {img.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">{img.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-xl p-12 bg-white shadow-sm text-center">
          <p className="text-gray-500">No images in gallery yet. Add images from the admin panel.</p>
        </div>
      )}
    </div>
  );
}
