import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

function Review({ listing, setListing, listingId }) {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        if(!comment || comment.trim().length === 0) {
            toast.error("Comment cannot be empty");
            return
        }
        try {
            await axiosInstance.post(`/listings/${listingId}/reviews`, { rating, comment });
            setComment("");
            setRating(1);
            const updated = await axiosInstance.get(`/listings/${listingId}`);
            setListing(updated.data);
            toast.success("New Review Created!");
        } catch (error) {
            if(error.response && error.response.status === 401) {
                toast.error("User not authenticated, please login");
                navigate(`/login`);
            } else {
                toast.error("An error occurred. Please try again.");
                console.error("Error submitting review", error);
            }
        }
    };

    const handleDeleteReview = async (reviewId) => {
        
        try {
            await axiosInstance.delete(`/listings/${listingId}/reviews/${reviewId}`);
            setListing((prev) => ({
                ...prev,
                review: prev.review.filter((r) => r._id !== reviewId),
            }));
            toast.success("Review Deleted!");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("You can only delete your own reviews.");
            } else if (error.response && error.response.status === 404) {
                toast.error("Review not found.");
            } else {
                console.error("Failed to delete review", error);
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <hr className="my-6 border-gray-300" />
            <h4 className="text-xl font-semibold mb-4">Leave a Review</h4>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <input
                                key={num}
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                value={num}
                                checked={Number(rating) === num}
                                onChange={() => setRating(num)}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comments:</label>
                    <textarea
                        id="comment"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                </div>

                <button type="submit" className="px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
                    Submit
                </button>
            </form>

            {listing.review?.length > 0 && (
                <>
                    <hr className="my-6 border-gray-300" />
                    <h4 className="text-xl font-semibold mb-4">All Reviews</h4>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {listing.review.map((review) => (
                            <div key={review._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                <h6 className="font-semibold text-gray-800">@{review.author.username}</h6>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <div
                                            key={star}
                                            className={`mask mask-star-2 w-4 h-4 ${star <= review.rating ? "bg-orange-400" : "bg-gray-300"}`}
                                        ></div>
                                    ))}
                                </div>

                                <p className="text-gray-600">{review.comment}</p>
                                <button
                                    onClick={() => handleDeleteReview(review._id)}
                                    className="mt-2 px-3 py-1 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default Review;