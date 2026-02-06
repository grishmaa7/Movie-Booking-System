import React from "react"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-[#0b132b] text-[#e5e7eb] border-t border-yellow-400/30 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">

        {/* Logo + Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-yellow-400 font-bold text-2xl">
            <Star />
            CineBook
          </div>
          <p className="text-blue-100/70 max-w-sm">
            Discover the latest movies, book tickets, and stay updated with CineBook.
            Your ultimate cinema companion.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-yellow-400 font-semibold">Navigation</h3>
          <div className="flex flex-col gap-2 text-blue-100/80">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <Link to="/movies" className="hover:text-yellow-400">Movies</Link>
            <Link to="/category" className="hover:text-yellow-400">Category</Link>
            <Link to="/genre" className="hover:text-yellow-400">Genre</Link>
            <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
          </div>
        </div>

        {/* Info Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-yellow-400 font-semibold">Info</h3>
          <div className="flex flex-col gap-2 text-blue-100/80">
            <Link to="/faqs" className="hover:text-yellow-400">FAQs</Link>
            <Link to="/terms" className="hover:text-yellow-400">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-blue-100/50 text-sm">
        &copy; {new Date().getFullYear()} CineBook. All rights reserved.
      </div>
    </footer>
  )
}
