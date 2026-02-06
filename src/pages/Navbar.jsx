import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Star, Search, LogOut, Ticket } from "lucide-react";
import Cookies from "js-cookie";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();

    // Get user info from cookie
    const token = Cookies.get("authToken");
    const user = token
        ? JSON.parse(Cookies.get("user") || '{}')
        : null;

    const handleLogout = () => {
        Cookies.remove("authToken");
        Cookies.remove("user");
        setProfileOpen(false);
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="bg-[#202A44] border-b border-yellow-400 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* LEFT */}
                <div className="flex items-center gap-10">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-yellow-400 font-bold text-xl"
                    >
                        <Star />
                        CineBook
                    </Link>

                    <div className="hidden md:flex gap-6 text-yellow-200">
                        <Link to="/movies" className="hover:text-yellow-400">
                            Movies
                        </Link>
                        <Link to="/category" className="hover:text-yellow-400">
                            Category
                        </Link>
                        
                        <Link to="/contact" className="hover:text-yellow-400">
                            Contact
                        </Link>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hidden md:flex items-center gap-4 relative">
                    {/* SEARCH */}
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-2.5 text-yellow-400" />
                        <input
                            placeholder="Search movies..."
                            className="bg-[#1A2238] border border-yellow-400 text-yellow-100 pl-10 pr-4 py-2 rounded-full text-sm outline-none"
                        />
                    </div>

                    {/* AUTH */}
                    {!user ? (
                        <Link
                            to="/login"
                            className="bg-yellow-400 hover:bg-yellow-300 text-[#202A44] px-6 py-2 rounded-full font-medium"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            {/* AVATAR */}
                            <img
                                src={user.avatar || "https://i.ibb.co/KwBvfjJ/kuromi.png"}
                                alt="user"
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400"
                            />

                            {/* DROPDOWN */}
                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-[#1A2238] border border-yellow-400 rounded-xl shadow-xl overflow-hidden">
                                    <div className="px-4 py-3 text-sm text-yellow-300">
                                        Hi, {user.name || "User"}
                                    </div>

                                    <Link
                                        to="/my-booking"
                                        className="flex items-center gap-2 px-4 py-2 text-yellow-200 hover:bg-yellow-900/20"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <Ticket size={16} />
                                        My Bookings
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/30"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* MOBILE ICON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-yellow-400"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-[#202A44] px-6 pb-6 space-y-4 text-yellow-200">
                    <Link to="/movies">Movies</Link>
                    <Link to="/category">Category</Link>
                    
                    <Link to="/contact">Contact</Link>

                    {!user ? (
                        <Link
                            to="/login"
                            className="block text-center bg-yellow-400 text-[#202A44] py-2 rounded-full"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link to="/my-booking">My Bookings</Link>
                            <button onClick={handleLogout} className="text-red-400">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
