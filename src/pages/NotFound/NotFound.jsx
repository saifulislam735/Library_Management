const NotFound = () => {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
            <p className="mb-4">The page you’re looking for doesn’t exist.</p>
            <a
                href="/"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Go Home
            </a>
        </div>
    );
};

export default NotFound;