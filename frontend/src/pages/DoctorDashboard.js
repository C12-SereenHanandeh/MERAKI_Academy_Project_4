import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useContext, useUserContext } from "../context/UserContext";

const DoctorDashboard = () => {
  const { user } = useUserContext();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`https://localhost:5000/appointment/doctor/${user.id}`).then((response) => {
        setAppointments(response.data);
      });
    }
  }, [user]);

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <h3>Your Appointment</h3>

      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <p>Patient:{appointment.patient.username}</p>
            <p>Date:{appointment.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
