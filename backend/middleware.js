const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./config/schema.js");

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({ message: errMsg });
    }
    next()
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({ message: errMsg });
    }
    next()
}

module.exports.isLoggedIn = (req, res, next) => {
    try {
        if (!req.isAuthenticated() || !req.user) {
            return res.status(401).json({ message: "Unauthorized Please log in." });
        }
        next();
    } catch (error) {
        console.error("Error in isLoggedIn middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (!listing.owner._id.equals(res.locals.currUser._id)) {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
        next();
    } catch (error) {
        console.error("Error in isOwner middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    try {
        let { reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (!review.author._id.equals(res.locals.currUser._id)) {
            return res.status(403).json({ message: "You are not the author of this review!" });
        }
        next();
    } catch (error) {
        console.error("Error in isReviewAuthor middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}