const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// to show all the list present in the database
module.exports.index = async (req, res) => {
        const allListing = await Listing.find({});
        res.status(200).json(allListing);
};

// showing list more deatily
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

// to create a new lisiting
module.exports.createListing = async (req, res, next) => {
    const { title, price, description, location, country, category, contact } = req.body;
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
            category,
            contact
        });
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = response.body.features[0].geometry; // adding gemotery for map
        await newListing.save();
        res.status(201).json(newListing);
};

// to update a existing listing 
module.exports.updateListing = async (req, res) => {
        const { title, price, description, location, country, contact } = req.body;
        let listing = await Listing.findByIdAndUpdate(req.params.id,  //find and update listing by id
            {
                title,
                price,
                description,
                location,
                country,
                contact
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

// for deleteing a list
module.exports.deleteListing = async (req, res) => {
        const deleteListing = await Listing.findByIdAndDelete(req.params.id);
        if(!deleteListing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json({message: "Listing Deleted!"});
};

// show the list according to the searchbar (based on location)
module.exports.showSearchListing = async (req, res) => {
    let search = req.query.search;
    let allListing = await Listing.find({ location: search });
    if (allListing.length) {
        res.status(200).json(allListing);
    } else {
        return res.status(404).json({ message: "Location you requested for does not exist!" });
    }
}