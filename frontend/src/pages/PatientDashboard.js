import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import "../assests/PatientDashboard.css";

const PatientDashboard = () => {
  const [departments] = useState([
    { _id: "1", name: "Cardiology" },
    { _id: "2", name: "Dermatology" },
    { _id: "3", name: "Pediatrics" },
    { _id: "4", name: "Neurology" },
    { _id: "5", name: "Orthopedics" },
  ]);

  const [doctors] = useState([
    { _id: "1", name: "Dr. Smith", departmentId: "1" },
    { _id: "2", name: "Dr. Johnson", departmentId: "2" },
    { _id: "3", name: "Dr. Brown", departmentId: "3" },
    { _id: "4", name: "Dr. Wilson", departmentId: "4" },
    { _id: "5", name: "Dr. Davis", departmentId: "5" },
    { _id: "6", name: "Dr. Taylor", departmentId: "1" },
    { _id: "7", name: "Dr. Martinez", departmentId: "3" },
  ]);

  const [appointments] = useState([
    { _id: "1", doctorId: "1", date: "2024-10-25 10:00 AM", price: 50, paid: false },
    { _id: "2", doctorId: "1", date: "2024-10-26 11:00 AM", price: 60, paid: false },
    { _id: "3", doctorId: "2", date: "2024-10-27 01:00 PM", price: 70, paid: false },
    { _id: "4", doctorId: "3", date: "2024-10-28 02:00 PM", price: 80, paid: false },
    { _id: "5", doctorId: "4", date: "2024-10-29 09:00 AM", price: 90, paid: false },
    { _id: "6", doctorId: "5", date: "2024-10-30 03:00 PM", price: 100, paid: false },
    { _id: "7", doctorId: "6", date: "2024-11-01 11:00 AM", price: 55, paid: false },
    { _id: "8", doctorId: "7", date: "2024-11-02 12:00 PM", price: 75, paid: false },
  ]);

  const [bookAppointments, setBookAppointments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState("");

  const navigate = useNavigate();

  const handleDepartmentChange = (e) => {
    const options = e.target.options;
    let selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedDepartments(selected);
  };

  const handleDoctorChange = (e) => {
    const options = e.target.options;
    let selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedDoctors(selected);
  };

  const bookAppointment = (appointmentId) => {
    const appointmentToBook = appointments.find((app) => app._id === appointmentId);
    if (appointmentToBook) {
      const bookedAppointment = {
        _id: appointmentToBook._id,
        doctor: doctors.find((doc) => doc._id === appointmentToBook.doctorId),
        date: appointmentToBook.date,
        price: appointmentToBook.price,
        paid: appointmentToBook.paid,
      };
      setBookAppointments([...bookAppointments, bookedAppointment]);
      alert("Appointment booked successfully!");
    }
  };

  const handlePayment = (appointmentId) => {
    setBookAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, paid: true }
          : appointment
      )
    );
    alert("Payment processed successfully!");
  };

  const handleLogout = () => {
    // Clear authentication details (like tokens or session data)
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Patient Dashboard</h1>
      <div className="dashboard-content">
        <h2>Welcome, Patient!</h2>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-button">Logout</button>

        <h3>Book a New Appointment</h3>

        {/* Multi-select for Departments */}
        <select multiple onChange={handleDepartmentChange}>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.name}
            </option>
          ))}
        </select>

        {/* Multi-select for Doctors */}
        <select multiple onChange={handleDoctorChange}>
          {doctors
            .filter((doc) => selectedDepartments.includes(doc.departmentId))
            .map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
        </select>

        {/* Appointments List */}
        {selectedDoctors.length > 0 && (
          <ul>
            {appointments
              .filter((appointment) => selectedDoctors.includes(appointment.doctorId))
              .map((appointment) => (
                <li key={appointment._id}>
                  Date: {appointment.date} - Doctor: {doctors.find((doc) => doc._id === appointment.doctorId).name} - Price: ${appointment.price}
                  <button onClick={() => bookAppointment(appointment._id)}>Book</button>
                </li>
              ))}
          </ul>
        )}

        {/* Payment Section */}
        <div className="payment-section">
          <h3>Manual Payment</h3>
          {bookAppointments.filter((app) => !app.paid).map((appointment) => (
            <div key={appointment._id}>
              <p>Appointment with {appointment.doctor.name} on {appointment.date}</p>
              <p>Amount Due: ${appointment.price}</p>
              <button onClick={() => handlePayment(appointment._id)}>Pay Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Booked Appointments */}
      <h3 className="booked-appointments">Booked Appointments</h3>
      <ul>
        {bookAppointments.map((appointment) => (
          <li key={appointment._id}>
            Department: {appointment.doctor.departmentId} | Doctor: {appointment.doctor.name} | Date: {appointment.date} | Price: ${appointment.price} | Paid: {appointment.paid ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
