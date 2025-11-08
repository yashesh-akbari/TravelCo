import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Destinations from "../pages/Destinations";
import Domestic from "../pages/Domestic";
import International from "../pages/International";
import TripDetail from "../pages/TripDetail";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Policies from "../pages/Policies";

// Admin
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import TripsList from "../pages/admin/TripsList";
import TripForm from "../pages/admin/TripForm";
import GalleryManager from "../pages/admin/GalleryManager";
import Invoices from "../pages/admin/Invoices";
import Expenses from "../pages/admin/Expenses";

export default function AppRouter() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/domestic" element={<Domestic />} />
      <Route path="/destinations/international" element={<International />} />

      <Route path="/trip/:slug" element={<TripDetail />} />

      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policies" element={<Policies />} />

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/trips" element={<TripsList />} />
      <Route path="/admin/trips/new" element={<TripForm />} />
      <Route path="/admin/trips/:id" element={<TripForm />} />
      <Route path="/admin/gallery" element={<GalleryManager />} />
      <Route path="/admin/invoices" element={<Invoices />} />
      <Route path="/admin/expenses" element={<Expenses />} />

    </Routes>
  );
}
