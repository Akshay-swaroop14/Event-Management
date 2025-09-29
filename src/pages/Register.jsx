import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgEvent from "../assets/bg-event.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "attendee",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    setLoading(true);
    setServerError("");

    try {
      let response;
      if (avatarFile) {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        fd.append("avatar", avatarFile);
        console.log(fd)
        response = await fetch("https://event-management-1-v5pw.onrender.com/api/auth/register", { method: "POST", body: fd });
      } else {
        response = await fetch("https://event-management-1-v5pw.onrender.com/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const data = await response.json();

      if (!response.ok) return setServerError(data.message || "Registration failed");

      alert("User created successfully! Please login.");
      navigate("/login");
    } catch {
      setServerError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgEvent})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-8 animate-slideFadeIn">
        <h2 className="text-2xl font-semibold text-white text-center">Register for EventMgmt</h2>

        {serverError && <div className="bg-red-600/30 text-red-100 p-2 rounded text-center">{serverError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-100/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-100/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition appearance-none"
            >
              <option value="attendee" className="bg-gray-400/50 text-white hover:bg-black">Attendee</option>
              <option value="organizer" className="bg-gray-400/50 text-white hover:bg-black">Organizer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Avatar (optional)</label>
            <input type="file" accept="image/*" onChange={handleAvatar} className="text-sm text-white" />
            {avatarPreview && <img src={avatarPreview} alt="preview" className="w-16 h-16 rounded mt-2 object-cover border" />}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400/50 cursor-not-allowed" : "bg-gray-900 hover:bg-black"
            } transition-transform duration-200`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-white/70 text-sm mt-4">
          Already have an account? <Link to="/login" className="underline hover:text-white">Login</Link>
        </p>
      </div>

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
