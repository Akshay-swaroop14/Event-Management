import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Footer from "../components/Footer";
import bgEvent from "../assets/bg-event.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Simple validation
  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  // Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch(
        "https://event-management-1-v5pw.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Store token & user info
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
      }

      alert("Login successful");
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      setServerError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgEvent})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 justify-center items-center px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-8 animate-slideFadeIn">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Login
          </h2>

          {serverError && (
            <div className="bg-red-600 bg-opacity-30 text-red-100 p-2 rounded text-center mb-4">
              {serverError}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100/20 text-white placeholder-white/50 border border-white/20
                         focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100/20 text-white placeholder-white/50 border border-white/20
                         focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-white hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-gray-900 hover:bg-black"
              } text-white font-semibold transition-transform hover:scale-105`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Social Login */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-500" />
            <span className="text-gray-300 mx-3">or</span>
            <hr className="flex-grow border-gray-500" />
          </div>

          <div className="space-y-3">
            {/* Facebook */}
            <button className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-[#1877F2] hover:bg-[#145DB2] text-white font-semibold transition-transform hover:scale-105">
              <FaFacebookF className="text-lg" />
              Continue with Facebook
            </button>

            {/* Google */}
            <button className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-800 font-semibold border transition-transform hover:scale-105">
              <FaGoogle className="text-red-500 text-lg" />
              Continue with Google
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-white/70 text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="underline hover:text-white">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Animation */}
      <style>
        {`
          @keyframes slideFadeIn {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slideFadeIn {
            animation: slideFadeIn 0.8s forwards;
          }
        `}
      </style>
    </div>
  );
}
