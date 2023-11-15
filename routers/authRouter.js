const router = require("express").Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);
router.get("/logout", isAuthenticated, authController.logoutController);
router.get("/me", isAuthenticated, authController.getMyProfile);

module.exports = router;
