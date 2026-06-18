import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    login(
      response.data.user,
      response.data.token
    );

    navigate("/");
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Login failed"
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue using Rakshika.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="w-full text-white py-3 rounded-xl font-medium"
            style={{
              backgroundColor: "var(--rak-primary)",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
