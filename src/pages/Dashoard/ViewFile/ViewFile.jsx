import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewFile = () => {
    const [content, setContent] = useState("Loading file content...");
    const [originalContent, setOriginalContent] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const API_URL = "http://127.0.0.1:8000";
    const urlParams = new URLSearchParams(location.search);
    const fileId = urlParams.get("fileId");
    const bucket = urlParams.get("bucket");
    const filename = urlParams.get("filename") || "Unnamed File";

    // Fetch file content
    const fetchFileContent = async () => {
        try {
            const response = await fetch(`${API_URL}/file/${fileId}/${bucket}?inline=true`);
            const contentType = response.headers.get("content-type");

            if (bucket === "word" || bucket === "pdf" || bucket === "csv") {
                if (!contentType.includes("json")) throw new Error("Expected JSON response");
                const data = await response.json();
                setOriginalContent(data.content);
                setContent(
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {data.content}
                    </pre>
                );
            } else if (contentType.includes("image")) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setOriginalContent("");
                setContent(
                    <img
                        src={url}
                        className="max-w-full h-auto rounded-lg shadow-md"
                        alt="File content"
                    />
                );
            } else {
                const text = await response.text();
                setOriginalContent(text);
                setContent(
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {text}
                    </pre>
                );
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setContent(<p className="text-red-600 font-medium">Error loading content: {error.message}</p>);
        }
    };

    // Handle search
    const handleSearch = (term) => {
        if (!originalContent) {
            setContent(<p className="text-gray-600 italic">Search not available for this file type.</p>);
            return;
        }
        if (term) {
            if (originalContent.toLowerCase().includes(term.toLowerCase())) {
                const highlighted = originalContent.replace(
                    new RegExp(term, "gi"),
                    (match) => `<span class="bg-amber-300 text-gray-900 px-1 rounded">${match}</span>`
                );
                setContent(
                    <pre
                        className="whitespace-pre-wrap text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                );
            } else {
                setContent(
                    <div className="text-center">
                        <p className="text-gray-600 text-lg font-medium">Not Found</p>
                        <p className="text-gray-500">"{term}" was not found in this file.</p>
                    </div>
                );
            }
        } else {
            setContent(
                <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {originalContent}
                </pre>
            );
        }
    };

    useEffect(() => {
        fetchFileContent();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-teal-900">
                        View File: <span className="text-gray-600">{filename}</span>
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-teal-600 hover:text-teal-800 transition-colors"
                    >
                        ← Back
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search within file..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                </div>

                {/* File Content */}
                <div className="bg-white p-8 rounded-2xl shadow-xl min-h-[400px] flex items-center justify-center animate-fade-in overflow-auto">
                    {content}
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
        </div>
    );
};

export default ViewFile;