import { useState } from "react";
import { Mail, Lock, Phone, Chrome } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("email");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const user = {
      name: "Demo User",
      avatar: "https://i.ibb.co/KwBvfjJ/kuromi.png",
      provider: loginType,
    };

    Cookies.set("authToken", "demo-token", { expires: 7 });
    Cookies.set("user", JSON.stringify(user), { expires: 7 });

    navigate("/");
    window.location.reload();
  };

  const handleGoogleLogin = () => {
    const user = {
      name: "Google User",
      avatar: "https://i.ibb.co/KwBvfjJ/kuromi.png",
      provider: "google",
    };

    Cookies.set("authToken", "google-token", { expires: 7 });
    Cookies.set("user", JSON.stringify(user), { expires: 7 });

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-[#202A44] flex items-center justify-center overflow-hidden">
      {/* STAR BACKGROUND */}
      {[...Array(50)].map((_, i) => (
        <span
          key={i}
          className="absolute bg-yellow-400 rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
          }}
        />
      ))}

      <div className="relative z-10 bg-[#1A2238]/90 border border-yellow-400 p-8 rounded-2xl w-[360px] shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-2 text-yellow-400">
          Welcome Back 🎬
        </h2>
        <p className="text-center text-sm text-yellow-200 mb-6">
          Sign in to continue your CineBook journey ✨
        </p>

        {/* LOGIN TYPE */}
        <div className="flex mb-4 bg-[#202A44] rounded-lg overflow-hidden border border-yellow-400">
          <button
            onClick={() => setLoginType("email")}
            className={`w-1/2 py-2 ${
              loginType === "email" ? "bg-yellow-400 text-[#202A44]" : "text-yellow-400"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginType("phone")}
            className={`w-1/2 py-2 ${
              loginType === "phone" ? "bg-yellow-400 text-[#202A44]" : "text-yellow-400"
            }`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {loginType === "email" ? (
            <div className="relative">
              <Mail className="absolute left-4 top-3 text-yellow-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#202A44] pl-11 py-2 rounded-lg border border-yellow-400 outline-none text-yellow-100 placeholder-yellow-200"
                required
              />
            </div>
          ) : (
            <div className="relative">
              <Phone className="absolute left-4 top-3 text-yellow-400" size={18} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#202A44] pl-11 py-2 rounded-lg border border-yellow-400 outline-none text-yellow-100 placeholder-yellow-200"
                required
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-3 text-yellow-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#202A44] pl-11 py-2 rounded-lg border border-yellow-400 outline-none text-yellow-100 placeholder-yellow-200"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#202A44] py-2 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <div className="text-center text-yellow-200 my-4">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-yellow-400 py-2 rounded-lg hover:bg-yellow-300 hover:text-[#202A44]"
        >
          <Chrome size={18} />
          Continue with Google
        </button>

        <p className="text-center text-yellow-200 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
