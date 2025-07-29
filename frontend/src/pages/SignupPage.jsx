import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Replace with your API call
    localStorage.setItem("access", "mock_token");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="p-4 rounded" style={{ backgroundColor: "#F8E8EE" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="name"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
              style={{ backgroundColor: "#F9F5F6" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              style={{ backgroundColor: "#F9F5F6" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
              style={{ backgroundColor: "#F9F5F6" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
