import { Link } from "react-router-dom";
import { useAuthStore } from "../features/auth/useAuthStore";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { logout, user } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?place=${encodeURIComponent(searchQuery.trim())}`)
        }
        setSearchQuery("");
    }

    const handleInput = (event) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm">
            <div className="navbar-start gap-1 md:gap-2 flex-1">
                <a className="text-lg font-bold whitespace-nowrap">StaySphere</a>

                {/* Search bar  */}
                <form onSubmit={handleSearch} className="search-bar hidden md:flex justify-center gap-1 mx-1 flex-1 w-1/2 max-w-md">
                    <div className="form-control flex-1">
                        <input
                            type="text"
                            placeholder="Search Locations..."
                            className="input input-bordered w-full"
                            value={searchQuery}
                            onChange={handleInput}
                        />
                    </div>
                    <button className="btn btn-ghost btn-circle" type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            <div className="navbar-end flex-none">
                {/* Mobile menu button - visible only on small screens */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {/* Mobile search bar */}
                        <li>
                            <form onSubmit={handleSearch} className="flex gap-1 w-full relative">
                                <input
                                    type="text"
                                    placeholder="Locations..."
                                    className="input input-bordered flex-1 w-11/12"
                                    value={searchQuery}
                                    onChange={handleInput}
                                />
                                <button type="submit" className="btn btn-ghost btn-circle absolute right-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </li>
                        <li><Link to={"/"}>Explore</Link></li>
                        <li><Link to={"/new"}>Rent It Now</Link></li>
                        {
                            user ? (
                                <li><Link onClick={logout}><LogOut size={15} />Logout</Link></li>
                            ) : (
                                <>
                                    <li>
                                        <div className="flex gap-2">
                                            <Link to={"/signup"} className="hover:text-green-400 font-bold">Signup</Link>
                                            <Link to={"/login"} className="hover:text-green-400 font-bold">Login</Link>
                                        </div>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>

                {/* Desktop navigation - hidden on mobile */}
                <div className="hidden md:flex md:gap-1 lg:gap-2">
                    <Link to={"/"} className="btn btn-ghost min-w-20">Explore</Link>
                    <Link to={"/new"} className="btn btn-ghost min-w-20">Rent It Now</Link>
                    {user ? (
                        <Link onClick={logout} className="btn btn-ghost min-w-20">Logout <LogOut size={20} /> </Link>
                    ) : (
                        <>
                            <Link to={"/signup"} className="btn btn-ghost min-w-20">Signup</Link>
                            <Link to={"/login"} className="btn btn-ghost min-w-20">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;