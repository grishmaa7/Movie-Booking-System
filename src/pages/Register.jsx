import React from 'react'
import { Mail, Lock, Chrome } from "lucide-react"
import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 flex items-center justify-center">

            <div className="bg-white/80 backdrop-blur-md border border-pink-200 p-8 rounded-2xl w-[360px] shadow-xl text-pink-900">

                <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
                    Welcome Back 🎬💖
                </h2>

                <form className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3 text-pink-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-pink-100 text-pink-800 placeholder-pink-400 pl-11 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-3 text-pink-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-pink-100 text-pink-800 placeholder-pink-400 pl-11 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition">
                        Login 💕
                    </button>
                </form>

                <div className="text-center text-pink-400 my-4">or</div>

                <button className="w-full flex items-center justify-center gap-3 border border-pink-300 py-2 rounded-lg hover:bg-pink-100 transition">
                    <Chrome size={18} />
                    Continue with Google
                </button>

                <p className="text-center text-pink-500 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-pink-700 hover:underline font-medium">
                        Register 🎀
                    </Link>
                </p>
            </div>
        </div>
    )
}
