import { useState, useEffect } from "react";
import useFetchFiles from "../../hooks/useFetchFiles";
import useDownloadFile from "../../hooks/useDownloadFile";
import Loading from "../../components/Loading";
import ShowFile from "../../components/ShowFile";
import StatsCard from "../../components/StatsCard";

const Dashboard = () => {
    const { items: files, loading, refetch } = useFetchFiles();
    const downloadFile = useDownloadFile();
    const [searchWord, setSearchWord] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterName, setFilterName] = useState("");
    const [sortDownloadCount, setSortDownloadCount] = useState("0");
    const [uploadMessage, setUploadMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const API_URL = "http://127.0.0.1:8000";

    // Fetch top downloads
    const fetchTopDownloads = async (number) => {
        try {
            const response = await fetch(`${API_URL}/top-downloads?numbers=${number}`);
            const data = await response.json();
            if (data.top_downloaded_files) {
                return data.top_downloaded_files.map((file) => ({
                    id: file.file_id,
                    file_id: file.file_id,
                    title: file.filename,
                    filename: file.filename,
                    type: file.bucket, // Simplified type mapping
                    bucket: file.bucket,
                    upload_time: file.upload_time,
                    downloadsCount: file.downloadsCount || 0,
                    views_Count: file.views_Count || 0,
                }));
            }
            return files;
        } catch (error) {
            console.error("Fetch top downloads error:", error);
            return files;
        }
    };

    // Handle upload
    const handleUpload = async (e) => {
        e.preventDefault();
        const fileInput = e.target.querySelector("#fileInput");
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        try {
            const response = await fetch(`${API_URL}/upload/`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                setUploadMessage("File uploaded successfully!");
                setTimeout(() => setUploadMessage(""), 3000);
                fileInput.value = "";
                refetch(); // Refresh file list
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setUploadMessage("Upload failed!");
        }
    };

    // Handle search by word
    const handleSearch = async (word) => {
        if (!word) return applyFilters(files);
        try {
            const response = await fetch(`${API_URL}/search/?word=${word}`);
            const data = await response.json();
            return data.matched_files.map((file) => ({
                id: file.file_id,
                file_id: file.file_id,
                title: file.filename,
                filename: file.filename,
                bucket: files.find((f) => f.file_id === file.file_id)?.bucket || "unknown",
                upload_time: file.upload_time,
                downloadsCount: file.downloadsCount || 0,
                views_Count: file.views_Count || 0,
            }));
        } catch (error) {
            console.error("Search error:", error);
            return [];
        }
    };

    // Apply filters
    const applyFilters = (fileList) => {
        let filteredFiles = [...fileList];
        if (filterType) filteredFiles = filteredFiles.filter((file) => file.bucket === filterType);
        if (filterName) filteredFiles = filteredFiles.filter((file) => file.filename.toLowerCase().includes(filterName.toLowerCase()));
        return filteredFiles;
    };

    // Action handlers
    const handleDownload = (fileId, bucket) => {
        downloadFile(fileId, bucket);
        refetch(); // Refresh to update downloadsCount
    };

    const deleteFile = async (fileId, bucket) => {
        try {
            await fetch(`${API_URL}/file/${fileId}/${bucket}`, { method: "DELETE" });
            refetch(); // Refresh file list
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const updateFile = async (fileId, bucket, file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            await fetch(`${API_URL}/file/${fileId}/${bucket}`, { method: "PUT", body: formData });
            refetch(); // Refresh file list
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const viewFile = (fileId, bucket, filename) => {
        setSelectedFile({ fileId, bucket, filename });
        refetch(); // Refresh to update views_Count if tracked
    };

    const closeModal = () => {
        setSelectedFile(null);
    };

    // Combined filtered and sorted files
    const getDisplayedFiles = async () => {
        let displayedFiles = [...files];
        if (sortDownloadCount > 0) {
            displayedFiles = await fetchTopDownloads(sortDownloadCount);
        }
        if (searchWord) {
            displayedFiles = await handleSearch(searchWord);
        }
        return applyFilters(displayedFiles);
    };

    // Calculate total downloads
    const totalDownloads = files.reduce((sum, file) => sum + (file.downloadsCount || 0), 0);

    // Fetch displayed files when filters change
    const [displayedFiles, setDisplayedFiles] = useState([]);
    useEffect(() => {
        getDisplayedFiles().then(setDisplayedFiles);
    }, [files, searchWord, filterType, filterName, sortDownloadCount]);

    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Dashboard - <span className="text-amber-400">File Management</span>
                </h1>

                {/* Upload Section */}
                <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
                    <h2 className="text-2xl font-semibold text-teal-900 mb-4">Upload File</h2>
                    <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="file"
                            id="fileInput"
                            className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-md"
                        >
                            Upload
                        </button>
                    </form>
                    {uploadMessage && (
                        <p className={`mt-2 text-sm ${uploadMessage.includes("failed") ? "text-red-600" : "text-green-600"}`}>
                            {uploadMessage}
                        </p>
                    )}
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <input
                        type="text"
                        placeholder="Search files by word..."
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    >
                        <option value="">Sort by File Type</option>
                        <option value="pdf">PDF</option>
                        <option value="image">Image</option>
                        <option value="json">JSON</option>
                        <option value="word">Word</option>
                        <option value="text">Text</option>
                        <option value="csv">CSV</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Filter by file name..."
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    />
                    <select
                        value={sortDownloadCount}
                        onChange={(e) => setSortDownloadCount(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    >
                        <option value="0">Sort by Download Quantity</option>
                        <option value="5">5 downloads</option>
                        <option value="10">10 downloads</option>
                        <option value="15">15 downloads</option>
                        <option value="20">More than 15 downloads</option>
                    </select>
                </div>

                {/* Statistics Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-teal-900 mb-6 text-center">
                        LibraryHub <span className="text-amber-400">Stats</span>
                    </h2>
                    {loading ? (
                        <Loading size="lg" color="teal-600" message="Loading statistics..." />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <StatsCard
                                title="Total Files"
                                value={files.length.toLocaleString()}
                                description="Files in our library."
                            />
                            <StatsCard
                                title="Total Downloads"
                                value={totalDownloads.toLocaleString()}
                                description="Files accessed by users."
                            />
                            <StatsCard
                                title="Categories"
                                value={new Set(files.map((file) => file.bucket)).size}
                                description="Diverse file types."
                            />
                        </div>
                    )}
                </section>

                {/* File List */}
                <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-teal-900 text-white">
                            <tr>
                                <th className="p-4 rounded-tl-2xl">Sl No</th>
                                <th className="p-4">File Name</th>
                                <th className="p-4">File Type</th>
                                <th className="p-4">Actions</th>
                                <th className="p-4">Upload Date</th>
                                <th className="p-4">Downloads</th>
                                <th className="p-4 rounded-tr-2xl">Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-4">
                                        <Loading size="md" color="teal-600" message="Loading files..." />
                                    </td>
                                </tr>
                            ) : displayedFiles.length > 0 ? (
                                displayedFiles.map((file, index) => (
                                    <tr
                                        key={file.file_id}
                                        className="border-b hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <td className="p-4 text-center">{index + 1}</td>
                                        <td className="p-4">{file.filename}</td>
                                        <td className="p-4 text-center">{file.bucket}</td>
                                        <td className="p-4 flex flex-wrap gap-2">
                                            <button
                                                onClick={() => handleDownload(file.file_id, file.bucket)}
                                                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                                            >
                                                Download
                                            </button>
                                            <button
                                                onClick={() => deleteFile(file.file_id, file.bucket)}
                                                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                            <label className="bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700 cursor-pointer">
                                                Update
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => updateFile(file.file_id, file.bucket, e.target.files[0])}
                                                />
                                            </label>
                                            <button
                                                onClick={() => viewFile(file.file_id, file.bucket, file.filename)}
                                                className="bg-teal-600 text-white px-3 py-1 rounded-lg hover:bg-teal-700"
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className="p-4">{file.upload_time}</td>
                                        <td className="p-4 text-center">{file.downloadsCount}</td>
                                        <td className="p-4 text-center">{file.views_Count}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-red-600 p-4">
                                        No matching files found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

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
        </div>
    );
};

export default Dashboard;