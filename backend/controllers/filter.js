const Listing = require("../models/listing.js");

// for filtering list by diff. category
module.exports.filter = async (req, res) => {
    const listings = await Listing.find({ category: req.params.id });

    if (listings.length > 0) {
        return res.status(200).json(listings);
    } else {
        return res.status(404).json({ message: "Category you requested for does not exist!" });
    }
};