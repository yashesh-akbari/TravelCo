import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // simple static login for now
  const handleLogin = (e) => {
    e.preventDefault();

    // hardcoded admin
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLogged", "yes");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-20">
      <h1 className="text-2xl font-bold text-orange-600 text-center">Admin Login</h1>

      <form onSubmit={handleLogin} className="border p-6 rounded-xl bg-white shadow-sm space-y-4">
        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            className="w-full border rounded-lg p-2 mt-1 text-sm"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            className="w-full border rounded-lg p-2 mt-1 text-sm"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
          />
        </div>

        <button className="bg-orange-600 text-white w-full py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
          Login
        </button>
      </form>
    </div>
  );
}
