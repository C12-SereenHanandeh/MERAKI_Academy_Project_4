const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sanitizeFilter } = require("mongoose");

// Register a new user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const lowerCaseEmail = email.toLowerCase();

    // Generate salt and Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email: lowerCaseEmail,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Create JWT payload
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ message: "Account Created Successfully", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};

//----------------------------------------------------------------------------

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found, return 401 with an error message
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return 401 with an error message
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid login",
      });
    }

    // Create a JWT payload
    const payload = { user: { id: user.id, role: user.role } };

    // Sign the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return a 200 status code with a success message and the token
    return res.status(200).json({
      success: true,
      message: "Valid login",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { register, login };
