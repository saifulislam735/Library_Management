import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your profile update logic here
    };

    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Your <span className="text-amber-400">Profile</span>
                </h2>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Profile Header */}
                    <div className="flex items-center mb-8">
                        <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="ml-6">
                            <h3 className="text-2xl font-semibold text-teal-900">{user?.username || "User"}</h3>
                            <p className="text-gray-600">{user?.role === "admin" ? "Administrator" : "User"}</p>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-teal-900 font-semibold mb-2">Username</label>
                            <input
                                type="text"
                                defaultValue={user?.username || ""}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                placeholder="Your Username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-teal-900 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                defaultValue={user?.email || ""}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-teal-900 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                placeholder="New Password (optional)"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;