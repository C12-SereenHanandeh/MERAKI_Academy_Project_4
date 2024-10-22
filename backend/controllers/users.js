const User = require("../models/userSchema");
const Department = require("../models/departmentSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register function
const register = (req, res) => {
  const {
    username,
    email,
    password,
    role,
    medicalHistory,
    insuranceNumber,
    specialization,
    experienceYears,
    licenseNumber,
    adminPermissions,
    image,
    department, // Adjusted the key name to 'department'
  } = req.body;
User.findOne({email}).then(
  async(found)=>{
  if(found){
    console.log("ok")
  }

  console.log("not found")

const  user = new User({
    username,
    email,
    password,
    role,
    medicalHistory: role === "Patient" ? medicalHistory : undefined,
    insuranceNumber: role === "Patient" ? insuranceNumber : undefined,
    specialization: role === "Doctor" ? specialization : undefined,
    experienceYears: role === "Doctor" ? experienceYears : undefined,
    licenseNumber: role === "Doctor" ? licenseNumber : undefined,
    adminPermissions: role === "Admin" ? adminPermissions : undefined,
    image:"",
    department: role === "Doctor" ? foundDepartment.name : undefined, // Assigning the found department name
  });
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);

// Save the user
const saved=await user.save();
if(saved){
  res.status(201).json({msg:"ok"})
}

}).catch((err)=>{
  if(err.keyPattern){
    res.send("email already exists")
  }
  console.log(err.status,err.message)
})
  // try {
  //   // Check if user already exists
  //   let user = await User.findOne({ email });
  //   if (user) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "User already exists" });
  //   }

  //   // Check if the department exists for Doctor role
  //   let foundDepartment = null;
  //   if (role === "Doctor") {
  //     foundDepartment = await Department.findOne({ name: department });
  //     if (!foundDepartment) {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "Invalid department specified" });
  //     }
  //   }

    // Create a new user instance
    // user = new User({
    //   username,
    //   email,
    //   password,
    //   role,
    //   medicalHistory: role === "Patient" ? medicalHistory : undefined,
    //   insuranceNumber: role === "Patient" ? insuranceNumber : undefined,
    //   specialization: role === "Doctor" ? specialization : undefined,
    //   experienceYears: role === "Doctor" ? experienceYears : undefined,
    //   licenseNumber: role === "Doctor" ? licenseNumber : undefined,
    //   adminPermissions: role === "Admin" ? adminPermissions : undefined,
    //   image,
    //   department: role === "Doctor" ? foundDepartment.name : undefined, // Assigning the found department name
    // });

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    // // Save the user
    // await user.save();

  //   // Create JWT payload and token
  //   const payload = { user: { id: user.id, role: user.role } };
  //   const token = jwt.sign(payload, process.env.SECRET_JWT, {
  //     expiresIn: "1h",
  //   });

  //   // Send success response with the token
  //   res.status(201).json({
  //     success: true,
  //     message: "Account Created Successfully",
  //     user,
  //     token,
  //   });
  // } catch (error) {
  //   console.error("Error in registration:", error);
  //   res.status(500).json({ success: false, message: "Server error" });
  // }
};

//----------------------------------------------------------------------------

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid login credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Generate a JWT
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "1h",
    });

    // Successful login response
    res.status(200).json({
      success: true,
      token,
      role: user.role,
      message: "Valid login credentials",
    });
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { register, login };
