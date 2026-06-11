import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      <p>
        Welcome, {user?.name}
      </p>
    </div>
  );
}

export default Dashboard;