import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/rakshika-logo.svg";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="flex justify-between items-center px-6 md:px-12 py-4 sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      style={{
        backgroundColor:
          "rgba(248, 246, 244, 0.85)" /* --rak-background with opacity */,
        borderColor: "rgba(31, 31, 31, 0.08)",
      }}
    >
      {/* Brand Section */}
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src={logo}
          alt="Rakshika Logo"
          className="w-16 h-16 object-contain"
        />
        <div className="flex flex-col">
          <span
            className="font-bold text-3xl tracking-tight leading-none"
            style={{ color: "var(--rak-primary)" }}
          >
            Rakshika
          </span>
          <span
            className="text-xs font-bold uppercase tracking-[0.15em] mt-1 opacity-80"
            style={{ color: "var(--rak-secondary)" }}
          >
            Your Safety Companion
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 items-center">
        <Link
          to="/"
          className="font-semibold text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
          style={{ color: "var(--rak-text)" }}
        >
          Home
        </Link>

        <Link
          to="/resources"
          className="font-semibold text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
          style={{ color: "var(--rak-text)" }}
        >
          Resources
        </Link>

        {user && (
          <>
            <Link
              to="/dashboard"
              className="font-semibold text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
              style={{ color: "var(--rak-text)" }}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="font-semibold text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
              style={{ color: "var(--rak-text)" }}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="font-semibold text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
              style={{ color: "var(--rak-text)" }}
            >
              Settings
            </Link>
          </>
        )}
      </div>

      {/* User Actions */}
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <span
              className="hidden md:inline-block font-semibold text-sm tracking-wide"
              style={{
                color: "var(--rak-text)",
              }}
            >
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 rounded-full text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: "var(--rak-primary)",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="font-semibold text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
              style={{ color: "var(--rak-text)" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-2.5 rounded-full text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: "var(--rak-primary)",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
