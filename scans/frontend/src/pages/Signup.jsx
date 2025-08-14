// src/pages/Signup.jsx
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isConfirmValid = confirmPassword === password && confirmPassword !== "";

  return (
    <div className="relative w-screen h-screen bg-gradient-to-r from-[#c0ceeb] to-[#87d0b8] flex items-center justify-center overflow-hidden">
      

      {/* Main Signup Panel */}
      <div className="relative z-10 flex w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden h-[500px]">
        {/* Left Panel */}
        <div className="w-2/5 bg-blue-600 p-8 flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="italic tracking-wide text-lg max-w-xs mb-8">
            Already have an account? Click below to continue using the service.
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="px-8 py-2 rounded-[32px] border border-white text-white hover:bg-white hover:text-blue-600 transition"
          >
            Sign In
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-3/5 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-1 text-center">Create Account</h2>

          {/* Name */}
          <div className="mb-6 flex items-center w-3/4 mx-auto">
            <div className="flex items-center justify-center w-12 h-12 text-blue-600 mr-4">
              <FaUser size={28} />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="flex-1 py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="mb-6 flex items-center w-3/4 mx-auto">
            <div className="flex items-center justify-center w-12 h-12 text-blue-600 mr-4">
              <FaEnvelope size={28} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="flex-1 py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="mb-6 flex items-center w-3/4 mx-auto">
            <div className="flex items-center justify-center w-12 h-12 text-blue-600 mr-4">
              <FaLock size={28} />
            </div>
            <div className="flex-1 flex items-center bg-gray-100 shadow-md rounded-[32px] px-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 py-2 bg-gray-100 outline-none text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-600 ml-2"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 flex items-center w-3/4 mx-auto">
            <div className="flex items-center justify-center w-12 h-12 text-blue-600 mr-4">
              <FaLock size={28} />
            </div>
            <div
              className="flex-1 flex items-center shadow-md rounded-[32px] px-4"
              style={{
                backgroundColor: "#f3f4f6",
                border: `2px solid ${confirmPassword === "" ? "#d1d5db" : isConfirmValid ? "#10b981" : "red"}`,
                transition: "border-color 0.3s",
              }}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 py-2 bg-transparent outline-none text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-blue-600 ml-2"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="flex justify-center mb-6">
            <button className="text-white py-2 px-10 rounded-[32px] font-semibold shadow-md hover:shadow-lg transition bg-[#2563eb] active:bg-[#10b981]">
              Sign Up
            </button>
          </div>

          {/* Or Google */}
          <div className="flex items-center my-2 w-3/4 mx-auto">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-1 text-gray-500 text-sm">or using Google</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center w-3/4 mx-auto">
            <button className="flex items-center justify-center border border-blue-600 py-2 px-8 rounded-[32px] hover:bg-gray-50 transition">
              <FcGoogle className="text-xl mr-3" />
              <span className="text-gray-900 font-medium">Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
