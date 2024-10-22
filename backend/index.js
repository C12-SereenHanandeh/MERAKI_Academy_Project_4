require("dotenv").config();


const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());


// import database connection
require("./models/db");

// import users Router
const usersRouter = require("./routes/users");

// import appointment Router
const appointmentRouter = require("./routes/appointment");

// import perscription Router
const perscriptionRouter = require("./routes/prescription");

// import service Router
const serviceRouter = require("./routes/service");

// import INVOICE Router
const invoiceRouter = require("./routes/invoice");

// import notification Router
const notificationRouter = require("./routes/notification");

// import doctor Router
const doctorRouter = require("./routes/doctor");

// import patient Router
const patientRouter = require("./routes/patient");

// import admin Router
const adminRouter = require("./routes/admin");

// import department Router
const departmentRouter = require("./routes/department");

const reviewRouter = require("./routes/review");

app.use(express.json());

// users Router
app.use("/users", usersRouter);

// appointment Router
app.use("/appointment", appointmentRouter);

// perscription Router
app.use("/perscription", perscriptionRouter);

// service Router
app.use("/service", serviceRouter);

// invoice Router
app.use("/invoice", invoiceRouter);

// department Router
app.use("/department", departmentRouter);

// notification Router
app.use("/notification", notificationRouter);

// doctor Router
app.use("/doctor", doctorRouter);

// patient Router
app.use("/patient", patientRouter);

// doctor Router
app.use("/admin", adminRouter);

app.use("/review", reviewRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
