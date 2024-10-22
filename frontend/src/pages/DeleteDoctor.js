// src/pages/DeleteDoctor.js
import React, { useEffect, useState } from "react";
import axios from "../services/api";

const DeleteDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch the list of doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/admin/doctors");
        setDoctors(response.data); 
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle delete doctor
  const handleDelete = async (doctorId) => {
    try {
      await axios.delete(`/admin/delete-doctor/${doctorId}`);
      alert("Doctor deleted successfully!");
      // Remove deleted doctor from the local state
      setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor.");
    }
  };

  return (
    <div>
      <h1>Delete Doctor</h1>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} {/* Assuming doctor has a 'name' property */}
            <button onClick={() => handleDelete(doctor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteDoctor;
