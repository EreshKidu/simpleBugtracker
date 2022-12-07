const User = require("../models/user");

module.exports.showRegister = (req, res) => {
    const pageName = 'register';

    res.render("users/register", {pageName});
  }

  module.exports.register = async (req, res, next) => {
    
      const { email, password } = req.body;
      console.log (email, password );
      const user = new User({ email, username: email});
      const registeredUser = await User.register(user, password);
      console.log ("!!!!!!!!!!!!!!!!!!!!!!!")
      console.log (registeredUser);

      req.login(registeredUser, (err) => {
        if (err) return next(err);
        res.redirect("/projects");
      });

  }

  module.exports.showLogin = (req, res) => {
    const pageName = 'login';

    res.render("users/login", {pageName});
  }

  module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || "/projects";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }

  module.exports.guestLogin = async (req, res) => {
    const guestUser = await User.findOne({email: "guest@sbt.com"});
    req.login(guestUser, (err) => {
      if (err) return next(err);
      res.redirect("/projects");
    });
  }


  module.exports.logout = (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  }