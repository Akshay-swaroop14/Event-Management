import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import bgEvent from "../assets/bg-event.jpg";
import Footer from "../components/Footer";
import Event1 from "../assets/Event-1.jpg";
import Event2 from "../assets/Event-2.jpg";
import Event3 from "../assets/Event-3.jpg";  

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-16 py-4 bg-black/70 backdrop-blur-md fixed top-0 z-30">
        <div className="text-2xl font-bold">Event Management</div>

        {/* Middle nav links using react-scroll */}
        <div className="flex space-x-8">
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="hover:text-gray-300 cursor-pointer"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="plans"
            smooth={true}
            duration={500}
            className="hover:text-gray-300 cursor-pointer"
          >
            Plans
          </ScrollLink>
          <ScrollLink
            to="events"
            smooth={true}
            duration={500}
            className="hover:text-gray-300 cursor-pointer"
          >
            Previous Events
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="hover:text-gray-300 cursor-pointer"
          >
            Contact
          </ScrollLink>
        </div>

        {/* Right login button */}
        <Link
          to="/login"
          className="px-5 py-2 bg-black/70 hover:bg-black rounded-lg font-semibold transition"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <header
        className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center mt-16"
        style={{ backgroundImage: `url(${bgEvent})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-3xl px-6 space-y-6">
          <h1 className="text-5xl font-bold animate-slideFadeIn">
            Welcome to EventMgmt
          </h1>
          <p className="text-lg text-white/80 animate-slideFadeIn">
            Plan, organize, and showcase your events effortlessly with our
            all-in-one platform.
          </p>
           <Link
      to="/login"
      className="inline-block mt-6 px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
    >
      Get Started
    </Link>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-16 bg-gray-900/80">
        <h2 className="text-4xl font-bold mb-6 text-center">About Event Management</h2>
        <p className="max-w-3xl mx-auto text-center text-white/80 leading-relaxed">
          Event Management is a modern platform to manage events, registrations, and
          attendee engagement with ease. From planning to execution, we provide
          tools to make your events successful and memorable.
        </p>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-16 bg-gray-900/70">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Our Plans & Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-2">Event Planning</h3>
            <p>
              Plan events seamlessly with scheduling, invitations, and reminders.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-2">Attendee Management</h3>
            <p>Track registrations, ticketing, and engagement in real-time.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-2">Analytics & Reports</h3>
            <p>Get insights on event performance, attendance, and feedback.</p>
          </div>
        </div>
      </section>

      {/* Previous Events Section */}
      <section id="events" className="py-20 px-16 bg-gray-900/60">
        <h2 className="text-4xl font-bold mb-12 text-center">Previous Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:scale-105 transition">
            <img
              src={Event1}
              alt="Event 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Annual Meetup 2025</h3>
              <p className="text-white/70 text-sm">
                Successful engagement with 500+ attendees.
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:scale-105 transition">
            <img
              src={Event2}
              alt="Event 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Tech Conference</h3>
              <p className="text-white/70 text-sm">
                Showcasing innovations and networking opportunities.
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:scale-105 transition">
            <img
              src={Event3}
              alt="Event 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Workshop Series</h3>
              <p className="text-white/70 text-sm">
                Hands-on sessions with industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-16 bg-gray-900/80">
        <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
        <p className="text-center text-white/70">
          Reach out to us at <strong>info@eventmgmt.com</strong> for any queries.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
