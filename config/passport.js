const LocalStrategy = require("passport-local");
const User = require("../models/user.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
        async function (accessToken, refreshToken, profile, callback) {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (user) return callback(null, user)

                user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    user.googleId = profile.id,
                        user.username = profile.displayName
                    await user.save();
                    return callback(null, user);
                }

                const newUser = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                });
                await newUser.save();
                return callback(null, newUser);

            } catch (err) {
                return callback(err)
            }
        }
    ));

    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });
    passport.deserializeUser((id, callback) => {
        User.findById(id)
            .then(user => callback(null, user))
            .catch(callback);
    });
};
