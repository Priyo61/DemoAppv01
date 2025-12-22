const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signUpRender));

router
  .route("/signin")
  .get(userController.renderSignIn)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/signin",
      failureFlash: true,
    }),
    userController.renderSignInForm
  );

router.get("/logout", userController.renderLogOutForm);

module.exports = router;
