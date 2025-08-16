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
      
      {}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full md:max-w-5xl md:shadow-2xl md:rounded-xl overflow-hidden md:h-[500px] bg-white">
        
        {}
        <div className="hidden md:flex md:w-2/5 bg-blue-600 p-8 flex-col items-center justify-center text-center text-white">
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

        {}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>

          {}
          <div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
            <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 text-blue-600 mr-4">
              <FaUser size={20} className="md:w-7 md:h-7" />
            </div>
            <div className="flex-1 flex items-center bg-gray-100 shadow-md rounded-[32px] py-2 px-4">
              <input
                type="text"
                placeholder="User Name"
                className="flex-1 outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>

          {}
          <div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
            <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 text-blue-600 mr-4">
              <FaEnvelope size={20} className="md:w-7 md:h-7" />
            </div>
            <div className="flex-1 flex items-center bg-gray-100 shadow-md rounded-[32px] py-2 px-4">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>

          {}
          <div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
            <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 text-blue-600 mr-4">
              <FaLock size={20} className="md:w-7 md:h-7" />
            </div>
            <div className="flex-1 flex items-center bg-gray-100 shadow-md rounded-[32px] py-2 px-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 outline-none text-gray-700 bg-transparent"
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

          {}
          <div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
            <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 text-blue-600 mr-4">
              <FaLock size={20} className="md:w-7 md:h-7" />
            </div>
            <div
              className={`flex-1 flex items-center shadow-md rounded-[32px] py-2 px-4 border-2
                ${confirmPassword === "" ? "border-gray-300" : isConfirmValid ? "border-green-500" : "border-red-500"}
              `}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 outline-none text-gray-700 bg-transparent"
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

          <div className="flex justify-center mb-6">
            <button className="text-white py-2 px-10 rounded-[32px] font-semibold shadow-md hover:shadow-lg transition bg-[#2563eb] active:bg-[#10b981]">
              Sign Up
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
}
