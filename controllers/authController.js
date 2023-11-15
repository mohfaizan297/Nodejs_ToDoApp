const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendCookie = require("../Utils/feature");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(404).json({
        success: false,
        message: "user already exist",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "user doesn't exist",
      });
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword)
      return res.status(404).json({
        success: false,
        message: "Email or Password is incorrect",
      });
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
const getMyProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expiresIn: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "Logout Successfully",
      });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  signupController,
  loginController,
  getMyProfile,
  logoutController,
};
