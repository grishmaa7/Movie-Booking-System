import { useParams } from "react-router-dom";
import { useState } from "react";
import { MOVIES, THEATRES } from "../seed/seedData";

export default function MovieDetails() {
  const { id } = useParams();
  const movie = MOVIES.find(m => m.id === id);
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  if (!movie) return <p className="text-yellow-400 p-10">Movie not found 😭</p>;

  return (
    <div className="min-h-screen bg-[#202A44] text-white p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT SIDE - TRAILER */}
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

      {/* RIGHT SIDE - NOW SHOWING BOX */}
      <div className="bg-[#1B2540] border border-yellow-400 rounded-2xl p-6 flex flex-col justify-between h-[600px]">

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-5">
            Now Showing
          </h2>

          {/* THEATRE SELECT */}
          {!selectedTheatre && (
            <select
              className="w-full text-lg font-semibold bg-[#202A44] border border-yellow-400 rounded-xl px-5 py-3 mb-4 hover:bg-[#1E3250] transition-all"
              onChange={e =>
                setSelectedTheatre(
                  THEATRES.find(t => t.name === e.target.value)
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

          {/* SELECTED THEATRE SHOWTIMES */}
          {selectedTheatre && (
            <div>
              <p className="text-yellow-300 mb-3 font-medium">
                {selectedTheatre.name} Showtimes
              </p>

              <div className="flex flex-wrap gap-3 mb-4">
                {["10:00 AM", "1:30 PM", "5:00 PM"].map((time, i) => (
                  <span
                    key={i}
                    className="border border-yellow-400 px-4 py-1 rounded-lg text-sm text-yellow-200"
                  >
                    {time}
                  </span>
                ))}
              </div>

              <button
                className="text-sm text-yellow-400 underline hover:text-yellow-300"
                onClick={() => setSelectedTheatre(null)}
              >
                Change Theatre
              </button>
            </div>
          )}
        </div>

        {/* BUY TICKETS BUTTON */}
        <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#202A44] font-bold py-3 rounded-2xl text-lg shadow-lg transition-all transform hover:scale-105">
          Buy Tickets 🎟
        </button>

      </div>
    </div>
  );
}
