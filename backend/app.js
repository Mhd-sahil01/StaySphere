if (process.env.NODE_EVN != "production") {
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./config/passport.js")(passport);

const listingRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/users.js");
const filterRouter = require("./routes/filter.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to db")
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials:true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));

const sessionOption = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 5 * 24 * 60 * 60 * 1000,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

// store current user
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});

app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api/auth", usersRouter);
app.use("/api/filters", filterRouter);

app.all("*all", (req, res, next) => {
    const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
// test