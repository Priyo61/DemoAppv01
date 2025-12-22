const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.signUpRender = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    //console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "successfully signup");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.renderSignIn = (req, res) => {
  res.render("users/signin.ejs");
};

module.exports.renderSignInForm = async (req, res) => {
  req.flash("success", "welcome to da khun");
  let redirectUrl = res.locals.redirectUrl || "/listings";

  res.redirect(redirectUrl);
};

module.exports.renderLogOutForm = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
