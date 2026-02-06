import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MOVIES, THEATRES } from "../seed/seedData";
import { ArrowLeft } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = MOVIES.find((m) => m.id === id);

  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!movie)
    return <p className="text-yellow-400 p-10">Movie not found 😭</p>;

  const handleBuyTickets = () => {
    if (!selectedTheatre || !selectedDate || !selectedTime) {
      alert("Please select theatre, date and time first!");
      return;
    }

    navigate("/booking", {
      state: {
        movieId: movie.id,
        theatre: selectedTheatre.name,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  const dates = ["13 Feb", "14 Feb", "15 Feb"];
  const times = ["10:00 AM", "1:30 PM", "5:00 PM"];

  return (
    <div className="relative min-h-screen bg-[#202A44] text-white p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* LEFT SIDE */}
      <div className="lg:col-span-2">
        <iframe
          src={movie.trailer}
          title={movie.title}
          allowFullScreen
          className="w-full h-[360px] rounded-xl border border-yellow-400"
        />

        <h1 className="text-3xl font-bold text-yellow-400 mt-6">
          {movie.title}
        </h1>

        <p className="text-yellow-200 mt-4 leading-relaxed text-lg">
          {movie.synopsis || movie.description}
        </p>

        <div className="flex gap-6 mt-4 text-yellow-300">
          <span>⭐ {movie.rating}</span>
          <span>⏱ {movie.duration} mins</span>
          <span>🎭 {movie.genre?.join(", ")}</span>
        </div>
      </div>

      {/* RIGHT SIDE – BOOKING PANEL */}
      <div className="bg-[#1B2540] border border-yellow-400 rounded-2xl p-6 flex flex-col justify-between h-[620px]">

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-5">
            Now Showing
          </h2>

          {/* THEATRE */}
          {!selectedTheatre && (
            <select
              className="w-full text-lg font-semibold bg-[#202A44] border border-yellow-400 rounded-xl px-5 py-3 mb-4 hover:bg-[#1E3250] transition"
              onChange={(e) =>
                setSelectedTheatre(
                  THEATRES.find((t) => t.name === e.target.value)
                )
              }
            >
              <option value="">Choose Theatre</option>
              {THEATRES.map((t, i) => (
                <option key={i} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          )}

          {/* DATE */}
          {selectedTheatre && (
            <>
              <p className="text-yellow-300 mb-2 font-medium">Choose Date</p>
              <div className="flex gap-3 mb-4">
                {dates.map((date) => (
                  <span
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-1 rounded-lg text-sm cursor-pointer border border-yellow-400 transition ${selectedDate === date
                      ? "bg-yellow-400 text-[#202A44] font-semibold"
                      : "text-yellow-200 hover:bg-yellow-600/30"
                      }`}
                  >
                    {date}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* TIME */}
          {selectedDate && (
            <>
              <p className="text-yellow-300 mb-2 font-medium">Choose Time</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {times.map((time) => (
                  <span
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-1 rounded-lg text-sm cursor-pointer border border-yellow-400 transition ${selectedTime === time
                      ? "bg-yellow-400 text-[#202A44] font-semibold"
                      : "text-yellow-200 hover:bg-yellow-600/30"
                      }`}
                  >
                    {time}
                  </span>
                ))}
              </div>

              <button
                className="text-sm text-yellow-400 underline hover:text-yellow-300"
                onClick={() => {
                  setSelectedTheatre(null);
                  setSelectedDate("");
                  setSelectedTime("");
                }}
              >
                Change Theatre
              </button>
            </>
          )}
        </div>

        {/* BUY BUTTON */}
        <button
          onClick={handleBuyTickets}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#202A44] font-bold py-3 rounded-2xl text-lg shadow-lg transition-all transform hover:scale-105"
        >
          Buy Tickets 🎟
        </button>
      </div>
    </div>
  );
}