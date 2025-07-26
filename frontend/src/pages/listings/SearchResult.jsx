import ListingCard from "../../components/ListingCard";
import Filter from "../../features/filter/Filter";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

function SearchResult() {

    const [searchParams] = useSearchParams();
    const place = searchParams.get("place");
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSearchResult = async () => {
            if (!place) return;
            setIsLoading(true);
            setListings([]);
            try {
                const result = await axiosInstance.get(`/listings/place?search=${place}`);
                setListings(result.data);
            } catch (error) {
                console.error("Error fetching listings in search", error);
                setListings([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSearchResult();
    }, [place]);

    if (isLoading) {
        return (
            <>
                <Filter />
                <div className="flex items-center justify-center h-screen">
                    <Loader className="size-10 animate-spin" />
                </div>
            </>
        );
    }

    if (!listings || listings.length === 0) {
        return (
            <>
                <Filter />
                <div className="text-center py-12 text-gray-600">
                    <h2 className="text-2xl font-semibold mb-2">No listings found for "{place}"</h2>
                    <p className="text-sm">No properties found. Try searching a different location.</p>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Filter />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-50 p-4 gap-6">
                    {listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>
            </>
        );
    }
}

export default SearchResult;