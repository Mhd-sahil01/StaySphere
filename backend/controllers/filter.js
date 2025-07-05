const Listing = require("../models/listing.js");

module.exports.filter = async (req, res) => {
    let { id } = req.params;
    const allListing = await Listing.find({ category: id });
    if (allListing.length) {
        res.render("filters/filter.ejs", { allListing });
    } else {
        req.flash("error", "Category you requested for does not exist!");
        res.redirect("/listings");
    }
}