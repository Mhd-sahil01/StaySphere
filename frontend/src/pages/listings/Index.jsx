import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-hot-toast';

function Index() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const index = async () => {
            try {
                const result = await axiosInstance.get("/listings");
                console.log(result);
                setListings(result.data);
            } catch (error) {
                console.log("error in calling the listings", error);
            }
        }
        index();
    }, [])


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-6">
            {listings.map((listing) => (
                <Link
                    to={`/listings/${listing._id}`}
                    key={listing._id}
                    className="hover:scale-[1.02] transition-transform duration-300"
                >
                    <div className="card bg-base-100 shadow-xl h-full flex flex-col">
                        <figure className="relative pt-[56.25%] overflow-hidden"> 
                            <img
                                src={listing.image.url}
                                alt={listing.title}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                        </figure>
                        <div className="card-body flex-grow">
                            <h2 className="card-title line-clamp-2">{listing.title}</h2>
                            <p className="font-semibold">
                                ₹{listing.price.toLocaleString("en-IN")} / Month
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Index;