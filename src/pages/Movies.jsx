import { Link } from "react-router-dom";

const movies = [
  { id: "1", title: "Inception", poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", duration: "148 mins" },
  { id: "2", title: "Oppenheimer", poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", duration: "180 mins" },
  { id: "3", title: "The Dark Knight", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", duration: "152 mins" },
  { id: "4", title: "Interstellar", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", duration: "169 mins" },
  { id: "5", title: "Avengers Endgame", poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg", duration: "181 mins" },
  { id: "6", title: "Parasite", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", duration: "132 mins" },
  { id: "7", title: "Joker", poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", duration: "122 mins" },
  { id: "8", title: "Gladiator", poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", duration: "155 mins" },
  { id: "9", title: "The Shawshank Redemption", poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", duration: "142 mins" },
  { id: "10", title: "Titanic", poster: "https://image.tmdb.org/t/p/w500/kHXEpyfl6zqn8a6YuozZUujufXf.jpg", duration: "195 mins" },
  { id: "11", title: "Avatar", poster: "https://image.tmdb.org/t/p/w500/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg", duration: "162 mins" },
  { id: "12", title: "The Lion King", poster: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg", duration: "88 mins" },
  { id: "13", title: "Frozen II", poster: "https://image.tmdb.org/t/p/w500/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg", duration: "103 mins" },
  { id: "14", title: "Spider-Man: No Way Home", poster: "https://image.tmdb.org/t/p/w500/u0lVTc4C7e3UO8OWz9v4WfHnJHP.jpg", duration: "148 mins" },
  { id: "15", title: "Black Panther", poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg", duration: "134 mins" },
  { id: "16", title: "Harry Potter and the Sorcerer's Stone", poster: "https://image.tmdb.org/t/p/w500/6J5xVYk5MRi5QF3UeJKn7sZuhX1.jpg", duration: "152 mins" }
];

export default function Movies() {
  return (
    <div className="min-h-screen bg-[#202A44] text-yellow-300 p-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">Now Showing 🎬</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-[#1B2540] border border-yellow-500 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-[320px] w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-yellow-400">{movie.title}</h2>
              <p className="text-yellow-200 text-sm mt-1">⏱ {movie.duration}</p>

              <Link to={`/movie/${movie.id}`}>
                <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg font-semibold text-[#202A44]">
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
