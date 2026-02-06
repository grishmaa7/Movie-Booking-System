import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const user = {
            name: "NewUser",
            role: "user",
        };

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        window.location.reload();
    };

    const [stars, setStars] = useState([]);
    useEffect(() => {
        const starArray = [];
        for (let i = 0; i < 100; i++) {
            starArray.push({
                id: i,
                top: Math.random() * 100,
                left: Math.random() * 100,
                size: Math.random() * 2 + 1,
                duration: Math.random() * 5 + 3,
            });
        }
        setStars(starArray);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#202A44] flex items-center justify-center overflow-hidden">
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

            {/* SHOOTING STAR */}
            <span className="shooting-star"></span>

            {/* REGISTER FORM */}
            <div className="relative z-10 bg-[#1A2238]/90 border border-yellow-400 p-8 rounded-2xl w-[360px] shadow-xl text-white">
                <h2 className="text-3xl font-bold text-center mb-2 text-yellow-400">
                    Create Account
                </h2>
                <p className="text-center text-sm text-yellow-200 mb-6">
                    Join CineBook and start your cinematic adventure ✨
                </p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-4 top-3 text-yellow-400" size={18} />
                        <input
                            placeholder="Username"
                            className="w-full bg-[#202A44] pl-11 py-2 rounded-lg border border-yellow-400 outline-none text-yellow-100 placeholder-yellow-200"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-3 text-yellow-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-[#202A44] pl-11 py-2 rounded-lg border border-yellow-400 outline-none text-yellow-100 placeholder-yellow-200"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-3 text-yellow-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-[#202A44] pl-11 py-2 rounded-lg border border-yellow-400 outline-none text-yellow-100 placeholder-yellow-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#202A44] py-2 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-yellow-200 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-yellow-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* ANIMATIONS CSS */}
            <style>
                {`
          @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(1);}
            50% { opacity: 1; transform: scale(1.3);}
            100% { opacity: 0.2; transform: scale(1);}
          }
          .shooting-star {
            position: absolute;
            top: 10%;
            left: -10%;
            width: 3px;
            height: 80px;
            background: linear-gradient(45deg, yellow, transparent);
            transform: rotate(45deg);
            animation: shoot 2s infinite;
            border-radius: 50%;
          }
          @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
            100% { transform: translateX(120vw) translateY(80vh) rotate(45deg); opacity: 0; }
          }
        `}
            </style>
        </div>
    );
}
