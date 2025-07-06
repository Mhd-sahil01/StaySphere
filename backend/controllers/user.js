const User = require("../models/user.js");
const passport = require("passport");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderLust");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// module.exports.renderLoginForm = (req, res) => {
//     res.render("users/login.ejs");
// };

module.exports.login = async (req, res, next) => {
    try {
        passport.authenticate("local", async (err, user, info) => {
            if (err) {
                console.log("passport error", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (!user) {
                return res.status(401).json({ message: "Invalid password or username" });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Internal server error" });
                }
                res.status(200).json({ message: 'Logged in successfully' });
            })
        })(req, res, next);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "successfully logged out!")
        res.redirect("/listings");
    });
};