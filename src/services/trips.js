// ===== TRIPS STORAGE SERVICE =====

// LocalStorage KEY
const KEY = "travel_trips";

// get all trips
export function getTrips() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

// save all trips
function saveTrips(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// create new trip
export function addTrip(trip) {
  const list = getTrips();
  list.push(trip);
  saveTrips(list);
}

// get trip by id
export function getTripById(id) {
  return getTrips().find(t => t.id === id);
}

// get trip by slug
export function getTripBySlug(slug) {
  return getTrips().find(t => t.slug === slug);
}

// update trip
export function updateTrip(id, updated) {
  const list = getTrips();
  const index = list.findIndex(t => t.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...updated };
    saveTrips(list);
  }
}

// delete a trip
export function deleteTrip(id) {
  const list = getTrips().filter(t => t.id !== id);
  saveTrips(list);
}
