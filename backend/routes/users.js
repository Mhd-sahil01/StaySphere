const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const userController = require("../controllers/user.js");

//for normal signup
router
    .route("/signup")
    .post(wrapAsync(userController.signup));

//for normal login
router
    .route("/login")
    .post(wrapAsync(userController.login));

//to check the user is exist or note
router
    .route("/status")
    .get(userController.status);

// google login api    
router
    .get("/login/failed", userController.loginFailedGoogle);
router
    .get("/google/callback", passport.authenticate("google", {
    successRedirect:process.env.GOOGLE_CLIENT_URL,
    failureRedirect:"/login/failed"
}));
router
    .get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

//for logout
router
    .get("/logout", userController.logout);

module.exports = router;