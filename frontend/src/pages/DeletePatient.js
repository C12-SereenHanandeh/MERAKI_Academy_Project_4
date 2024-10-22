// src/pages/DeletePatient.js
import React, { useEffect, useState } from "react";
import axios from "../services/api";

const DeletePatient = () => {
  const [patients, setPatients] = useState([]);

  // Fetch the list of patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/admin/patients");
        setPatients(response.data); // Assuming response.data is an array of patients
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Handle delete patient
  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`/admin/delete-patient/${patientId}`);
      alert("Patient deleted successfully!");
      // Remove deleted patient from the local state
      setPatients(patients.filter((patient) => patient.id !== patientId));
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  return (
    <div>
      <h1>Delete Patient</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} {/* Assuming patient has a 'name' property */}
            <button onClick={() => handleDelete(patient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePatient;
