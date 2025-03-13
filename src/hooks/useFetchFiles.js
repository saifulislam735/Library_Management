import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000";
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

const useFetchFiles = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/files/`);
            const data = await response.json();
            const mappedItems = data.files.map((file) => ({
                id: file.file_id,
                file_id: file.file_id, // Keep original key for API calls
                title: file.filename,
                filename: file.filename, // Keep original key for display
                type: getFileType(file.content_type),
                img: COVER_IMAGE_URL, // Static cover image
                bucket: file.bucket,
                upload_time: file.upload_time || "Unknown", // Add upload time
                downloadsCount: file.downloadsCount || 0, // Add downloads count
                views_Count: file.views_Count || 0, // Add views count
            }));
            setItems(mappedItems);
        } catch (error) {
            console.error("Error fetching files:", error);
            // setItems([
            //     { id: 1, file_id: "1", title: "The Great Gatsby", filename: "The Great Gatsby", type: "Book", img: COVER_IMAGE_URL, bucket: "book", upload_time: "2025-03-01", downloadsCount: 10, views_Count: 5 },
            //     { id: 2, file_id: "2", title: "Project Plan.pdf", filename: "Project Plan.pdf", type: "File", img: COVER_IMAGE_URL, bucket: "pdf", upload_time: "2025-03-02", downloadsCount: 8, views_Count: 3 },
            // ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return { items, loading, refetch: fetchFiles };
};

export default useFetchFiles;