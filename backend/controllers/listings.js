const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
        const allListing = await Listing.find({});
        res.status(200).json(allListing);
};

module.exports.showListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate({
            path: "review",
            populate: {
                path: "author",
            }
        })
        .populate("owner");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
};

module.exports.createListing = async (req, res, next) => {
    const { title, price, description, location, country, category } = req.body;
        let response = await geocodingClient // for map
            .forwardGeocode({
                query: location,
                limit: 1
            })
            .send()

        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing({ // create new listing
            title,
            price,
            description,
            location,
            country,
            category
        });
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = response.body.features[0].geometry; // adding gemotery for map
        await newListing.save();
        res.status(201).json(newListing);
};

// module.exports.renderEditForm = async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!");
//         res.redirect("/listings");
//     } else {
//         let originalImageUrl = listing.image.url;
//         originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
//         res.render("listings/edit.ejs", { listing, originalImageUrl });
//     }
// };

module.exports.updateListing = async (req, res) => {
        const { title, price, description, location, country } = req.body;
        let listing = await Listing.findByIdAndUpdate(req.params.id,  //find and update listing by id
            {
                title,
                price,
                description,
                location,
                country
            }, { new: true });

        if (typeof req.file != "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            await listing.save();
        }
        //if accessed with wrong id (invalid id)
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json(listing);
};

module.exports.deleteListing = async (req, res) => {
        const deleteListing = await Listing.findByIdAndDelete(req.params.id);
        if(!deleteListing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json({message: "Listing Deleted!"});
};

module.exports.showSearchListing = async (req, res) => {
    let search = req.query.search;
    let allListing = await Listing.find({ location: search });
    if (allListing.length) {
        res.status(200).json(allListing);
    } else {
        return res.status(404).json({ message: "Location you requested for does not exist!" });
    }
}