const Home = () => {
    const dummyItems = [
        { id: 1, title: "The Great Gatsby", type: "Book", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 2, title: "Project Plan.pdf", type: "File", img: "https://via.placeholder.com/150x200?text=PDF" },
        { id: 3, title: "To Kill a Mockingbird", type: "Book", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 4, title: "Notes.docx", type: "File", img: "https://via.placeholder.com/150x200?text=Doc" },
        { id: 5, title: "1984", type: "Book", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 6, title: "Report.xlsx", type: "File", img: "https://via.placeholder.com/150x200?text=Excel" },
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800 text-white py-24 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                        Welcome to <span className="text-amber-400">LibraryHub</span>
                    </h1>
                    <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-light">
                        Curate, explore, and manage your digital library with unparalleled style and simplicity.
                    </p>
                    <a
                        href="/dashboard"
                        className="inline-block bg-amber-400 text-teal-900 px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-amber-500 hover:scale-105 transition-all duration-300"
                    >
                        Start Exploring
                    </a>
                </div>
                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-50 rounded-t-[100%]"></div>
            </section>

            {/* Featured Items Section */}
            <section className="container mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Our Collection
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {dummyItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-56 object-cover rounded-t-2xl"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-teal-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">{item.type}</p>
                                <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;