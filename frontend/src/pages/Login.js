import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import "../assests/login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserRole } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(res);

      const userData = res.data;
      setUserRole(userData.role);

      if (userData.role === "Patient") {
        navigate("/patient-dashboard");
      } else if (userData.role === "Doctor") {
        navigate("/doctor-dashboard");
      } else if (userData.role === "Admin") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <Navbar/>
      <div className="login-form">
        <h2 className="text-center">Sign in to Hospital</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn">
            Sign in
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <div className="text-center mt-3">
          <p>
            New here? <a href="/register">Create an account</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
