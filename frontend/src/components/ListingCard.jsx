import { Link } from 'react-router-dom';

function ListingCard({ listing }) {
    return (
        <>
            <Link
                to={`/show/${listing._id}`}
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
        </>
    );
}

export default ListingCard;