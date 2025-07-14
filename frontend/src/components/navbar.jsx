
function Navbar() {
    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm">
            <div className="navbar-start gap-1 md:gap-2 flex-1">
                <a className="text-lg font-bold whitespace-nowrap">StaySphere</a>

                {/* Search bar  */}
                <form className="search-bar hidden md:flex gap-1 mx-1 flex-1 max-w-md">
                    <div className="form-control flex-1">
                        <input
                            type="text"
                            placeholder="Search Locations..."
                            className="input input-bordered w-full"
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
                        <li><a>Rent It Now</a></li>
                        <li><a>Explore</a></li>
                        <li><a>Signup</a></li>
                        <li><a>Login</a></li>
                    </ul>
                </div>

                {/* Desktop navigation - hidden on mobile */}
                <div className="hidden md:flex md:gap-1 lg:gap-2">
                    <a className="btn btn-ghost min-w-20">Explore</a>
                    <a className="btn btn-ghost min-w-20">Rent It Now</a>
                    <a className="btn btn-ghost min-w-20">Signup</a>
                    <a className="btn btn-ghost min-w-20">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;