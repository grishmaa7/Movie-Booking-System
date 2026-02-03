import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User } from "lucide-react"

export default function Register() {
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        const user = {
            name: "NewUser",
            role: "user"
        }

        localStorage.setItem("user", JSON.stringify(user))

        // after register → login/dashboard
        navigate("/")
        window.location.reload()
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#202A44" }}
        >
            <div
                className="border p-8 rounded-2xl w-[360px] shadow-xl text-white"
                style={{ backgroundColor: "rgba(26,34,56,0.8)", borderColor: "#FACC15" }}
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
                    Create Account 🎥
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">

                    <div className="relative">
                        <User className="absolute left-3 top-3 text-yellow-400" size={18} />
                        <input
                            placeholder="Username"
                            className="w-full bg-[#1A2238] border border-yellow-400 py-2 pl-10 pr-4 rounded-lg outline-none text-white placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-yellow-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-[#1A2238] border border-yellow-400 py-2 pl-10 pr-4 rounded-lg outline-none text-white placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-yellow-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-[#1A2238] border border-yellow-400 py-2 pl-10 pr-4 rounded-lg outline-none text-white placeholder-gray-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-300 py-2 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-yellow-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
