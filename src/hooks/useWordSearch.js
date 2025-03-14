// useWordSearch.js
import { useState, useEffect } from "react";

const API_URL = "https://file-upload-api-livid.vercel.app";
const COVER_IMAGE_URL =
    "https://png.pngtree.com/png-clipart/20200727/original/pngtree-spring-element-abstract-geometric-book-cover-design-png-image_5370465.jpg";

const getFileType = (contentType) => {
    switch (contentType) {
        case "application/pdf": return "PDF";
        case "image/png":
        case "image/jpeg": return "Image";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return "Document";
        case "application/json": return "JSON";
        default: return "File";
    }
};

const useWordSearch = (wordSearch) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWordSearch = async () => {
            if (!wordSearch) {
                setItems([]); // Reset to empty when no word search
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/search/?word=${encodeURIComponent(wordSearch)}`);
                const data = await response.json();
                if (data.matched_files && data.matched_files.length > 0) {
                    const matchedItems = data.matched_files.map((file) => ({
                        id: file.file_id,
                        title: file.filename,
                        type: getFileType(file.content_type || "unknown"),
                        category: file.bucket || "unknown",
                        img: COVER_IMAGE_URL,
                        bucket: file.bucket || "unknown",
                        downloadsCount: file.downloadsCount || 0,
                        upload_time: file.upload_time || "Unknown",
                    }));
                    setItems(matchedItems);
                } else {
                    setItems([]);
                }
            } catch (error) {
                console.error("Word search error:", error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchWordSearch();
    }, [wordSearch]);

    return { wordSearchItems: items, wordSearchLoading: loading };
};

export default useWordSearch;