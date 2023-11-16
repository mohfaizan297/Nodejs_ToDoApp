const jwt = require("jsonwebtoken");

module.exports = function sendCookie(user, res, message, statusCode = 200) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //15mins
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
