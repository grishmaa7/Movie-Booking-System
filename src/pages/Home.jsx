import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { MOVIES } from "../seed/seedData";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [heroIndex, setHeroIndex] = useState(0);
    const heroMovies = MOVIES.slice(0, 3);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroMovies.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [heroMovies.length]);

    const nextSlide = () => setHeroIndex((heroIndex + 1) % heroMovies.length);
    const prevSlide = () =>
        setHeroIndex((heroIndex - 1 + heroMovies.length) % heroMovies.length);

    return (
        <div className="relative bg-[#202A44] min-h-screen text-yellow-300 overflow-hidden">

            {/* Shooting stars container */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => {
                    const delay = Math.random() * 10;
                    const top = Math.random() * 100;
                    const left = Math.random() * 100;
                    const duration = 1.5 + Math.random() * 2;
                    const size = 1 + Math.random() * 1.5;
                    return (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                boxShadow: `0 0 ${size * 2}px ${size / 2}px white`,
                                transform: "rotate(45deg)",
                                animation: `shoot-${i} ${duration}s linear ${delay}s infinite`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Hero Banner */}
            <div className="relative h-[60vh] flex flex-col items-center justify-end overflow-hidden rounded-b-3xl">
                <img
                    src={heroMovies[heroIndex].poster}
                    alt={heroMovies[heroIndex].title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202A44] to-transparent" />

                <div className="relative z-10 text-center px-4 mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">
                        Welcome to CineBook ✨
                    </h1>
                    <p className="text-lg md:text-xl text-yellow-200">
                        Your ultimate cinematic experience under the stars
                    </p>
                </div>

                {/* Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            {/* Now Showing */}
            <div className="px-10 py-14 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
                    Now Showing✨
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOVIES.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="bg-[#202A44]/80 border border-yellow-500 rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition-transform relative group"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="h-[360px] w-full object-cover group-hover:opacity-90 transition"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{movie.title}</h3>
                                <p className="text-sm text-yellow-200 mt-1">
                                    ⏱ {movie.duration} mins
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-yellow-300">{movie.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Shooting stars animation */}
            <style>
                {`
          ${Array.from({ length: 30 }).map(
                    (_, i) => `
            @keyframes shoot-${i} {
              0% { transform: translate(0,0) rotate(45deg); opacity: 0; }
              10% { opacity: 1; }
              100% { transform: translate(${100 + Math.random() * 200}px, ${100 + Math.random() * 200}px) rotate(45deg); opacity: 0; }
            }
          `
                ).join("")}
        `}
            </style>
        </div>
    );
}
