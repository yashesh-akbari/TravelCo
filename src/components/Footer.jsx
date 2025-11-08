import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between text-sm">
        <div>© {new Date().getFullYear()} TravelCo</div>

        <div className="flex gap-4">
          <Link to="/policies">Terms & Privacy</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
