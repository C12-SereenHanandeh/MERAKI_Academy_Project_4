import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form submission
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        username,
        email,
        password,
        role,
      });
      setMessage(result.data.message);
      setMessageType("success"); // success message
      // You can navigate to a different page after successful registration if needed
      // navigate("/login");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage("No response from server. Please try again.");
      } else {
        setMessage("Error: " + error.message);
      }
      setMessageType("error"); // error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
      {/* Display message if any */}
      {message && (
        <p style={{ color: messageType === "error" ? "red" : "green" }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default Register;
