import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword({ emailFromLink }) {
  const [step, setStep] = useState(emailFromLink ? "reset" : "forgot");
  const [email, setEmail] = useState(emailFromLink || "");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  const handleSendReset = async () => {
    if (!email) return alert("Please enter your email");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Reset link sent to your email!");
        setStep("reset");
      } else {
        alert(data.error || "Failed to send reset link");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

 
  const handleResetPassword = async () => {
    if (!newPassword) return alert("Please enter a new password");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }), 
       
      });

      const data = await res.json();
      if (res.ok) {
        alert("Password reset successful! Please sign in.");
        navigate("/signin");
      } else {
        alert(data.error || "Password reset failed");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-50 to-green-100 px-6 py-12">
      {step === "forgot" && (
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forgot Password
          </h2>

          <div className="flex items-center mb-6 bg-gray-100 rounded-full shadow-inner px-4 py-2">
            <FaEnvelope className="text-blue-600 mr-3" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-100 outline-none"
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            onClick={handleSendReset}
            disabled={!email || loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      )}

      {step === "reset" && (
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Your Password
          </h2>

          <div className="flex items-center mb-6 bg-gray-100 rounded-full shadow-inner px-4 py-2">
            <FaLock className="text-blue-600 mr-3" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="flex-1 bg-gray-100 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-600 ml-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-full font-semibold hover:bg-green-700 transition"
            disabled={!newPassword || loading}
            onClick={handleResetPassword}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
}
