import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b bg-white">
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">
          Rakshika
        </span>
      </div>

      <div className="hidden md:flex gap-8">
        <Link to="/" className="hover:text-gray-600">
          Home
        </Link>

        <Link to="/resources" className="hover:text-gray-600">
          Resources
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link
          to="/login"
          className="hover:text-gray-600"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;