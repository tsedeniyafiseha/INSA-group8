import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {
    if (!email) return alert("Please enter your email");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error("Forgot password error:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gradient-to-r from-[#c0ceeb] to-[#87d0b8] flex items-center justify-center overflow-hidden p-4 sm:p-0">
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden md:h-[500px] h-auto">
       
        <div className="hidden md:flex md:w-2/5 bg-blue-600 p-8 flex-col items-center justify-center text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Forgot Password?</h2>
          <p className="italic tracking-wide text-md md:text-lg max-w-xs mb-4 md:mb-8">
            Enter your email below and we’ll send instructions to reset your password.
          </p>
          <button
            className="px-8 py-2 rounded-[32px] border border-white text-white hover:bg-white hover:text-blue-600 transition"
            onClick={onBack}
          >
            Back to Sign In
          </button>
        </div>

        
        <div className="w-full md:w-3/5 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Reset Your Password
          </h2>

          <div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
            <div className="flex items-center justify-center w-12 h-12 text-blue-600 mr-4">
              <FaEnvelope size={28} />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700"
            />
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleForgot}
              disabled={loading}
              className={`text-white py-2 px-10 rounded-[32px] font-semibold shadow-md transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2563eb] hover:shadow-lg active:bg-[#10b981]"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Signin() {
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!emailOrUsername || !password) return alert("Please fill all fields");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/"); 
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Signin error:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (showForgot) return <ForgotPassword onBack={() => setShowForgot(false)} />;

  return (
    <div className="relative w-screen h-screen bg-gradient-to-r from-[#c0ceeb] to-[#87d0b8] flex items-center justify-center overflow-hidden p-4 sm:p-0">
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden md:h-[500px] h-auto">
        
        <div className="hidden md:flex md:w-2/5 bg-blue-600 p-8 flex-col items-center justify-center text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome back!</h2>
          <p className="italic tracking-wide text-md md:text-lg max-w-xs mb-4 md:mb-8">
            Don’t have an account? Click below to create one and join us.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-2 rounded-[32px] border border-white text-white hover:bg-white hover:text-blue-600 transition"
          >
            Sign Up
          </button>
        </div>

      
        <div className="w-full md:w-3/5 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Sign In
          </h2>

<div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto">
  <div className="flex items-center justify-center w-12 h-12 text-blue-600 flex-shrink-0">
    <FaEnvelope size={28} />
  </div>
  <input
    type="text"
    placeholder="Email or Username"
    value={emailOrUsername}
    onChange={(e) => setEmailOrUsername(e.target.value)}
    className="flex-1 py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700 w-full"
  />
</div>

<div className="mb-6 flex items-center w-full sm:w-3/4 mx-auto relative">
  <div className="flex items-center justify-center w-12 h-12 text-blue-600 flex-shrink-0">
    <FaLock size={28} />
  </div>
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="flex-1 py-2 px-4 bg-gray-100 shadow-md rounded-[32px] outline-none text-gray-700 w-full"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 text-blue-600"
  >
    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
  </button>
</div>

         
          <div className="w-full sm:w-3/4 mx-auto text-right mb-6">
            <button
              onClick={() => setShowForgot(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSignin}
              disabled={loading}
              className={`text-white py-2 px-10 rounded-[32px] font-semibold shadow-md transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2563eb] hover:shadow-lg active:bg-[#10b981]"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          
       
        </div>
      </div>
    </div>
  );
}
