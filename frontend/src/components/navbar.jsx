import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../features/auth/useAuthStore";
import { LogOut, Menu, X } from "lucide-react";

function Navbar() {
    const { logout, user } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?place=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setMenuOpen(false);
        }
    };

    return (
        <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link to="/" className="text-xl font-bold">
                    StaySphere
                </Link>

                {/* Search bar for desktop */}
                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center border rounded overflow-hidden"
                >
                    <input
                        type="text"
                        placeholder="Search locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 outline-none w-64"
                    />
                    <button
                        type="submit"
                        className="bg-blue-200 hover:bg-blue-500 text-white px-4 py-2"
                    >
                        Search
                    </button>
                </form>

                {/* Links for desktop*/}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/" className="hover:bg-blue-100 rounded px-2 py-1 transition-colors">Explore</Link>
                    <Link to="/new" className="hover:bg-blue-100 rounded px-2 py-1 transition-colors">Rent It Now</Link>
                    {user ? (
                        <button
                            onClick={logout}
                            className="flex items-center gap-1 hover:bg-red-100 rounded px-2 py-1 transition-colors text-red-500"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/signup" className="hover:bg-blue-100 rounded px-2 py-1 transition-colors">Signup</Link>
                            <Link to="/login" className="hover:bg-blue-100 rounded px-2 py-1 transition-colors">Login</Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button*/}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
                    {/* Mobile search bar */}
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center border rounded overflow-hidden"
                    >
                        <input
                            type="text"
                            placeholder="Search locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-2 outline-none flex-1"
                        />
                        <button
                            type="submit"
                            className="bg-blue-200 hover:bg-blue-500 text-white px-4 py-2"
                        >
                            Search
                        </button>
                    </form>

                    {/* Links */}
                    <Link
                        to="/"
                        className="block hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Explore
                    </Link>
                    <Link
                        to="/new"
                        className="block hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Rent It Now
                    </Link>
                    {user ? (
                        <button
                            onClick={() => {
                                logout();
                                setMenuOpen(false);
                            }}
                            className="flex items-center gap-1 hover:bg-red-100 rounded px-2 py-1 transition-colors text-red-500"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/signup"
                                className="block hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Signup
                            </Link>
                            <Link
                                to="/login"
                                className="block hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;