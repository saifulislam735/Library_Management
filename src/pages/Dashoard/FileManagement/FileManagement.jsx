import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FileManagement = () => {
    const [files, setFiles] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterName, setFilterName] = useState("");
    const [sortDownloadCount, setSortDownloadCount] = useState("0");
    const [uploadMessage, setUploadMessage] = useState("");
    const navigate = useNavigate();

    const API_URL = "https://file-upload-api-livid.vercel.app";

    // Fetch all files
    const fetchFiles = async () => {
        try {
            const response = await fetch(`${API_URL}/files/`);
            const data = await response.json();
            setFiles(data.files || []);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // Fetch top downloads
    const fetchTopDownloads = async (number) => {
        try {
            const response = await fetch(`${API_URL}/top-downloads?numbers=${number}`);
            const data = await response.json();
            if (data.top_downloaded_files) setFiles(data.top_downloaded_files);
            else fetchFiles();
        } catch (error) {
            console.error("Fetch top downloads error:", error);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchFiles();
    }, []);

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
                fetchFiles();
            }
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    // Handle search by word
    const handleSearch = async (word) => {
        if (!word) return applyFilters();
        try {
            const response = await fetch(`${API_URL}/search/?word=${word}`);
            const data = await response.json();
            const matchedFiles = data.matched_files.map((file) => ({
                ...file,
                bucket: files.find((f) => f.file_id === file.file_id)?.bucket || "unknown",
            }));
            setFiles(matchedFiles);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    // Apply filters
    const applyFilters = () => {
        let filteredFiles = [...files];
        if (filterType) filteredFiles = filteredFiles.filter((file) => file.bucket === filterType);
        if (filterName) filteredFiles = filteredFiles.filter((file) => file.filename.toLowerCase().includes(filterName.toLowerCase()));
        setFiles(filteredFiles);
    };

    // Action handlers
    const downloadFile = async (fileId, bucket) => {
        window.location.href = `${API_URL}/file/${fileId}/${bucket}`;
        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.file_id === fileId ? { ...file, downloadsCount: file.downloadsCount + 1 } : file
            )
        );
    };

    const deleteFile = async (fileId, bucket) => {
        await fetch(`${API_URL}/file/${fileId}/${bucket}`, { method: "DELETE" });
        fetchFiles();
    };

    const updateFile = async (fileId, bucket, file) => {
        const formData = new FormData();
        formData.append("file", file);
        await fetch(`${API_URL}/file/${fileId}/${bucket}`, { method: "PUT", body: formData });
        fetchFiles();
    };

    const viewFile = (fileId, bucket, filename) => {
        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.file_id === fileId ? { ...file, views_Count: file.views_Count + 1 } : file
            )
        );
        navigate(`/view-file?fileId=${fileId}&bucket=${bucket}&filename=${filename}`);
    };

    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    File <span className="text-amber-400">Management</span>
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
                        <p className="mt-2 text-sm text-green-600">{uploadMessage}</p>
                    )}
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <input
                        type="text"
                        placeholder="Search files by word..."
                        value={searchWord}
                        onChange={(e) => {
                            setSearchWord(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    />
                    <select
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            applyFilters();
                        }}
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
                        onChange={(e) => {
                            setFilterName(e.target.value);
                            applyFilters();
                        }}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    />
                    <select
                        value={sortDownloadCount}
                        onChange={(e) => {
                            setSortDownloadCount(e.target.value);
                            if (e.target.value > 0) fetchTopDownloads(e.target.value);
                            else fetchFiles();
                        }}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                    >
                        <option value="0">Sort by Download Quantity</option>
                        <option value="5">5 downloads</option>
                        <option value="10">10 downloads</option>
                        <option value="15">15 downloads</option>
                        <option value="20">More than 15 downloads</option>
                    </select>
                </div>

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
                            {files.length > 0 ? (
                                files.map((file, index) => (
                                    <tr
                                        key={file.file_id}
                                        className="border-b hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <td className="p-4 text-center">{index + 1}</td>
                                        <td className="p-4">{file.filename}</td>
                                        <td className="p-4 text-center">{file.bucket}</td>
                                        <td className="p-4 flex flex-wrap gap-2">
                                            <button
                                                onClick={() => downloadFile(file.file_id, file.bucket)}
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
                                        <td className="p-4 text-center">{file.downloadsCount || 0}</td>
                                        <td className="p-4 text-center">{file.views_Count || 0}</td>
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
            </div>
        </div>
    );
};

export default FileManagement;