import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setToken, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefult();

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      const { token } = response.data;
      setToken(token); // Save token in App component state
      setIsLoggedIn(true); // Set user logged in state
      navigate("/Home"); // Redirect to home
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        reqired
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        reqired
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
