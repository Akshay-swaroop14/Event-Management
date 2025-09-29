import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/50 text-white text-center py-4 text-sm">
      © {new Date().getFullYear()} EventMgmt | All Rights Reserved |
      <Link to="/privacy" className="underline hover:text-gray-300 ml-2">
        Privacy Policy
      </Link>
    </footer>
  );
}
