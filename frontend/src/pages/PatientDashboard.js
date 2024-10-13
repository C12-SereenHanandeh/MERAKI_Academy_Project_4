import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bookAppointments, setBookAppointments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState(null);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const patientId = "Patient_Id"; // Update this with the actual patient ID

  // Load departments
  useEffect(() => {
    axios.get("/department").then((response) => {
      setDepartments(response.data);
    });

    // Load patient booked appointments
    axios.get(`/appointment/patient/${patientId}`).then((response) => {
      setBookAppointments(response.data);
    });
  }, []);

  // Load doctors when department is selected
  useEffect(() => {
    if (selectDepartment) {
      axios.get(`/doctors/${selectDepartment}`).then((response) => {
        setDoctors(response.data);
      });
    }
  }, [selectDepartment]);

  // Load available appointments when doctor changes
  useEffect(() => {
    if (selectDoctor) {
      axios.get(`/appointments/${selectDoctor}`).then((response) => {
        setAppointments(response.data);
      });
    }
  }, [selectDoctor]);

  // Function to book an appointment
  const bookAppointment = (appointmentId) => {
    axios
      .post(`/appointment/book/${appointmentId}`, { patientId: patientId })
      .then(() => {
        alert("Appointment booked successfully!");

        axios.get(`/appointment/patient/${patientId}`).then((response) => {
          setBookAppointments(response.data);
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="dashboard">
      <h1>Patient Dashboard</h1>
      <div className="dashboard-content">
        <h2>Welcome, Patient!</h2>
        <h3>Book a New Appointment</h3>

        {/* Department selection */}
        <select onChange={(e) => setSelectDepartment(e.target.value)}>
          <option>Choose Department</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.name}
            </option>
          ))}
        </select>

        {/* Doctor selection */}
        <select onChange={(e) => setSelectDoctor(e.target.value)}>
          <option>Choose Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name}
            </option>
          ))}
        </select>

        {/* Appointment selection */}
        {selectDoctor && (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id}>
                Date: {appointment.date}
                <button onClick={() => bookAppointment(appointment._id)}>
                  Book
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3>Booked Appointments</h3>
      <ul>
        {bookAppointments.map((appointment) => (
          <li key={appointment._id}>
            Department: {appointment.doctor.department.name} | Doctor:{" "}
            {appointment.doctor.name} | Date: {appointment.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
