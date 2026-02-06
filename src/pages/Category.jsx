import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MOVIES } from "../seed/seedData";

export default function Category() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState("");
    const [filteredMovies, setFilteredMovies] = useState(MOVIES);
    const [resetAnimation, setResetAnimation] = useState(false);

    const genres = [...new Set(MOVIES.flatMap(m => m.genre))];

    useEffect(() => {
        let movies = MOVIES;

        if (search) {
            movies = movies.filter(m =>
                m.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (genre) {
            movies = movies.filter(m => m.genre.includes(genre));
        }

        // Sorting logic
        if (sort === "ratingHigh") movies = movies.sort((a, b) => b.rating - a.rating);
        if (sort === "ratingLow") movies = movies.sort((a, b) => a.rating - b.rating);
        if (sort === "durationShort") movies = movies.sort((a, b) => a.duration - b.duration);
        if (sort === "durationLong") movies = movies.sort((a, b) => b.duration - a.duration);

        setFilteredMovies([...movies]);
    }, [search, genre, sort]);

    const resetFilters = () => {
        setSearch("");
        setGenre("");
        setSort("");
        setResetAnimation(true);
        setTimeout(() => setResetAnimation(false), 1500);
    };

    const goToMovieDetails = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="min-h-screen p-10 bg-[#202A44] text-white relative overflow-hidden">

            {/* Twinkling Stars */}
            <div className="absolute inset-0 -z-10">
                {[...Array(120)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-yellow-400 rounded-full opacity-70 animate-[pulse_2s_ease-in-out_infinite]"
                        style={{
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Shooting Star Animation */}
            {resetAnimation && (
                <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-0 left-0 animate-[shoot_1.5s_linear]"></div>
            )}

            <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
                Movie Categories ✨
            </h1>

            {/* Filters + Sorting */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 rounded-2xl border border-yellow-400 bg-[#1B2540] text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />

                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        className="px-4 py-2 rounded-2xl border border-yellow-400 bg-[#1B2540] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    >
                        <option value="">All Genres</option>
                        {genres.map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                        ))}
                    </select>

                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="px-4 py-2 rounded-2xl border border-yellow-400 bg-[#1B2540] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    >
                        <option value="">Sort By</option>
                        <option value="ratingHigh">⭐ Rating High → Low</option>
                        <option value="ratingLow">⭐ Rating Low → High</option>
                        <option value="durationShort">⏱ Duration Short → Long</option>
                        <option value="durationLong">⏱ Duration Long → Short</option>
                    </select>
                </div>

                <button
                    onClick={resetFilters}
                    className="w-full md:w-auto px-4 py-2 bg-yellow-400 text-[#202A44] font-bold rounded-2xl hover:bg-yellow-300 transition-all shadow-md"
                >
                    Reset Filters
                </button>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMovies.length === 0 ? (
                    <p className="text-yellow-300 col-span-full text-center">
                        No movies found.
                    </p>
                ) : (
                    filteredMovies.map(movie => (
                        <div
                            key={movie.id}
                            onClick={() => goToMovieDetails(movie.id)}
                            className="bg-[#1B2540] rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-yellow-400/50 cursor-pointer relative group"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-yellow-400">{movie.title}</h2>
                                <p className="text-yellow-200 mt-2 text-sm">
                                    {movie.synopsis.length > 120
                                        ? movie.synopsis.slice(0, 120) + "..."
                                        : movie.synopsis}
                                </p>
                            </div>

                            {/* Tooltip overlay */}
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col justify-center items-center text-yellow-400 p-4 text-center">
                                <p>⭐ Rating: {movie.rating}</p>
                                <p>⏱ Duration: {movie.duration} min</p>
                                <p>🎬 Genre: {movie.genre.join(", ")}</p>
                                <p className="mt-2 text-sm text-yellow-300">Click to see details</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Custom Animations */}
            <style>
                {`
          @keyframes shoot {
            0% { top: 0%; left: 0%; opacity: 1; transform: translate(0, 0) rotate(45deg); }
            100% { top: 100%; left: 100%; opacity: 0; transform: translate(500px, 500px) rotate(45deg); }
          }
        `}
            </style>
        </div>
    );
}
