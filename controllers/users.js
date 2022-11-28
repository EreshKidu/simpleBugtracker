const User = require("../models/user");

module.exports.showRegister = (req, res) => {
    res.render("users/register");
  }

  module.exports.register = async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        res.redirect("/projects");
      });
    } catch (e) {

      res.redirect("register");
    }
  }

  module.exports.showLogin = (req, res) => {
    res.render("users/login");
  }

  module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || "/projects";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }

  module.exports.logout = (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/projects");
    });
  }