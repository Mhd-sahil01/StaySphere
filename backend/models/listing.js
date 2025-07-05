const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        }
      },
    category: {
        type: String,
        enum: ["Hostels", "Rooms", "PGs", "Shared Flats", "Studio Apartments", "Cheap Rent", "Iconic Cities", "Luxury Villas", "House", "Penthouses"],
    },
});

listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } });
    }
});

const Listing = mongoose.model("Listing", listSchema);
module.exports = Listing;