import { useState, useEffect } from "react";
import { Armchair, X } from "lucide-react";

const ROWS = 8;
const COLS = 12;
const SEAT_PRICE = 350;

export default function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [stars, setStars] = useState([]);
  const [showBuyBox, setShowBuyBox] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const reservedSeats = ["A3", "B5", "C7", "D2"];

  useEffect(() => {
    const starArray = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 5 + 3,
    }));
    setStars(starArray);
  }, []);

  const toggleSeat = (seatId) => {
    if (
      reservedSeats.includes(seatId) ||
      bookedSeats.includes(seatId)
    )
      return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBuyTickets = () => {
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
    setShowBuyBox(false);
    setShowThankYou(true);

    setTimeout(() => setShowThankYou(false), 4000);
  };

  return (
    <div className="relative min-h-[700px] bg-[#202A44] flex flex-col items-center overflow-hidden p-10">

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

      <span className="shooting-star"></span>

      {/* SCREEN */}
      <div className="w-full max-w-[820px] h-10 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-t-full mb-10 shadow-xl flex items-center justify-center tracking-[0.4em] font-bold text-[#202A44]">
        SCREEN
      </div>

      {/* SEAT MAP */}
      <div className="flex gap-4 z-10">
        {/* ROW LABELS */}
        <div className="flex flex-col gap-4 mt-1">
          {Array.from({ length: ROWS }).map((_, i) => (
            <span
              key={i}
              className="text-yellow-400 font-semibold h-[34px] flex items-center"
            >
              {String.fromCharCode(65 + i)}
            </span>
          ))}
        </div>

        {/* SEATS */}
        <div className="grid grid-cols-12 gap-4">
          {Array.from({ length: ROWS }).map((_, rowIdx) => {
            const rowLetter = String.fromCharCode(65 + rowIdx);
            return Array.from({ length: COLS }).map((_, colIdx) => {
              const seatId = `${rowLetter}${colIdx + 1}`;
              const isSelected = selectedSeats.includes(seatId);
              const isReserved = reservedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);

              return (
                <div
                  key={seatId}
                  onClick={() => toggleSeat(seatId)}
                  className={`transition-all
                    ${isReserved || isBooked
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:scale-110"
                    }
                  `}
                >
                  <Armchair
                    size={28}
                    className={
                      isBooked
                        ? "text-gray-500"
                        : isReserved
                          ? "text-red-500"
                          : isSelected
                            ? "text-yellow-400 animate-seat-glow"
                            : "text-yellow-200"
                    }
                    fill={isSelected ? "#FACC15" : "transparent"}
                  />
                </div>
              );
            });
          })}
        </div>
      </div>

      {/* CONFIRM SEATS */}
      <button
        disabled={selectedSeats.length === 0}
        onClick={() => setShowBuyBox(true)}
        className={`mt-10 px-12 py-3 rounded-2xl font-bold text-[#202A44] text-lg transition-all
          ${selectedSeats.length > 0
            ? "bg-yellow-400 hover:bg-yellow-300 animate-glow-button"
            : "bg-yellow-200 cursor-not-allowed"
          }
        `}
      >
        Confirm Seats ✨
      </button>

      {/* BUY MODAL */}
      {showBuyBox && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1A2238] border border-yellow-400 rounded-2xl p-6 w-[320px] text-center animate-scaleUp relative">
            <button
              onClick={() => setShowBuyBox(false)}
              className="absolute top-3 right-3 text-yellow-400"
            >
              <X />
            </button>

            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              Buy Tickets 🎟
            </h3>

            <p className="text-yellow-200 text-sm mb-2">
              Seats:{" "}
              <span className="text-yellow-400">
                {selectedSeats.join(", ")}
              </span>
            </p>

            <p className="text-yellow-200 mb-4">
              Total:{" "}
              <span className="text-yellow-400 font-bold">
                Rs. {selectedSeats.length * SEAT_PRICE}
              </span>
            </p>

            <button
              onClick={handleBuyTickets}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#202A44] font-bold py-2 rounded-xl"
            >
              Buy Tickets ✨
            </button>
          </div>
        </div>
      )}

      {/* THANK YOU */}
      {showThankYou && (
        <div className="absolute bottom-10 right-10 bg-[#1A2238]/90 border border-yellow-400 rounded-2xl px-6 py-4 animate-scaleUp">
          <p className="text-2xl text-yellow-400 font-bold">
            Thank You ✨
          </p>
          <p className="text-yellow-200 text-sm">
            Enjoy your movie 🍿
          </p>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }

          .shooting-star {
            position: absolute;
            top: 10%;
            left: -20%;
            width: 3px;
            height: 120px;
            background: linear-gradient(45deg, #FACC15, transparent);
            animation: shoot 2.5s infinite;
          }

          @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(45deg); }
            100% { transform: translateX(140vw) translateY(90vh) rotate(45deg); }
          }

          @keyframes seatGlow {
            0% { filter: drop-shadow(0 0 2px #FACC15); }
            50% { filter: drop-shadow(0 0 12px #FACC15); }
            100% { filter: drop-shadow(0 0 4px #FACC15); }
          }

          .animate-seat-glow {
            animation: seatGlow 0.9s infinite;
          }

          @keyframes glowButton {
            from { box-shadow: 0 0 10px #FACC15; }
            to { box-shadow: 0 0 25px #FACC15; }
          }

          .animate-glow-button {
            animation: glowButton 1s infinite alternate;
          }

          @keyframes scaleUp {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .animate-scaleUp {
            animation: scaleUp 0.4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
