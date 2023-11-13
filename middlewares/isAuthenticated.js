const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { error } = require("../Utils/responseWrapper");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.send(error(404, "Login First"));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
module.exports = {
  isAuthenticated,
};
