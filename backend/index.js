require("dotenv").config();
const express = require("express");
const app = express();


// import database connection
require("./models/db");

// import users Router
const usersRouter = require("./routes/users");

// import appointment Router
const appointmentRouter = require("./routes/appointment");
app.use(express.json());

// users Router
app.use("/users", usersRouter);

// appointment Router
app.use("/appointment", appointmentRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
