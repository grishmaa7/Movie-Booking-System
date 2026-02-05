import { Link } from "react-router-dom";
import { MOVIES } from "../seedData";

export default function Movies() {
  return (
    <div className="min-h-screen bg-[#202A44] text-yellow-300 p-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">Now Showing 🎬</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOVIES.map((movie) => (
          <div
            key={movie.id}
            className="bg-[#202A44]/80 border border-yellow-500 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-[360px] w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-yellow-400">{movie.title}</h2>
              <p className="text-yellow-200 text-sm mt-1">⏱ {movie.duration} mins</p>

              <Link to={`/movie/${movie.id}`}>
                <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg font-semibold text-black">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
