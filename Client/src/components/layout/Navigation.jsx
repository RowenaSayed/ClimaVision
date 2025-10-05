import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Cloud, User, BarChart3, Info, Menu, X, Home } from "lucide-react";

export default function Navigation({ currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate=useNavigate()
  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      setProfileOpen(false);
      navigate("/");
    },1000)
  };

  return (
    <header className="sticky top-0 z-100">
      <nav
        className="bg-[#0D1117] border-b border-[#161B22] px-6 py-4 sticky top-0 "
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2"
            title="WeatherScope Home"
          >
            <div className="relative">
              <Cloud className="h-8 w-8 text-[#00B8D9]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#00B8D9] to-[#FF6B6B] rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl text-white font-semibold">
              ClimaVision
            </span>
          </Link>

          {/* ========================================================== */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* ========================================================== */}
          <ul
            className={`flex-col md:flex-row md:flex items-center space-y-4 md:space-y-0 md:space-x-4 
              ${
                isOpen
                  ? "flex absolute top-16 left-0 w-full bg-[#0D1117] px-6 py-4"
                  : "hidden md:flex"
              }`}
          >
            <li>
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    currentPage === "/"
                      ? "bg-[#00B8D9] text-white"
                      : "text-white hover:text-[#00B8D9]"
                  }`}
                title="Go to Dashboard"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/history"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    currentPage === "dashboard"
                      ? "bg-[#00B8D9] text-white"
                      : "text-white hover:text-[#00B8D9]"
                  }`}
                title="Go to Dashboard"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    currentPage === "about"
                      ? "bg-[#00B8D9] text-white"
                      : "text-white hover:text-[#00B8D9]"
                  }`}
                title="Learn more About Data"
                onClick={() => setIsOpen(false)}
              >
                <Info className="h-4 w-4 mr-2" />
                About Data
              </Link>
            </li>

            <li className="relative">
              {token ? (
                <>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-[#161B22] text-white hover:ring-2 hover:ring-[#00B8D9] hover:cursor-pointer transition"
                    title="User Menu"
                    aria-label="User Menu"
                  >
                    <User className="h-4 w-4" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#161B22] text-white rounded-md shadow-lg">
                      <Link
                        to="settings/profile"
                        onClick={() => {
                          setProfileOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-[#00B8D9] hover:text-black transition"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-500 bg-red-100  hover:bg-red-500 hover:text-white transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-[#00B8D9] hover:bg-[#009bb3] transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login / Signup
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
