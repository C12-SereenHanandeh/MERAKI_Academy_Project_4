import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assests/login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      const { role } = response.data.user;

      if (role === "Patient") {
        navigate("/patient-dashboard");
      } else if (role === "Doctor") {
        navigate("/doctor-dashboard");
      } else if (role === "Admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
