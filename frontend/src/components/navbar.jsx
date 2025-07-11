
function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start gap-2">
                <a className="text-lg font-bold">StaySphere</a>
                <form className="search-bar flex gap-1 mx-1">
                    <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-full" />
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
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden">
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
                <div className="lg:flex lg:gap-1 hidden">
                <a className="btn btn-ghost text-lg">Explore</a>
                <a className="btn btn-ghost text-base">Rent It Now</a>
                <a className="btn btn-ghost text-base">Signup</a>
                <a className="btn btn-ghost text-base">Login</a>
                </div>
            </div>

        </div>
    )
}

export default Navbar;