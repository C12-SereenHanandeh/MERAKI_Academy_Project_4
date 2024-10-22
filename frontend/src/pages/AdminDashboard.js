import React, { useEffect, useState } from "react";
import "../assests/adminDashboard.css"; 
import { Pie } from "react-chartjs-2";
import axios from "../services/api"; 
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  ...registerables
);

const AdminDashboard = () => {
  const [patientsData, setPatientsData] = useState({});
  const [doctorsData, setDoctorsData] = useState({});
  const [departmentData, setDepartmentData] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newDepartmentDescription, setNewDepartmentDescription] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [patientData, setPatientData] = useState([]);

  // State for adding new doctor
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorSpecialization, setNewDoctorSpecialization] = useState("");
  const [newDoctorExperience, setNewDoctorExperience] = useState("");
  const [newDoctorDepartmentId, setNewDoctorDepartmentId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsResponse, doctorsResponse, departmentResponse, doctorsListResponse, patientsListResponse] = await Promise.all([
          axios.get("/admin/patient-statistics"),
          axios.get("/admin/doctor-statistics"),
          axios.get("/admin/departments"),
          axios.get("/admin/doctors"),
          axios.get("/admin/patients"),
        ]);

        setPatientsData(patientsResponse.data);
        setDoctorsData(doctorsResponse.data);
        setDepartmentData(departmentResponse.data);
        setDoctorData(doctorsListResponse.data);
        setPatientData(patientsListResponse.data);
      } catch (error) {
        console.error("Error fetching statistics data:", error);
        alert("Error fetching data, please check the console for details.");
      }
    };

    fetchData();
  }, []);
  
  // Add new department
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/departments", {
        name: newDepartment,
        description: newDepartmentDescription,
      });
      setNewDepartment("");
      setNewDepartmentDescription(""); 
      const response = await axios.get("/admin/departments");
      setDepartmentData(response.data);
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Error adding department, please try again.");
    }
  };
  
  // Delete a department
  const handleDeleteDepartment = async (departmentId) => {
    try {
      await axios.delete(`/admin/departments/${departmentId}`);
      setDepartmentData((prevDepartments) =>
        prevDepartments.filter((department) => department.departmentId !== departmentId)
      );
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Error deleting department, please try again.");
    }
  };

  // Add new doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/doctors", {
        name: newDoctorName,
        specialization: newDoctorSpecialization,
        experienceYears: newDoctorExperience,
        departmentId: newDoctorDepartmentId,
      });
      // Reset form fields
      setNewDoctorName("");
      setNewDoctorSpecialization("");
      setNewDoctorExperience("");
      setNewDoctorDepartmentId("");
      // Fetch updated list of doctors
      const response = await axios.get("/admin/doctors");
      setDoctorData(response.data);
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Error adding doctor, please try again.");
    }
  };

  // Pie chart data for departments
  const pieData = {
    labels: departmentData.map(dep => dep.name),
    datasets: [
      {
        label: "Number of Patients per Department",
        data: departmentData.map(dep => dep.patientCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="my-4">Admin Dashboard</h1>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Number of Patients per Department</h5>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>

      {/* Add New Department */}
      <h2 className="my-4">Add New Department</h2>
      <form onSubmit={handleAddDepartment} className="mb-4">
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Department Name"
            required
          />
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={newDepartmentDescription}
            onChange={(e) => setNewDepartmentDescription(e.target.value)}
            placeholder="Department Description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Department
        </button>
      </form>

      {/* Add New Doctor */}
      <h2 className="my-4">Add New Doctor</h2>
      <form onSubmit={handleAddDoctor} className="mb-4">
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={newDoctorName}
            onChange={(e) => setNewDoctorName(e.target.value)}
            placeholder="Doctor Name"
            required
          />
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={newDoctorSpecialization}
            onChange={(e) => setNewDoctorSpecialization(e.target.value)}
            placeholder="Doctor Specialization"
            required
          />
        </div>
        <div className="input-group mb-2">
          <input
            type="number"
            className="form-control"
            value={newDoctorExperience}
            onChange={(e) => setNewDoctorExperience(e.target.value)}
            placeholder="Years of Experience"
            required
          />
        </div>
        <div className="input-group mb-2">
          <select
            className="form-control"
            value={newDoctorDepartmentId}
            onChange={(e) => setNewDoctorDepartmentId(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departmentData.map((department) => (
              <option key={department.departmentId} value={department.departmentId}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Doctor
        </button>
      </form>

      {/* Departments List */}
      <h2 className="my-4">Departments List</h2>
      <ul className="list-group mb-4">
        {departmentData.map((department) => (
          <li
            key={department.departmentId}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {department.name}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteDepartment(department.departmentId)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Patients</h5>
              <p>{patientsData.total || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Doctors</h5>
              <p>{doctorsData.total || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
