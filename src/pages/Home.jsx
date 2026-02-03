import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white"
            style={{ backgroundColor: "#202A44" }}>

            {/* Subtle twinkling stars */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-yellow-300 rounded-full w-1 h-1 animate-pulse"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                ></div>
            ))}

            {/* Welcome Content */}
            <div className="text-center px-6">
                <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                    🌟 Welcome to CineStar 🌟
                </h1>
                <p className="text-gray-300 mb-8 text-lg">
                    Discover movies, book your tickets, and enjoy a magical cinematic experience!
                </p>
                <Link to="/movies">
                    <button className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition">
                        Explore Movies
                    </button>
                </Link>
            </div>

            {/* Optional small star icon */}
            <Star className="absolute bottom-10 right-10 w-6 h-6 text-yellow-300 animate-pulse" />
        </div>
    );
};

export default Home;
