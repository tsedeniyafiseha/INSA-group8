import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isConfirmValid = confirmPassword === password && confirmPassword !== "";

  const handleSignup = async () => {
    if (!fullName || !emailOrUsername || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (!isConfirmValid) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: emailOrUsername, 
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); 
        navigate("/"); 
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gradient-to-r from-[#c0ceeb] to-[#87d0b8] flex items-center justify-center overflow-hidden p-4 sm:p-0">
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden md:h-[500px] bg-white">
        
        
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

        
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Create Account
          </h2>

          
          {/* Full Name */}
<div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
  <div className="flex items-center justify-center w-12 h-12 text-blue-600 mr-4 flex-shrink-0">
    <FaUser size={20} />
  </div>
  <div className="flex-1 relative">
    <input
      type="text"
      placeholder="Username"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700"
    />
  </div>
</div>

{/* Email */}
<div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
  <div className="flex items-center justify-center w-12 h-12 text-blue-600 mr-4 flex-shrink-0">
    <FaEnvelope size={20} />
  </div>
  <div className="flex-1 relative">
    <input
      type="text"
      placeholder="Email"
      value={emailOrUsername}
      onChange={(e) => setEmailOrUsername(e.target.value)}
      className="w-full py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700"
    />
  </div>
</div>

{/* Password */}
<div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto relative">
  <div className="flex items-center justify-center w-12 h-12 text-blue-600 flex-shrink-0 mr-4">
    <FaLock size={20} />
  </div>
  <div className="flex-1 relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
    >
      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
    </button>
  </div>
</div>

{/* Confirm Password */}
<div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto relative">
  <div className="flex items-center justify-center w-12 h-12 text-blue-600 flex-shrink-0 mr-4">
    <FaLock size={20} />
  </div>
  <div className="flex-1 relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className={`w-full py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700 border-2 ${
        confirmPassword === ""
          ? "border-gray-300"
          : isConfirmValid
          ? "border-green-500"
          : "border-red-500"
      }`}
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
    >
      {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
    </button>
  </div>
</div>


          {/* Signup Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSignup}
              disabled={loading}
              className="text-white py-2 px-10 rounded-[32px] font-semibold shadow-md hover:shadow-lg transition bg-[#2563eb] active:bg-[#10b981] disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
