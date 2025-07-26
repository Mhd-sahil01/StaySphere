import ListingCard from "../../components/ListingCard";
import { useFilterStore } from "../../features/filter/useFilterStore";
import Filter from "../../features/filter/Filter";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

function FilterDisplay() {
    const { filteredListings, isLoading, setSelectedFilter } = useFilterStore();
    const { type } = useParams();

    useEffect(() => {
        if (type) {
            setSelectedFilter(`/${type}`);
        }
    }, [type]);

    if (!filteredListings || filteredListings.length === 0) {
        return (
            <div className="">
                <Filter />
                <div className="text-center py-12 text-gray-500">
                    <h2 className="text-2xl font-semibold mb-2">{type} Not found</h2>
                    <p className="text-sm">Try selecting a different category to explore available properties.</p>
                </div>

            </div>
        );
    } else {
        return (
            <>
                <Filter />
                {isLoading ? (
                    <div className='flex items-center justify-center h-screen'>
                        <Loader className='size-10 animate-spin' />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-50 p-4 gap-6">
                        {filteredListings.map((listing) => (
                            <ListingCard key={listing._id} listing={listing} />
                        ))}
                    </div>
                )}
            </>
        );
    }
}

export default FilterDisplay;