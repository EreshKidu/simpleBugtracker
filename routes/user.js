const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

const users = require("../controllers/users");

const LocalStrategy = require('passport-local');

const  GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// authUser = (request, accessToken, refreshToken, profile, done) => {
//   return done(null, profile);
// }

// passport.use(new GoogleStrategy({
//   clientID:     process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/google/callback",
//   passReqToCallback   : true
// }, authUser));

// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));

const callback = "https://simplebugtracker.onrender.com/auth/google/callback";
// const callback = "http://localhost:3000/auth/google/callback";



passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callback,
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    
    // const currentUser = await User.findOrCreate({ googleId: profile.id, email: profile.email, username: profile.name  })
    console.log (profile);
    const currentUser = await User.findOne ({googleId: profile.id});
    if (!currentUser) {
      const newUser = new User ({
        username: profile.email,
        googleId: profile.id,
        email: profile.email
      })
      await newUser.save();
      return done(null, newUser);

    }
      
    return done(null, currentUser);

  }
));




passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.route("/")
.get(users.showAbout)


router.route("/register")
.get(users.showRegister)
.post(catchAsync(users.register));

router.route("/login")
.get( users.showLogin)
.post(
    passport.authenticate("local", {
    // failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true
  }), users.login
  
);

router.route("/guestlogin")
.get(users.guestLogin);

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile'] }
));

router.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/projects',
        failureRedirect: '/login'
}));


router.get("/logout", users.logout);

module.exports = router;
