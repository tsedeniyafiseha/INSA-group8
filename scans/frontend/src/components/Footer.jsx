import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram,FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t border-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        {}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img
            src="icons/favicon.ico"
            alt="SCNAS Logo"
            className="w-6 h-6"
          />
          <span className="text-gray-900 font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
            SCNAS
          </span>
        </div>

        {}
        <nav className="flex flex-wrap justify-center space-x-4 text-gray-700 font-medium" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          {[
            { label: "Home", to: "/" },
            { label: "Campus Map", to: "/campus-map" },
            { label: "Schedule", to: "/schedule" },
            { label: "Faculty", to: "/faculty" },
            { label: "Lost & Found", to: "/lost-found" },
            { label: "About", to: "/about" },
          ].map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "text-[#2563eb]" : "hover:text-[#2563eb] transition"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {}
        <div className="flex items-center space-x-6 mt-4 md:mt-0 text-gray-600">
          <a href="#" aria-label="Facebook" className="hover:text-[#2563eb] transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" aria-label="X" className="hover:text-[#2563eb] transition">
            <FaXTwitter size={20} />
          </a>
           <a href="#" aria-label="Youtube" className="hover:text-[#2563eb] transition">
            <FaYoutube size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[#2563eb] transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-[#2563eb] transition">
            <FaLinkedinIn size={20} />
          </a>
          <span className="text-gray-900 font-semibold" style={{ fontFamily: "'Roboto ', sans-serif" }}>
            Connect to AASTU
          </span>
        </div>
      </div>

      {}
      <div
        className="text-center text-gray-600 text-sm mt-4 mb-2"
        style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
      >
        &copy; {new Date().getFullYear()} SCNAS. All rights reserved.
      </div>
    </footer>
  );
}
