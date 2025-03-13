// AllBooks.jsx
import { useState } from "react";
import useDownloadFile from "../../hooks/useDownloadFile";
import useFetchFiles from "../../hooks/useFetchFiles";
import useWordSearch from "../../hooks/useWordSearch";
import useFilterAndSort from "../../hooks/useFilterAndSort";
import Loading from "../../components/Loading";
import BookCard from "../../components/BookCard";
import ShowFile from "../../components/ShowFile";
import Pagination from "../../components/Pagination";

const AllBooks = () => {
    const [search, setSearch] = useState("");
    const [wordSearch, setWordSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortByDownloads, setSortByDownloads] = useState("0");
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Show 6 items per page
    const downloadFile = useDownloadFile();

    const { items: fetchedItems, loading: fetchLoading } = useFetchFiles(sortByDownloads);
    const { wordSearchItems, wordSearchLoading } = useWordSearch(wordSearch);
    const baseItems = wordSearch ? wordSearchItems : fetchedItems;
    const loading = fetchLoading || wordSearchLoading;
    const filteredItems = useFilterAndSort(baseItems, search, category, sortByDownloads);

    const handleViewDetails = (fileId, bucket, filename) => {
        setSelectedFile({ fileId, bucket, filename });
    };

    const closeModal = () => {
        setSelectedFile(null);
    };

    const handleSortByDownloads = (e) => {
        setSortByDownloads(e.target.value);
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    // Calculate the items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    All Books & Files
                </h2>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    />
                    <input
                        type="text"
                        placeholder="Search within files..."
                        value={wordSearch}
                        onChange={(e) => setWordSearch(e.target.value)}
                        className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    >
                        <option value="All">All Categories</option>
                        <option value="pdf">PDF</option>
                        <option value="image">Image</option>
                        <option value="word">Word</option>
                        <option value="json">JSON</option>
                    </select>
                    <select
                        value={sortByDownloads}
                        onChange={handleSortByDownloads}
                        className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    >
                        <option value="0">Sort by Downloads</option>
                        <option value="5">5 Downloads</option>
                        <option value="10">10 Downloads</option>
                        <option value="15">15 Downloads</option>
                        <option value="20">More than 15 Downloads</option>
                    </select>
                </div>

                {loading ? (
                    <Loading size="lg" color="teal-600" message="Fetching your collection..." />
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
                                <p className="text-center text-gray-600 col-span-full">No items found.</p>
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
            </div>

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

export default AllBooks;