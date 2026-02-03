import { useState } from "react"
import { Mail, Lock, Chrome } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"  // adjust path
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                localStorage.setItem("user", JSON.stringify({
                    name: user.displayName,
                    email: user.email
                }))
                navigate("/")
            })
            .catch((error) => {
                console.error(error)
                alert("Google login failed. Try again!")
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (!email || !password) return alert("Please enter both email and password")
        // For now, store dummy login
        const user = { name: "User", email }
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/")
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#202A44" }}>
            <div className="border p-8 rounded-2xl w-[360px] shadow-xl text-white" style={{ backgroundColor: "rgba(26,34,56,0.8)", borderColor: "#FACC15" }}>
                <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">Welcome Back 🎬</h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3 text-yellow-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-[#1A2238] text-white placeholder-gray-400 pl-11 py-2 rounded-lg outline-none border border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-3 text-yellow-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[#1A2238] text-white placeholder-gray-400 pl-11 py-2 rounded-lg outline-none border border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-300 py-2 rounded-lg font-semibold transition">Login</button>
                </form>

                <div className="text-center text-gray-400 my-4">or</div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-yellow-400 py-2 rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition"
                >
                    <Chrome size={18} />
                    Continue with Google
                </button>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-yellow-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}
