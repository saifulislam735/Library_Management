// ShowFile.jsx
import { useEffect, useState } from "react";

const ShowFile = ({ fileId, bucket, filename = "Unnamed File", onBack }) => {
    const [content, setContent] = useState("Loading file content...");
    const [searchTerm, setSearchTerm] = useState("");
    const [originalContent, setOriginalContent] = useState("");
    const API_URL = "https://file-upload-api-livid.vercel.app";

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const response = await fetch(`${API_URL}/file/${fileId}/${bucket}?inline=true`);
                const contentType = response.headers.get("content-type");

                if (contentType.includes("image")) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setContent(`<img src="${url}" class="max-w-full h-auto rounded-lg shadow-md" alt="File content" />`);
                    setOriginalContent(""); // No searchable text for images
                } else if (bucket === "pdf" && contentType.includes("json")) {
                    const data = await response.json();
                    setOriginalContent(data.content);
                    setContent(`<pre class="whitespace-pre-wrap text-gray-800 leading-relaxed">${data.content}</pre>`);
                } else if (bucket === "word" && contentType.includes("json")) {
                    const data = await response.json();
                    setOriginalContent(data.content);
                    setContent(`<pre class="whitespace-pre-wrap text-gray-800 leading-relaxed">${data.content}</pre>`);
                } else {
                    const text = await response.text();
                    setOriginalContent(text);
                    setContent(`<pre class="whitespace-pre-wrap text-gray-800 leading-relaxed">${text}</pre>`);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setContent(`<p class="text-red-600 font-medium">Error loading content: ${error.message}</p>`);
            }
        };

        fetchFileContent();
    }, [fileId, bucket]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (!originalContent) {
            setContent(`<p class="text-gray-600 italic">Search not available for this file type.</p>`);
            return;
        }

        if (term) {
            if (originalContent.toLowerCase().includes(term)) {
                const highlighted = originalContent.replace(
                    new RegExp(term, "gi"),
                    (match) => `<span class="bg-yellow-300 text-gray-900 px-1 rounded">${match}</span>`
                );
                setContent(`<pre class="whitespace-pre-wrap text-gray-800 leading-relaxed">${highlighted}</pre>`);
            } else {
                setContent(`
          <div class="text-center">
            <p class="text-gray-600 text-lg font-medium">Not Found</p>
            <p class="text-gray-500">"${term}" was not found in this file.</p>
          </div>
        `);
            }
        } else {
            setContent(`<pre class="whitespace-pre-wrap text-gray-800 leading-relaxed">${originalContent}</pre>`);
        }
    };

    return (
        <div className="bg-gray-50 font-['Inter'] flex items-center justify-center">
            <div className="container mx-auto max-w-4xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        View File: <span className="text-gray-600">{filename}</span>
                    </h1>
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            ← Back
                        </button>
                    )}
                </div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search within file..."
                        className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                </div>

                {/* File Content */}
                <div
                    className="bg-white p-8 rounded-xl shadow-lg min-h-[400px] flex items-center justify-center fade-in overflow-auto"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>

            <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default ShowFile;