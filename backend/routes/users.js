const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router
    .route("/signup")
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    .post(saveRedirectUrl,wrapAsync(userController.login));

router
    .get("/auth/google/callback", passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    }));

router
    .get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router
    .get("/logout", userController.logout);

module.exports = router;