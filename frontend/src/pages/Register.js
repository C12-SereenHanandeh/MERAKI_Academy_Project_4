import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assests/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [adminPermissions, setAdminPermissions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const userData = {
      username,
      email,
      password,
      role,
      ...(role === "Doctor" && {
        specialization,
        experienceYears,
        licenseNumber,
      }),
      ...(role === "Patient" && {
        medicalHistory: [medicalHistory],
        insuranceNumber,
      }),
      ...(role === "Admin" && { adminPermissions }),
    };

    try {
      await axios.post("http://localhost:5000/users/register", userData);
      alert("Registration completed successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>username: </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Role: </label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {role === "Doctor" && (
          <>
            <div className="form-group">
              <label>Specialization: </label>
              <input
                type="text"
                className="form-control"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Experience Years: </label>
              <input
                type="number"
                className="form-control"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>License Number:</label>
              <input
                type="text"
                className="form-control"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {role === "Patient" && (
          <>
            <div className="form-group">
              <label>Medical History: </label>
              <input
                type="text"
                className="form-control"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Insurance Number: </label>
              <input
                type="text"
                className="form-control"
                value={insuranceNumber}
                onChange={(e) => setInsuranceNumber(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {role === "Admin" && (
          <div className="form-group">
            <label>Admin Permissions: </label>
            <input
              type="text"
              className="form-control"
              value={adminPermissions}
              onChange={(e) => setAdminPermissions(e.target.value.split(","))}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
