import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login"); // redirect if not logged in
      return;
    }
    setUser(userData);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/70 backdrop-blur-md p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">EventMgmt Dashboard</h1>
        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <main className="p-8 space-y-8">
        <h2 className="text-3xl font-semibold">
          Welcome, {user.firstName} {user.lastName}!
        </h2>
        <p className="text-white/70">Role: {user.role}</p>

        {user.role === "attendee" && (
          <section>
            <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
            {/* Placeholder cards for events */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:scale-105 transition">
                <h4 className="font-semibold text-xl">Tech Meetup</h4>
                <p className="text-white/70">Date: 25 Oct 2025</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:scale-105 transition">
                <h4 className="font-semibold text-xl">Workshop</h4>
                <p className="text-white/70">Date: 12 Nov 2025</p>
              </div>
            </div>
          </section>
        )}

        {user.role === "organizer" && (
          <section>
            <h3 className="text-2xl font-bold mb-4">Your Events</h3>
            {/* Placeholder cards for organizer events */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:scale-105 transition">
                <h4 className="font-semibold text-xl">Annual Meetup 2025</h4>
                <p className="text-white/70">Registered: 120</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
