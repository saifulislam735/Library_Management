import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            username: formData.get("username"),
            role: "user", // Replace with actual role from your backend
        };
        // Simulate login (replace with your API call)
        login(userData);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
                <h2 className="text-4xl font-bold text-teal-900 mb-8 text-center">
                    Welcome <span className="text-amber-400">Back</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-teal-900 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-teal-900 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-amber-400 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;