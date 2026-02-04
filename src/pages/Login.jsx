import { useState } from "react"
import { Mail, Lock, Phone, Chrome } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function Login() {
    const navigate = useNavigate()
    const [mode, setMode] = useState("email") // email | phone

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()

        localStorage.setItem(
            "user",
            JSON.stringify(
                mode === "email"
                    ? { email }
                    : { phone }
            )
        )

        navigate("/")
    }

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email
                })
            )
            navigate("/")
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#202A44" }}>
            <div
                className="border p-8 rounded-2xl w-[360px] shadow-xl text-white"
                style={{ backgroundColor: "rgba(26,34,56,0.8)", borderColor: "#FACC15" }}
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
                    Welcome Back 🎬
                </h2>

                {/* LOGIN MODE SWITCH */}
                <div className="flex mb-6 bg-[#1A2238] rounded-full overflow-hidden border border-yellow-400">
                    <button
                        onClick={() => setMode("email")}
                        className={`flex-1 py-2 text-sm font-semibold ${mode === "email"
                                ? "bg-yellow-400 text-blue-900"
                                : "text-yellow-400"
                            }`}
                    >
                        Email
                    </button>
                    <button
                        onClick={() => setMode("phone")}
                        className={`flex-1 py-2 text-sm font-semibold ${mode === "phone"
                                ? "bg-yellow-400 text-blue-900"
                                : "text-yellow-400"
                            }`}
                    >
                        Phone
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleLogin} className="space-y-4">

                    {mode === "email" && (
                        <div className="relative">
                            <Mail className="absolute left-4 top-3 text-yellow-400" size={18} />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#1A2238] pl-11 py-2 rounded-lg border border-yellow-400"
                            />
                        </div>
                    )}

                    {mode === "phone" && (
                        <div className="relative">
                            <Phone className="absolute left-4 top-3 text-yellow-400" size={18} />
                            <input
                                type="tel"
                                placeholder="Phone number"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-[#1A2238] pl-11 py-2 rounded-lg border border-yellow-400"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Lock className="absolute left-4 top-3 text-yellow-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1A2238] pl-11 py-2 rounded-lg border border-yellow-400"
                        />
                    </div>

                    <button className="w-full bg-yellow-400 text-blue-900 py-2 rounded-lg font-semibold">
                        Login
                    </button>
                </form>

                <div className="text-center text-gray-400 my-4">or</div>

                {/* GOOGLE */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-yellow-400 py-2 rounded-lg hover:bg-yellow-400 hover:text-blue-900"
                >
                    <Chrome size={18} />
                    Continue with Google
                </button>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-yellow-400 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}
