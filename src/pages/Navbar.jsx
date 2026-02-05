import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Film, User } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setDropdown(false);
        navigate("/login");
    };

    return (
        <nav className="bg-[#202A44]/95 backdrop-blur border-b border-yellow-400/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
                        <Film />
                        <Link to="/">CineBook</Link>
                    </div>

                    <div className="hidden md:flex gap-6 text-gray-300">
                        <Link to="/movies" className="hover:text-yellow-400">Movies</Link>
                        <Link to="/category" className="hover:text-yellow-400">Category</Link>
                        <Link to="/genre" className="hover:text-yellow-400">Genre</Link>
                        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hidden md:flex items-center gap-4">

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            placeholder="Search movies..."
                            className="bg-[#1A2238] text-white pl-10 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* AUTH */}
                    {!isLoggedIn ? (
                        <button
                            onClick={() => setIsLoggedIn(true)}
                            className="bg-yellow-400 text-[#202A44] hover:bg-yellow-300 px-5 py-2 rounded-full font-semibold"
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdown(!dropdown)}
                                className="w-10 h-10 rounded-full bg-[#1A2238] flex items-center justify-center border border-gray-700"
                            >
                                <User size={20} className="text-gray-300" />
                            </button>

                            {dropdown && (
                                <div className="absolute right-0 mt-3 w-44 bg-[#1A2238] border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                                    <button
                                        onClick={() => {
                                            setDropdown(false);
                                            navigate("/my-booking");
                                        }}
                                        className="block w-full text-left px-4 py-3 text-sm hover:bg-[#202A44] text-gray-300"
                                    >
                                        🎟 My Bookings
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-3 text-sm text-yellow-400 hover:bg-[#202A44]"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* MOBILE ICON */}
                <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300">
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-[#202A44] px-6 pb-6 space-y-4 text-gray-300">
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/movies" onClick={() => setOpen(false)}>Movies</Link>
                    <Link to="/category" onClick={() => setOpen(false)}>Category</Link>
                    <Link to="/genre" onClick={() => setOpen(false)}>Genre</Link>
                    <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

                    <hr className="border-gray-700" />

                    {!isLoggedIn ? (
                        <button
                            onClick={() => setIsLoggedIn(true)}
                            className="w-full bg-yellow-400 text-[#202A44] py-2 rounded-full font-semibold"
                        >
                            Sign In
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-yellow-400"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
