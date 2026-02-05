import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { MOVIES } from "../seedData"; // fetch from seedData

export default function Home() {
    const [heroIndex, setHeroIndex] = useState(0);

    // top 3 movies for carousel
    const heroMovies = MOVIES.slice(0, 3);
    const heroMovie = heroMovies[heroIndex];

    // auto carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroMovies.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroMovies.length]);

    const nextSlide = () =>
        setHeroIndex((heroIndex + 1) % heroMovies.length);
    const prevSlide = () =>
        setHeroIndex((heroIndex - 1 + heroMovies.length) % heroMovies.length);

    return (
        <div className="bg-[#202A44] text-yellow-300 min-h-screen">
            {/* HERO CAROUSEL */}
            {heroMovie && (
                <div className="relative h-[75vh]">
                    <img
                        src={heroMovie.poster}
                        alt={heroMovie.title}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#202A44] to-transparent" />

                    <div className="relative h-full flex items-center max-w-[85%] mx-auto px-6">
                        <div>
                            <h1 className="text-5xl font-bold mb-3">{heroMovie.title}</h1>

                            <p className="text-sm mb-2">
                                {heroMovie.release_date} • {heroMovie.duration} mins
                            </p>

                            <div className="flex items-center gap-2 mb-3 text-yellow-400">
                                <Star size={20} fill="currentColor" />
                                <span className="text-yellow-300 font-semibold">
                                    {heroMovie.rating.toFixed(1)}
                                </span>
                            </div>

                            <p className="mb-6">{heroMovie.synopsis}</p>
                        </div>
                    </div>

                    {/* ARROWS */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* DOTS */}
                    <div className="absolute bottom-6 w-full flex justify-center gap-3">
                        {heroMovies.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setHeroIndex(i)}
                                className={`w-3 h-3 rounded-full transition cursor-pointer ${i === heroIndex ? "bg-yellow-500" : "bg-yellow-300/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* NOW SHOWING */}
            <div className="px-10 py-14">
                <h2 className="text-3xl font-bold mb-6">Now Showing 🎬</h2>
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
                                <h3 className="text-lg font-semibold">{movie.title}</h3>
                                <p className="text-sm text-yellow-200 mt-1">
                                    ⏱ {movie.duration} mins
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* BUY TICKETS BUTTON BELOW BOX */}
                <div className="mt-6 flex justify-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 py-3 px-8 rounded-lg font-bold text-black text-lg">
                        Buy Tickets
                    </button>
                </div>
            </div>
        </div>
    );
}
