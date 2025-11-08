const KEY = "travel_gallery";

export function getGallery() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function saveGallery(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addGalleryItem(item) {
  const list = getGallery();
  list.push(item);
  saveGallery(list);
}

export function deleteGalleryItem(id) {
  const list = getGallery().filter((i) => i.id !== id);
  saveGallery(list);
}
