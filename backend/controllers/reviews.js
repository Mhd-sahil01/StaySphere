const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => { // to create a review
    const { comment, rating } = req.body;
    let listing = await Listing.findById(req.params.id);
    if(!listing) return res.status(400).json({message: "Listing not exist!"});
    let newReview = new Review({
        rating,
        comment
    })
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    res.status(201).json({ message: "New Review Created!" })
};

module.exports.deleteReview = async (req, res) => { // to delete a review
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    const deleteReview = await Review.findByIdAndDelete(reviewId);
    if(!deleteReview) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({message: "Review Deleted!"});
};