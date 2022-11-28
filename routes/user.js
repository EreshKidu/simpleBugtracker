const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

const users = require("../controllers/users")

router.route("/register")
.get(users.showRegister)
.post(users.register);

router.route("/login")
.get( users.showLogin)
.post(
    passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true
  }), users.login
  
);

router.get("/logout", users.logout);

module.exports = router;