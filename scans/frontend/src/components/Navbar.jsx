import React, { useState, useEffect, useRef } from "react";
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
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  const dashboardRef = useRef(null);
  const aboutRef = useRef(null);

  const linkClasses = ({ isActive }) =>
    `font-poppins flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
      isActive
        ? "bg-gray-300 text-emerald-500"
        : "text-gray-900 hover:text-emerald-500"
    }`;

  const isSignUpActive = location.pathname === "/signup";
  const isAboutActive = location.pathname === "/about";
  const isDashboardActive = [
    "/profile",
    "/campus-map",
    "/schedule",
    "/faculty",
    "/lost-found",
  ].includes(location.pathname);

  const handleScrollTo = (id) => {
    if (location.pathname === "/about") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/about#${id}`);
    }
    setAboutOpen(false);
    setMenuOpen(false);
  };

  const dashboardLinks = [
    { name: "Profile", to: "/profile", icon: faUser },
    { name: "Campus Map", to: "/campus-map", icon: faMapMarkerAlt },
    { name: "Schedule", to: "/schedule", icon: faCalendarAlt },
    { name: "Faculty", to: "/faculty", icon: faGraduationCap },
    { name: "Lost & Found", to: "/lost-found", icon: faSearch },
  ];

  
  useEffect(() => {
    /**
     * Closes the dropdowns if the user clicks outside of them.
     * @param {MouseEvent} event The click event.
     */
    const handleClickOutside = (event) => {
      
      if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
        setIsDashboardDropdownOpen(false);
      }
     
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutOpen(false);
      }
    };

   
    document.addEventListener("mousedown", handleClickOutside);

    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dashboardRef, aboutRef]); 

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-200 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <button
            className="md:hidden text-gray-900 focus:outline-none mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
          </button>
          <NavLink
            to="/"
            className="flex items-center gap-2 font-bold rounded-lg shadow-md p-1"
          >
            <img
              src="icons/favicon.ico"
              alt="SCNAS Logo"
              width="27"
              height="27"
              className="rounded-md shadow-sm"
            />
            <span className="text-xl md:text-2xl">SCNAS</span>
          </NavLink>
        </div>

       
        <ul className="hidden md:flex items-center gap-4 text-sm">
          <li>
            <NavLink to="/" className={linkClasses}>
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
          </li>
          
          <li className="relative" ref={dashboardRef}>
            <button
              onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
                isDashboardActive
                  ? "bg-gray-300 text-emerald-500"
                  : "text-gray-900 hover:text-emerald-500"
              }`}
            >
              Dashboard
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${
                  isDashboardDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDashboardDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-100 shadow-lg rounded-lg overflow-hidden z-50">
                {dashboardLinks.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={linkClasses}
                      onClick={() => setIsDashboardDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={item.icon} className="mr-2" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          
          {!isAuthenticated && (
            <>
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
            </>
          )}
          
          <li className="relative" ref={aboutRef}>
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
                isAboutActive
                  ? "text-emerald-500 font-semibold"
                  : "text-gray-900 hover:text-emerald-500"
              }`}
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> About
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${
                  aboutOpen ? "rotate-180" : ""
                } sm:inline`}
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
                      className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:text-emerald-500 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

      
        {menuOpen && (
          <div className="md:hidden bg-gray-100 shadow-md absolute top-full left-0 w-full z-40">
            <ul className="flex flex-col gap-2 p-4 text-sm">
              <li>
                <NavLink to="/" className={linkClasses} onClick={() => setMenuOpen(false)}>
                  <FontAwesomeIcon icon={faHome} /> Home
                </NavLink>
              </li>
              <li className="relative">
                <button
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
                    isDashboardActive
                      ? "bg-gray-300 text-emerald-500"
                      : "text-gray-900 hover:text-emerald-500"
                  }`}
                  onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
                >
                  <FontAwesomeIcon icon={faUser} /> Dashboard
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ml-auto transition-transform duration-200 ${
                      isDashboardDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDashboardDropdownOpen && (
                  <ul className="flex flex-col gap-1 mt-2">
                    {dashboardLinks.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={`${linkClasses} !pl-8`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <FontAwesomeIcon icon={item.icon} /> {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              
              {!isAuthenticated && (
                <>
                  <li>
                    <NavLink to="/signin" className={linkClasses} onClick={() => setMenuOpen(false)}>
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
                      onClick={() => setMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/about" className={linkClasses} onClick={() => setMenuOpen(false)}>
                  <FontAwesomeIcon icon={faInfoCircle} /> About
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
