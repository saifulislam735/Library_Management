const Dashboard = () => {
    const dummyFiles = [
        { id: 1, title: "The Great Gatsby", type: "Book", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 2, title: "Project Plan.pdf", type: "File", img: "https://via.placeholder.com/150x200?text=PDF" },
        { id: 3, title: "To Kill a Mockingbird", type: "Book", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 4, title: "Notes.docx", type: "File", img: "https://via.placeholder.com/150x200?text=Doc" },
    ];

    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto">
                {/* Welcome Banner */}
                <section className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800 text-white py-12 px-6 rounded-2xl shadow-lg mb-12">
                    <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-lg font-light max-w-2xl">
                        Your personal library awaits. Explore, download, and manage your files with ease.
                    </p>
                </section>

                {/* Files Grid */}
                <h3 className="text-3xl font-bold text-teal-900 mb-8">Your Files</h3>
                {dummyFiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {dummyFiles.map((file) => (
                            <div
                                key={file.id}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                            >
                                <img
                                    src={file.img}
                                    alt={file.title}
                                    className="w-full h-56 object-cover rounded-t-2xl"
                                />
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold text-teal-900 mb-2">{file.title}</h4>
                                    <p className="text-sm text-gray-600 mb-4">{file.type}</p>
                                    <button className="w-full bg-amber-400 text-teal-900 py-2 rounded-lg hover:bg-amber-500 transition-colors duration-200 shadow-md">
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">No files available yet. Start by uploading some!</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;