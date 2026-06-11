import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl text-white"
          style={{
            backgroundColor: "var(--rak-primary)",
          }}
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-gray-600">
          {user?.name}
        </p>

        <p className="text-gray-500 mt-2">
          {user?.email}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;