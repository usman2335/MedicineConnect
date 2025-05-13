const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
<<<<<<< HEAD
=======

>>>>>>> 8afc56451cb4cdb64becdebec87825803625c16d
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error); // 👈 helpful debug info
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// Login User

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

<<<<<<< HEAD
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error); // 👈 helpful debug info
    res.status(500).json({ message: "Signup failed", error: error.message });
=======
    // Respond with token, patient name, and role
    res.status(200).json({
      token,
      patient: {
        name: `${user.firstName} ${user.lastName}`,
      },
      role: user.role, // 👈 SEND THE ROLE TOO!
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
>>>>>>> 8afc56451cb4cdb64becdebec87825803625c16d
  }
};

module.exports = { registerUser, loginUser };
