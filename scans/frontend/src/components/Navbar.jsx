import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMapMarkerAlt,
  faCalendarAlt,
  faBook,
  faSearch,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();

  const linkClasses = ({ isActive }) =>
  `font-poppins flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
    isActive
      ? "bg-gray-200 text-emerald-500"
      : "text-gray-900 hover:text-emerald-500"
  }`;



  
  const isSignUpActive = location.pathname === "/signup";

  return (
    <header className="bg-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {}
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
          {}
          <span className="shadow-sm"  style={{ fontSize: "27px", lineHeight: 1 ,  }}>
            <span style={{ color: "#1f2937"  }}></span>

            SCNAS
          </span>
        </NavLink>

        {}
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink to="/" className={linkClasses}>
                <FontAwesomeIcon icon={faHome} />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/campus-map" className={linkClasses}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Campus Map
              </NavLink>
            </li>
            <li>
              <NavLink to="/schedule" className={linkClasses}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookings" className={linkClasses}>
                <FontAwesomeIcon icon={faBook} />
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/lost-found" className={linkClasses}>
                <FontAwesomeIcon icon={faSearch} />
                Lost & Found
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin" className={linkClasses}>
                <FontAwesomeIcon icon={faSignInAlt} />
                Sign In
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
                <FontAwesomeIcon icon={faUserPlus} />
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
