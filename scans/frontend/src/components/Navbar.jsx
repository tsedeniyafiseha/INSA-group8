import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMapMarkerAlt,
  faCalendarAlt,
  faGraduationCap,
  faSearch,
  faSignInAlt,
  faUserPlus,
  faInfoCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);

  // Function for normal NavLink classes
  const linkClasses = ({ isActive }) =>
    `font-poppins flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
      isActive ? "bg-gray-300 text-emerald-500" : "text-gray-900 hover:text-emerald-500"
    }`;

  const isSignUpActive = location.pathname === "/signup";
  const isAboutActive = location.pathname === "/about";

 const handleScrollTo = (id) => {
  if (location.pathname === "/about") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  } else {
    navigate(`/about#${id}`);
  }
  setAboutOpen(false);
};

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-200 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 font-bold rounded-lg shadow-md p-1">
          <img
            src="icons/favicon.ico"
            alt="SCNAS Logo"
            width="27"
            height="27"
            className="rounded-md shadow-sm"
          />
          <span className="text-xl md:text-2xl">SCNAS</span>
        </NavLink>

        {/* Navigation */}
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <NavLink to="/" className={linkClasses}>
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/campus-map" className={linkClasses}>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Campus Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" className={linkClasses}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Schedule
            </NavLink>
          </li>
          <li>
            <NavLink to="/faculty" className={linkClasses}>
              <FontAwesomeIcon icon={faGraduationCap} /> Faculty
            </NavLink>
          </li>
          <li>
            <NavLink to="/lost-found" className={linkClasses}>
              <FontAwesomeIcon icon={faSearch} /> Lost & Found
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin" className={linkClasses}>
              <FontAwesomeIcon icon={faSignInAlt} /> Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
                isSignUpActive
                  ? "bg-gray-200 text-emerald-500"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </NavLink>
          </li>

          {/* About Dropdown */}
          <li className="relative">
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
                isAboutActive ? "text-emerald-500 font-semibold" : "text-gray-900 hover:text-emerald-500"
              }`}
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> About
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
              />
            </button>

            {aboutOpen && (
              <ul className="absolute left-0 mt-2 w-64 bg-gray-100 shadow-lg rounded-lg overflow-hidden z-50">
                {[
                  { name: "Interactive Map", id: "interactive-campus-map" },
                  { name: "AI Assistant", id: "ai-assistant" },
                  { name: "Faculty Directory", id: "faculty-directory" },
                  { name: "Student Dashboard", id: "student-dashboard" },
                  { name: "Navigation Help", id: "navigation-help" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleScrollTo(item.id)}
                      className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-emerald-500 hover:text-white transition"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
