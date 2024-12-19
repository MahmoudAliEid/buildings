const { User } = require("../models/user");
const CatchError = require("../middleware/catchAsyncErrors");
const sendingToken = require("../utils/sendToken");
const bcrypt = require("bcryptjs");

// ** Register User
const registerUser = CatchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter name, email and password" });
  }

  // ** Check if user exists
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  sendingToken(user, 200, res, "User registered successfully");
});

// ** Login User
const loginUser = CatchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please enter email and password" });
  }

  // ** Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    res.status(401).json({ message: "Invalid email or password" });
  }
  sendingToken(user, 200, res, "User logged in successfully");
});

// ** Logout User
const logoutUser = CatchError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = { registerUser, loginUser, logoutUser };
