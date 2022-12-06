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


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
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

// passport.serializeUser( (user, done) => { 
//   console.log(`\n--------> Serialize User:`)
//   console.log(user)
//    // The USER object is the "authenticated user" from the done() in authUser function.
//    // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

//   done(null, user.id)
// } )


// passport.deserializeUser( async (id, done) => {
//       console.log("\n--------- Deserialized User:")
//       console.log(id)
//       // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
//       // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
//       //  User.findOne({  $or: [{"googleId": id}, {"_id": id} ] }  , function(err, user) {
//       const currentUser = await  User.findOne({  "googleId": id } );

//       done(null, currentUser);
    

      
//  }) 

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
