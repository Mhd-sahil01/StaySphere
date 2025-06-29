const Listing = require("../models/listing.js");

module.exports.root = async (req, res) => {
    try {
        const allListing = await Listing.find({});
        res.render("listings/index.ejs", { allListing });
    } catch (err) {
        next(err);
    }
};