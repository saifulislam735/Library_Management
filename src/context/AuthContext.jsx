import { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null means not logged in
    const [loading, setLoading] = useState(true); // For initial auth check

    // Simulate checking auth state on mount (replace with your auth logic)
    useEffect(() => {
        // Example: Check if user is stored in localStorage or fetch from backend
        const storedUser = JSON.parse(localStorage.getItem("user")); // Replace with your logic
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Replace with your custom login logic (e.g., API call)
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Optional persistence
    };

    const logout = () => {
        // Replace with your custom logout logic
        setUser(null);
        localStorage.removeItem("user"); // Optional cleanup
    };

    // Provide auth state and methods to children
    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};