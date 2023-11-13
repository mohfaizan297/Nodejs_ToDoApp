const bcrypt = require("bcrypt");
const { error, success } = require("../Utils/responseWrapper");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.send(error(403, "All fields are required"));
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.send(error(401, "User is already registered"));
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, //15mins
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        status: "ok",
        statusCode: 201,
        message: "registered successfully",
      });
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send(error(403, "All fields are required"));
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.send(error(401, "User is not registered"));
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword)
      return res.send(error(403, "email or password is incorrect"));
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, //15mins
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        status: "ok",
        statusCode: 201,
        message: `welcome back ${user.name}`,
      });
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const getMyProfile = async (req, res) => {
  try {
    return res.status(200).json({
      status: "ok",
      user: req.user,
    });
  } catch (e) {
    return res.send(error(500, e.message));
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
        status: "ok",
        message: "Logout Successfully",
      });
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  signupController,
  loginController,
  getMyProfile,
  logoutController,
};
