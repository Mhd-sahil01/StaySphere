import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Loader } from "lucide-react";
import Review from "../../components/Review";
import Map from "../../features/map/Map";
import { toast } from "react-hot-toast";

function Show() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const result = await axiosInstance.get(`/listings/${id}`);
                setListing(result.data);
            } catch (error) {
                console.error("Error fetching listing inside show page", error);
                navigate("/");
            }
        };
        fetchListing();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/listings/${id}`);
            navigate("/");
            toast.success("successfully Deleted!");
        } catch (error) {
            if (error && error.response.status === 401) {
                toast.error("User not authenticated, please login");
                navigate("/login");
            } else if (error.response.status === 403) {
                toast.error("This property does not belong to you");
                navigate(`/show/${id}`);
            } else {
                toast.error("Failed to delete");
                console.error(error);
            }
        }
    }

    if (!listing) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="w-10 h-10 animate-spin text-gray-600" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <h3 className="text-2xl font-semibold mb-4 text-center md:text-left">
                {listing.title}
            </h3>

            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                <img
                    src={listing.image.url}
                    alt="Listing"
                    className="w-full h-64 object-cover"
                />
                <div className="p-4 space-y-2">
                    <p className="text-gray-700">
                        <span className="font-medium">Owned by :</span>{"  "}
                        {listing.owner.username}
                    </p>
                    <p className="text-gray-600">{listing.description}</p>
                    <p className="text-lg font-semibold text-red-700">
                        ₹{Number(listing.price).toLocaleString("en-IN")} / month
                    </p>
                    <p className="text-gray-500">
                        {listing.location}, {listing.country}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Contact number :</span>{"  "}
                        {listing.contact}
                    </p>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-2 p-4 border-t">
                    <button
                        onClick={() => navigate(`/listings/${id}/edit`)}
                        className="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <Review listing={listing} setListing={setListing} listingId={id} />
            {
                listing.geometry.coordinates.length > 0 && <Map geometry={listing.geometry.coordinates} />
            }
        </div>
    );
}

export default Show;