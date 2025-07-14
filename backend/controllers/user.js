const User = require("../models/user.js");
const passport = require("passport");

// for signup
module.exports.signup = async (req, res) => {
        let { email, username, password } = req.body;
        // check if any fields are empty
        if (!email || !username || !password) return res.status(400).json({ message: "All fields are required!" })
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        // check if username or email is already exist
        if (existingUser) {
            if (existingUser.email === email) return res.status(400).json({ message: "Email already exists!" });
            if (existingUser.username === username) return res.status(400).json({ message: "Username already exists!" });
        }
        // create user
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });;
            }
            res.status(201).json({ message: "Signup successfully" })
        });
};

// for login
module.exports.login = async (req, res, next) => {
        // login using passport
        passport.authenticate("local", async (err, user, info) => {
            if (err) {
                console.log("passport error", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            //if user not exist
            if (!user) {
                return res.status(401).json({ message: "Invalid password or username" });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Internal server error" });
                }
                res.status(200).json({ message: "Logged in successfully" });
            })
        })(req, res, next);
};

//for logout
module.exports.logout = (req, res, next) => {
    try {
        req.logOut((err) => {
            if (err) {
                return  res.status(500).json({ message: "Something went wrong" });
            }
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch(err){
        console.error("Unexpected error:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// for looking the user is present or not from the frontend
module.exports.status = (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user || null
    });
};