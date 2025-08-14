// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaSearch,
  FaChalkboardTeacher,
  FaBoxOpen,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <div className="relative w-full h-[90vh]">
        <img
          src="/images/map.jpg"
          alt="Campus Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563ebcc] via-[#2563eb99] to-[#10b981cc] flex flex-col items-center justify-center text-center px-6">
                                        
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Smart Campus Navigator & Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mb-6">
            Making your university experience easier, faster, and more connected.
          </p>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 bg-gradient-to-r from-[#10b981] to-[#2563eb] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-[#e5e7eb] via-[#f0fdf4] to-[#e5f4ef] text-center">
        <h2 className="text-3xl font-bold text-[#1f2937] mb-8">
          Why Choose SCNAS?
        </h2>
        <div className="grid md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#2563eb] hover:scale-105 transition-transform text-white">
            <FaMapMarkedAlt className="text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Campus Navigation</h3>
            <p>
              Find any building, classroom, or facility instantly with our smart map.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#10b981] via-[#34d399] to-[#10b981] hover:scale-105 transition-transform text-white">
            <FaSearch className="text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Search</h3>
            <p>
              Search and locate events, departments, and services in seconds.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#10b981] hover:scale-105 transition-transform text-white">
            <FaChalkboardTeacher className="text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Assistant Services</h3>
            <p>
              Get real-time help, schedules, and important updates for your campus life.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] hover:scale-105 transition-transform text-white">
            <FaBoxOpen className="text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lost and Found</h3>
            <p>
              Easily report and find lost items across campus with our dedicated system.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
