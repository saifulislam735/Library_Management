import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ user, logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800 text-white py-4 px-6 shadow-xl sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink to="/" className="text-3xl font-extrabold tracking-wide flex items-center">
                    <span className="text-amber-400">Library</span>
                    <span className="text-white">Hub</span>
                </NavLink>
                <div className="flex items-center space-x-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-amber-400 text-teal-900" : "hover:bg-teal-700 hover:text-amber-300"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/all-books"
                        className={({ isActive }) =>
                            `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-amber-400 text-teal-900" : "hover:bg-teal-700 hover:text-amber-300"
                            }`
                        }
                    >
                        All Books
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-amber-400 text-teal-900" : "hover:bg-teal-700 hover:text-amber-300"
                            }`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-amber-400 text-teal-900" : "hover:bg-teal-700 hover:text-amber-300"
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                    {!user && (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-amber-400 text-teal-900" : "hover:bg-teal-700 hover:text-amber-300"
                                }`
                            }
                        >
                            Login
                        </NavLink>
                    )}
                    {user && (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-teal-700 transition-all duration-300">
                                <span className="text-sm font-medium">{user.username || "User"}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-56 bg-teal-900 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
                                <NavLink
                                    to="/dashboard"
                                    className="block px-4 py-3 text-sm hover:bg-teal-800 hover:text-amber-300 rounded-t-lg"
                                >
                                    Dashboard
                                </NavLink>
                                {user.role === "admin" && (
                                    <NavLink
                                        to="/file-management"
                                        className="block px-4 py-3 text-sm hover:bg-teal-800 hover:text-amber-300"
                                    >
                                        File Management
                                    </NavLink>
                                )}
                                <NavLink
                                    to="/profile"
                                    className="block px-4 py-3 text-sm hover:bg-teal-800 hover:text-amber-300"
                                >
                                    Profile
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-3 text-sm hover:bg-teal-800 hover:text-amber-300 rounded-b-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;