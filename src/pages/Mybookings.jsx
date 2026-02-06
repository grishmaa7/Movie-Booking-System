import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { MOVIES } from "../seed/seedData";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myBookings") || "[]");
    setBookings(stored);
  }, []);

  const handleCancelBooking = (index) => {
    const updated = [...bookings];
    updated.splice(index, 1);
    setBookings(updated);
    localStorage.setItem("myBookings", JSON.stringify(updated));
  };

  if (!bookings.length) return <p className="text-yellow-400 p-10">No bookings yet 🎬</p>;

  return (
    <div className="min-h-screen bg-[#202A44] text-white p-10 space-y-6">
      <h1 className="text-3xl text-yellow-400 font-bold mb-6">My Bookings</h1>
      {bookings.map((b, i) => {
        const movie = MOVIES.find(m => m.id === b.movieId);
        return (
          <div key={i} className="bg-[#1B2540]/80 border border-yellow-400 rounded-2xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={movie?.poster} alt={movie?.title} className="w-20 rounded-lg" />
              <div>
                <h2 className="text-yellow-400 font-bold">{movie?.title}</h2>
                <p className="text-yellow-200 text-sm">Theatre: {b.theatre}</p>
                <p className="text-yellow-200 text-sm">Date: {b.date}</p>
                <p className="text-yellow-200 text-sm">Time: {b.time}</p>
                <p className="text-yellow-200 text-sm">Seats: {b.seats.join(", ")}</p>
                <p className="text-yellow-200 text-sm font-bold">Total: Rs. {b.totalPrice}</p>
              </div>
            </div>
            <button onClick={() => handleCancelBooking(i)} className="text-red-500 hover:text-red-400">
              <X />
            </button>
          </div>
        );
      })}
    </div>
  );
}
