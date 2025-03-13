import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, loading } = useContext(AuthContext);

    // Wait until loading is complete
    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    // Redirect if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect if admin access is required but user isn’t an admin
    if (requireAdmin && user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    // Render the protected content
    return children;
};

export default ProtectedRoute;