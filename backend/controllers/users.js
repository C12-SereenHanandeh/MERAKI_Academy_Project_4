const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sanitizeFilter } = require("mongoose");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Generate salt and Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, role });

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
