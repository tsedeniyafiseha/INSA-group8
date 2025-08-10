import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaPhone,
  FaMobileAlt,
  FaPooStorm,
  FaEnvelope,
  FaLink,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Campus Map", href: "/campus-map" },
    { label: "Schedule", href: "/schedule" },
    { label: "Booking", href: "/bookings" },
    { label: "Lost & Found", href: "/lost-found" },
  ];

  return (
    <footer className="bg-gray-900 text-white font-semibold">
      {}
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Your guide to AASTU campus life!
        </h2>
      </div>

      {}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        {}
        <div className="space-y-4 text-left">
          <h3 className="text-lg font-bold mb-3 font-poppins">
            Contact Information
          </h3>
          <div className="flex items-center space-x-3">
            <FaPhone className="w-5 h-5 tex-white" />
            <a
              href="#"
              className="text-blue-400 transition-colors font-Roboto"
            >
              Tel: +251 911 123 456
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaMobileAlt className="w-5 h-5 text-white" />
            <a
              href="#"
              className="text-blue-400 transition-colors font-roboto"
            >
              Mob: +251 911 123 456
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaPooStorm className="w-5 h-5 text-white" />
            <a
              href="#"
              className="text-blue-400 transition-colors font-roboto"
            >
              P.O.BOX: 16417
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="w-5 h-5" />
            <a
              href="#"
              className="text-blue-400 transition-colors font-roboto"
            >
              info@aastu.edu.et
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaLink className="w-5 h-5" />
            <a
              href="#"
              className="text-blue-400 transition-colors font-roboto"
            >
              www.aastu.edu.et
            </a>
          </div>
        </div>

        {}
        <div className="space-y-4 text-left">
          <h3 className="text-lg font-bold mb-3 font-poppins">Quick Links</h3>
          <ul className="space-y-2 font-roboto">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <NavLink
                  to={href}
                  end={href === "/"}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? "text-emerald-500"
                        : "text-blue-400 hover:text-emerald-500"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {}
        <div className="space-y-4 text-left">
          <h3 className="text-lg font-bold mb-3 font-poppins">
            Connect With AASTU
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <FaFacebookF className="text-2xl text-white " />
              <a href="#" className="text-blue-400 transition-colors font-roboto">
                Facebook
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaXTwitter className="text-2xl text-white " />
              <a href="#" className="text-blue-400 font-roboto">
                X
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaYoutube className="text-2xl text-white " />
              <a href="#" className="text-blue-400 font-roboto">
                YouTube
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaLinkedinIn className="text-2xl text-white " />
              <a href="#" className="text-blue-400 font-roboto">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {}
      <div className="bg-gray-900 py-6 flex justify-center mb-8 ">
        <div className="flex w-full max-w-md ">
          <input
            type="email"
            placeholder="Enter your email here..."
            className="flex-grow px-4 py-2 rounded-l-full focus:outline-none bg-gray-200 text-gray-900 font-roboto"
          />
          <button className="bg-green-500 px-6 py-2 rounded-r-full hover:bg-green-600 transition-colors font-bold font-poppins text-white">
            Join
          </button>
        </div>
      </div>

      {}
      <div className="bg-gray-200 w-full">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-900 text-sm py-4">
          <div className="flex items-center mb-3 md:mb-0 font-roboto">
            <p>
              2017 E.C Addis Ababa Science and Technology University (AASTU) Addis
              Ababa, Ethiopia
            </p>
          </div>
          <div className="flex items-center">
            <img
              src="icons/favicon.ico"
              alt="SCNAS | Smart Campus Navigator and Assistant System"
              className="w-6 h-6 mr-2 font-roboto"
            />
            <span>SCNAS | Smart Campus Navigator and Assistant System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
