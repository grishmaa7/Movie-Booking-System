import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4" style={{ backgroundColor: "#FACC15" }}>
            <h1 className="font-bold text-xl" style={{ color: "#202A44" }}>CineBook</h1>
            <div className="space-x-6">
                <Link to="/" className="font-semibold" style={{ color: "#202A44" }}>
                    Home
                </Link>
                <Link to="/login" className="font-semibold" style={{ color: "#202A44" }}>
                    Login
                </Link>
                <Link to="/register" className="font-semibold" style={{ color: "#202A44" }}>
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
