import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav
      className="flex justify-between items-center px-8 py-4 border-b sticky top-0 z-50"
      style={{
        backgroundColor: "var(--rak-ivory)",
        borderColor: "#e5e5e5",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="font-bold text-2xl"
          style={{ color: "var(--rak-primary)" }}
        >
          Rakshika
        </span>
      </div>

      <div className="hidden md:flex gap-8 items-center">
        <Link
          to="/"
          className="font-medium hover:opacity-70 transition"
          style={{ color: "var(--rak-charcoal)" }}
        >
          Home
        </Link>

        <Link
          to="/resources"
          className="font-medium hover:opacity-70 transition"
          style={{ color: "var(--rak-charcoal)" }}
        >
          Resources
        </Link>

        {user && (
          <>
            <Link
              to="/dashboard"
              className="font-medium hover:opacity-70 transition"
              style={{ color: "var(--rak-charcoal)" }}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="font-medium hover:opacity-70 transition"
              style={{ color: "var(--rak-charcoal)" }}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="font-medium hover:opacity-70 transition"
              style={{ color: "var(--rak-charcoal)" }}
            >
              Settings
            </Link>
          </>
        )}
      </div>

      <div className="flex gap-4 items-center">
        {user && (
          <span
            className="font-medium"
            style={{
              color: "var(--rak-charcoal)",
            }}
          >
            {user.name}
          </span>
        )}
        {user ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl text-white font-medium"
            style={{
              backgroundColor: "var(--rak-primary)",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="font-medium hover:opacity-70 transition"
              style={{ color: "var(--rak-charcoal)" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-xl text-white font-medium transition hover:opacity-90"
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
