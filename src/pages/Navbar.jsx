import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Ticket, Search } from "lucide-react"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav
            className="border-b sticky top-0 z-50"
            style={{ backgroundColor: "#202A44", borderColor: "#FACC15" }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-10">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-yellow-400 font-bold text-xl"
                    >
                        <Ticket />
                        CineBook
                    </Link>

                    <div className="hidden md:flex gap-6 text-gray-300">
                        <Link to="/movies" className="hover:text-yellow-400">Movies</Link>
                        <Link to="#" className="hover:text-yellow-400">Category</Link>
                        <Link to="#" className="hover:text-yellow-400">Genre</Link>
                        <Link to="#" className="hover:text-yellow-400">Contact</Link>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hidden md:flex items-center gap-4">
                    {/* SEARCH */}
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-2.5 text-yellow-400"
                        />
                        <input
                            placeholder="Search movies..."
                            className="bg-[#1A2238] border border-yellow-400 text-white pl-10 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* LOGIN */}
                    <Link
                        to="/login"
                        className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-2 rounded-full font-medium transition"
                    >
                        Login
                    </Link>
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
                <div
                    className="md:hidden px-6 pb-6 space-y-4 text-gray-300"
                    style={{ backgroundColor: "#202A44" }}
                >
                    <Link to="/movies">Movies</Link>
                    <Link to="#">Category</Link>
                    <Link to="#">Genre</Link>
                    <Link to="#">Contact</Link>

                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-2.5 text-yellow-400"
                        />
                        <input
                            placeholder="Search movies..."
                            className="w-full bg-[#1A2238] border border-yellow-400 text-white pl-10 py-2 rounded-full outline-none"
                        />
                    </div>

                    <Link
                        to="/login"
                        className="block text-center bg-yellow-400 text-blue-900 py-2 rounded-full font-medium"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    )
}
