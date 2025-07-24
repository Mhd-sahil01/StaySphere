import { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import ListingCard from '../../components/ListingCard';
import Filter from '../../components/Filter';
import { toast } from 'react-hot-toast';

function Index() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const index = async () => {
            try {
                const result = await axiosInstance.get("/listings");
                setListings(result.data);
            } catch (error) {
                console.log("error in calling the listings", error);
            }
        }
        index();
    }, [])


    return (
        <>
            <Filter />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-50 p-4 gap-6">
                {listings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing}/>
                ))}
            </div>
        </>
    );
}

export default Index;