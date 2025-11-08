import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("adminLogged") === "yes";
  const isAdminPage = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    localStorage.removeItem("adminLogged");
    navigate("/admin/login");
  };

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    // Set a 2 second delay before closing
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 2000); // 2 seconds = 2000 milliseconds
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-orange-600">TravelCo</Link>

        <nav className="flex gap-6 text-sm font-medium">
          {!isAdminPage && (
            <>
              <Link to="/">Home</Link>
              
              {/* Destinations Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="hover:text-orange-600 transition">
                  Destinations
                </button>
                
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg min-w-[160px] py-2">
                    <Link 
                      to="/destinations/domestic" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      Domestic
                    </Link>
                    <Link 
                      to="/destinations/international" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      International
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/gallery">Gallery</Link>
              <Link to="/contact">Contact</Link>
            </>
          )}
          
          {isAdminPage && isAdmin ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : !isAdminPage ? (
            <Link to="/admin/login" className="text-orange-600 font-semibold">Login</Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
