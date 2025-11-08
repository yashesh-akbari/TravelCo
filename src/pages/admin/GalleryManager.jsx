import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";
import { getGallery, addGalleryItem, deleteGalleryItem } from "../../services/gallery";

export default function GalleryManager() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const gallery = getGallery();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    if (!title) return alert("Title is required");
    if (!imageFile) return alert("Please select an image file");

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      addGalleryItem({
        id: crypto.randomUUID(),
        url: base64String, // Store as base64
        title: title,
        description: description || "",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPreview("");
      document.getElementById("imageInput").value = "";
      window.location.reload();
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <PrivateRoute>
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

        <h1 className="text-2xl font-bold text-orange-600">Gallery Manager</h1>

        <div className="border p-5 bg-white rounded-xl shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium">Title *</label>
            <input
              type="text"
              className="border w-full p-2 rounded mt-1 text-sm"
              placeholder="Enter image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="border w-full p-2 rounded mt-1 text-sm"
              rows={3}
              placeholder="Enter image description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Upload Image *</label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="border w-full p-2 rounded mt-1 text-sm"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
          </div>

          {preview && (
            <div className="mt-2">
              <p className="text-xs text-gray-600 mb-2">Preview:</p>
              <img src={preview} alt="Preview" className="max-w-xs max-h-48 rounded border" />
            </div>
          )}

          <button
            onClick={addImage}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700"
          >
            + Add to Gallery
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gallery.map((g) => (
            <div key={g.id} className="border rounded-lg overflow-hidden relative bg-white shadow-sm">
              <img src={g.url} className="w-full h-32 object-cover" alt={g.title || "Gallery image"} />
              
              <div className="p-2">
                {g.title && (
                  <h3 className="text-xs font-semibold text-gray-800 mb-1">{g.title}</h3>
                )}
                {g.description && (
                  <p className="text-[10px] text-gray-600 line-clamp-2">{g.description}</p>
                )}
              </div>

              <button
                className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-2 py-1 rounded hover:bg-red-700"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this image?")) {
                    deleteGalleryItem(g.id);
                    window.location.reload();
                  }
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
}
