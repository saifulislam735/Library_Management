import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const { login } = useContext(AuthContext); // Using login to set user after registration
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            username: formData.get("username"),
            email: formData.get("email"),
            role: "user", // Replace with actual role from your backend
        };
        // Simulate registration (replace with your API call)
        login(userData); // Assuming registration auto-logs the user in
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
                <h2 className="text-4xl font-bold text-teal-900 mb-8 text-center">
                    Join <span className="text-amber-400">LibraryHub</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-teal-900 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200"
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-teal-900 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-teal-900 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200"
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-teal-900 font-semibold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-amber-400 text-teal-900 py-3 rounded-lg hover:bg-amber-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-teal-600 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;