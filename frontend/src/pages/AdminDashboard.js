// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Chart } from "react-google-charts";

// const AdminDashboard = () => {
//   const [departments, setDepartments] = useState([]);
//   const [patients, setPatient] = useState([]);
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     axios.get("/departments").then((response) => {
//       setDepartments(response.data);
//     });
//     axios.get("/users?role=Patient").then((response) => {
//       setPatient(response.data);
//     });
//     axios.get("/users?role=Doctor").then((response) => {
//       setDepartments(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <div>
//         <h3>Statistics</h3>
//         <Chart
//           chartType="PieChart"
//           data={[
//             ["Role", "Count"],
//             ["Patients", "patients.length"],
//             ["Doctors", "doctors.length"],
//             ["Departments", "departments.length"],
//           ]}
//           option={{ title: "System Users" }}
//           width={"500px"}
//           heigth={"250px"}
//         />
//       </div>
//       <h3>Manage Users</h3>
//     </div>
//   );
// };

// export default AdminDashboard;
