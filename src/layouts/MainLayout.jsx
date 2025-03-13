import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const MainLayout = ({ user, logout }) => { // Pass user and logout from parent
    return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
            <Navbar user={user} logout={logout} />
            <main className="flex-grow container mx-auto p-4">
                <Outlet /> {/* This is where page content will render */}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;