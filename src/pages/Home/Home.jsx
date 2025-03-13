import { useState } from "react";
import useFetchFiles from "../../hooks/useFetchFiles";
import useDownloadFile from "../../hooks/useDownloadFile";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import StatsCard from "../../components/StatsCard";
import CTABanner from "../../components/CTABanner";
import ShowFile from "../../components/ShowFile";
import BookCard from "../../components/BookCard";
import FeaturedCarousel from "../../components/FeaturedCarousel";

const Home = () => {
    const { items, loading } = useFetchFiles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCategory, setFilterCategory] = useState("");
    const itemsPerPage = 6;
    const downloadFile = useDownloadFile();

    // Handlers for viewing and closing file details
    const handleViewDetails = (fileId, bucket, filename) => {
        setSelectedFile({ fileId, bucket, filename });
    };

    const closeModal = () => {
        setSelectedFile(null);
    };

    // Filter and paginate items
    const filteredItems = filterCategory
        ? items.filter((item) => item.bucket === filterCategory)
        : items;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to get random items
    const getRandomItems = (array, count) => {
        if (!array || array.length === 0) return [];
        const shuffled = [...array].sort(() => 0.5 - Math.random()); // Fisher-Yates shuffle alternative
        return shuffled.slice(0, Math.min(count, array.length));
    };

    // Random featured items (3 random files)
    const featuredItems = getRandomItems(items, 3);

    // Calculate total downloads
    const totalDownloads = items.reduce((sum, item) => sum + (item.downloadsCount || 0), 0);

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800 text-white py-24 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                        Discover <span className="text-amber-400">LibraryHub</span>
                    </h1>
                    <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-light">
                        Your gateway to a curated digital library—explore books, documents, and more with elegance and ease.
                    </p>
                    <a
                        href="/dashboard"
                        className="inline-block bg-amber-400 text-teal-900 px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-amber-500 hover:scale-105 transition-all duration-300"
                    >
                        Start Exploring
                    </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-50 rounded-t-[100%]"></div>
            </section>

            {/* Featured Files Section */}
            <section className="container mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Featured <span className="text-amber-400">Files</span>
                </h2>
                {loading ? (
                    <Loading size="lg" color="teal-600" message="Loading featured files..." />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredItems.length > 0 ? (
                            featuredItems.map((item) => (
                                <BookCard
                                    key={item.id}
                                    item={item}
                                    onViewDetails={handleViewDetails}
                                    onDownload={downloadFile}
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-600">
                                No featured items available.
                            </p>
                        )}
                    </div>
                )}
            </section>

            {/* Our Collection Section */}
            <section className="container mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Our <span className="text-amber-400">Collection</span>
                </h2>
                <div className="mb-8 flex justify-center">
                    <select
                        value={filterCategory}
                        onChange={(e) => {
                            setFilterCategory(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    >
                        <option value="">All Categories</option>
                        <option value="pdf">PDF</option>
                        <option value="image">Image</option>
                        <option value="word">Word</option>
                        <option value="csv">CSV</option>
                        <option value="text">Text</option>
                    </select>
                </div>
                {loading ? (
                    <Loading size="lg" color="teal-600" message="Loading collection..." />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {currentItems.length > 0 ? (
                                currentItems.map((item) => (
                                    <BookCard
                                        key={item.id}
                                        item={item}
                                        onViewDetails={handleViewDetails}
                                        onDownload={downloadFile}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-600">
                                    No items found in this category.
                                </p>
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredItems.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </section>

            {/* Statistics Section */}
            <section className="container mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    LibraryHub <span className="text-amber-400">By the Numbers</span>
                </h2>
                {loading ? (
                    <Loading size="lg" color="teal-600" message="Loading statistics..." />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <StatsCard
                            title="Total Files"
                            value={items.length.toLocaleString()}
                            description="A growing collection of books and documents."
                        />
                        <StatsCard
                            title="Total Downloads"
                            value={totalDownloads.toLocaleString()}
                            description="Files accessed by our community."
                        />
                        <StatsCard
                            title="Categories"
                            value={new Set(items.map((item) => item.bucket)).size}
                            description="Diverse file types to explore."
                        />
                    </div>
                )}
            </section>

            {/* Call to Action Section */}
            <section className="container mx-auto py-20 px-6">
                <CTABanner />
            </section>

            {/* Modal for Viewing Files */}
            {selectedFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <ShowFile
                            fileId={selectedFile.fileId}
                            bucket={selectedFile.bucket}
                            filename={selectedFile.filename}
                            onBack={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;