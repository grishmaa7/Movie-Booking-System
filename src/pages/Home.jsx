import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
    "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    "https://image.tmdb.org/t/p/original/zsbolOkw8RhTU4DKOrpf4M7KCmi.jpg",
    "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
]

export default function Home() {
    const [index, setIndex] = useState(0)
    const [movies, setMovies] = useState([])

    // AUTO SLIDER
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 2500)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % heroImages.length)
    }

    const prevSlide = () => {
        setIndex((prev) =>
            prev === 0 ? heroImages.length - 1 : prev - 1
        )
    }

    // API CALL (ONLY ONCE)
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=80d491707d8cf7b38aa19c7ccab0952f")
            .then(res => res.json())
            .then(data => setMovies(data.results.slice(0, 8)))
    }, [])

    return (
        <div className="text-white" style={{ backgroundColor: "#202A44" }}>

            {/* HERO */}
            <section className="relative h-[80vh] flex items-center">
                <img
                    src={heroImages[index]}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 transition-all duration-700"
                />

                {/* LEFT CONTENT */}
                <div className="relative w-[85%] mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-xl">
                        Welcome to <br />
                        <span className="text-yellow-400">CineBook</span>
                    </h1>

                    <div className="flex gap-4">
                        <Link
                            to="/movies"
                            className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-6 py-3 rounded-full font-semibold transition"
                        >
                            Book Now
                        </Link>

                        <button className="border border-yellow-400 px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition">
                            See Location
                        </button>
                    </div>
                </div>

                {/* LEFT ARROW */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 bg-[#202A44]/70 p-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition"
                >
                    <ChevronLeft size={28} />
                </button>

                {/* RIGHT ARROW */}
                <button
                    onClick={nextSlide}
                    className="absolute right-6 bg-[#202A44]/70 p-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition"
                >
                    <ChevronRight size={28} />
                </button>
            </section>

            {/* MOVIE CARDS */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <h2 className="text-3xl font-bold mb-8 text-yellow-400">
                    Now Showing
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {movies.map(movie => (
                        <div
                            key={movie.id}
                            className="bg-[#1A2238] rounded-xl overflow-hidden hover:scale-105 transition"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                className="h-[260px] w-full object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold text-sm mb-1">
                                    {movie.title}
                                </h3>
                                <p className="text-gray-300 text-xs mb-3">
                                    Duration: {Math.round(movie.vote_average * 10)} mins
                                </p>

                                <Link
                                    to={`/movies/${movie.id}`}
                                    className="block text-center bg-yellow-400 text-blue-900 hover:bg-yellow-300 py-2 rounded-lg text-sm font-semibold transition"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}
