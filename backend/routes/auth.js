const express = require("express");
const router = express.Router();
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
// Controllers
const {
  register,
  login,
  loginStatus,
  forgotPassword,
  resetPassword,
  logout,
  changePassword,
} = require("../controllers/auth");
const  protect  = require("../middleware/auth"); 

router.post("/register", register);
router.post("/login",
ensureLoggedOut({ redirectTo: '/' }), login);
router.get("/loggedin", 
ensureLoggedOut({ redirectTo: '/' }), loginStatus);
router.get("/logout", 
ensureLoggedOut({ redirectTo: '/' }), logout);

router.patch("/changepassword",
ensureLoggedOut({ redirectTo: '/' }),  protect, changePassword);
router.post("/forgotpassword",
ensureLoggedOut({ redirectTo: '/' }), forgotPassword);
router.put("/resetpassword/:resetToken",
ensureLoggedOut({ redirectTo: '/' }), resetPassword);

module.exports = router;
