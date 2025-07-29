import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your API call
    localStorage.setItem("access", "mock_token");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="p-4 rounded" style={{ backgroundColor: "#F8E8EE" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={credentials.email}
              onChange={handleChange}
              required
              style={{ backgroundColor: "#F9F5F6" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={credentials.password}
              onChange={handleChange}
              required
              style={{ backgroundColor: "#F9F5F6" }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#FDCEDF",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
