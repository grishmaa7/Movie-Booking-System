import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SeatMap from "../Components/SeatMap";
import { MOVIES } from "../seed/seedData";
import { ArrowLeft } from "lucide-react";

const TICKET_PRICE = 350; // per seat

export default function BookingSystem() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, theatre, time, date } = location.state || {};
  const movie = MOVIES.find((m) => m.id === movieId);

  const [stars, setStars] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const starArray = [];
    for (let i = 0; i < 150; i++) {
      starArray.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 5 + 3,
      });
    }
    setStars(starArray);
  }, []);

  if (!movie || !theatre || !time || !date) {
    return (
      <p className="text-yellow-400 p-10">
        Booking data missing. Please select a movie and showtime first.
      </p>
    );
  }

  const totalPrice = selectedSeats.length * TICKET_PRICE;

  return (
    <div className="relative min-h-screen bg-[#202A44] overflow-hidden p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(`/movie/${movieId}`)}
        className="relative z-20 mb-4 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
      >
        <ArrowLeft size={18} />
        Back to Movie
      </button>

      {/* STARRY BACKGROUND */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute bg-yellow-400 rounded-full"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s infinite alternate`,
          }}
        />
      ))}

      {[...Array(3)].map((_, i) => (
        <span key={i} className="shooting-star"></span>
      ))}

      {/* MAIN LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* LEFT – MOVIE INFO */}
        <div className="lg:w-1/4 bg-[#1B2540]/90 border border-yellow-400 rounded-2xl p-5 flex flex-col gap-5">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-xl shadow-lg"
          />

          <h1 className="text-xl font-bold text-yellow-400 text-center">
            {movie.title}
          </h1>

          <div className="text-yellow-200 text-sm space-y-1">
            <p>🏛 {theatre}</p>
            <p>📅 {date}</p>
            <p>⏰ {time}</p>
            <p>🎟 Rs. {TICKET_PRICE} / seat</p>
          </div>

          <div className="border-t border-yellow-400 pt-3 text-yellow-200 text-sm">
            <p>
             
              <span className="text-yellow-400 font-semibold">
                {selectedSeats.length > 0
                  ? selectedSeats.join(", ")
                  : ""}
              </span>
            </p>

            <p className="mt-1">
              
              <span className="text-yellow-400 font-bold">
                
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT – SEAT MAP */}
        <div className="lg:w-3/4 bg-[#1B2540]/80 border border-yellow-400 rounded-2xl p-6">
          <h2 className="text-2xl text-yellow-400 font-semibold mb-4">
            Select Your Seats
          </h2>

          <SeatMap
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        </div>
      </div>

      {/* CSS */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
            100% { opacity: 0.2; transform: scale(1); }
          }

          .shooting-star {
            position: absolute;
            top: 10%;
            left: -10%;
            width: 3px;
            height: 80px;
            background: linear-gradient(45deg, yellow, transparent);
            transform: rotate(45deg);
            animation: shoot 2s infinite;
          }

          @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
            100% { transform: translateX(120vw) translateY(80vh) rotate(45deg); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
