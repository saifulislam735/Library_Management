import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllBooks from "../pages/AllBooks/AllBooks";
import Contact from "../pages/Contact/Contact";
import Privacy from "../pages/Privacy/Privacy";
import Profile from "../pages/Profile/Profile";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashoard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import FileManagement from "../pages/Dashoard/FileManagement/FileManagement";
import ViewFile from "../pages/Dashoard/ViewFile/ViewFile";

const Router = () => {
  const { user, logout } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout user={user} logout={logout} />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "all-books", element: <AllBooks /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "privacy", element: <Privacy /> },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "file-management",
          element: (
            <ProtectedRoute requireAdmin>
              <FileManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "view-file",
          element: (
            <ProtectedRoute>
              <ViewFile />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;