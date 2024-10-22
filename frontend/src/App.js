import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard"; 
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AddDepartment from "./pages/AddDepartment"
import DeleteDoctor from "./pages/DeleteDoctor"
import DeletePatient from "./pages/DeletePatient"


const App = () => {
  return (
    <UserProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="Admin" allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute role="Doctor" allowedRoles={["Doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute role="Patient" allowedRoles={["Patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />

         
          <Route
            path="/admin/add-department"
            element={
              <ProtectedRoute role="Admin" allowedRoles={["Admin"]}>
                <AddDepartment /> 
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/delete-doctor"
            element={
              <ProtectedRoute role="Admin" allowedRoles={["Admin"]}>
                <DeleteDoctor /> 
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/delete-patient"
            element={
              <ProtectedRoute role="Admin" allowedRoles={["Admin"]}>
                <DeletePatient /> {/* قم بإنشاء مكون جديد لهذا */}
              </ProtectedRoute>
            }
          />
        </Routes>
    
      </Router>
    
    </UserProvider>
    
  );
};

export default App;
