// src/pages/AddDepartment.js
import React, { useState } from "react";
import axios from "../services/api";

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:5000/admin/add-department", {
        name: departmentName,
      });
      alert(response.data.message); // إظهار رسالة الاستجابة من الخادم
      setDepartmentName(""); // إعادة تعيين الحقل بعد الإضافة الناجحة
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department.");
    }
  };

  return (
    <div>
      <h1>Add Department</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="departmentName">Department Name:</label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
};

export default AddDepartment;
