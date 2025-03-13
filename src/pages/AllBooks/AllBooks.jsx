import { useState } from "react";

const AllBooks = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const dummyItems = [
        { id: 1, title: "The Great Gatsby", type: "Book", category: "Fiction", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 2, title: "Project Plan.pdf", type: "File", category: "Documents", img: "https://via.placeholder.com/150x200?text=PDF" },
        { id: 3, title: "To Kill a Mockingbird", type: "Book", category: "Fiction", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 4, title: "Notes.docx", type: "File", category: "Documents", img: "https://via.placeholder.com/150x200?text=Doc" },
        { id: 5, title: "1984", type: "Book", category: "Dystopia", img: "https://via.placeholder.com/150x200?text=Book" },
        { id: 6, title: "Report.xlsx", type: "File", category: "Spreadsheets", img: "https://via.placeholder.com/150x200?text=Excel" },
    ];

    const filteredItems = dummyItems.filter(
        (item) =>
            (category === "All" || item.category === category) &&
            item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    All Books & Files
                </h2>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    >
                        <option value="All">All Categories</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Dystopia">Dystopia</option>
                        <option value="Documents">Documents</option>
                        <option value="Spreadsheets">Spreadsheets</option>
                    </select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
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
                                    <h3 className="text-xl font-semibold text-teal-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{item.type} - {item.category}</p>
                                    <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">No items found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllBooks;