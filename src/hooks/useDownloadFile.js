// hooks/useDownloadFile.js
const useDownloadFile = () => {
    const downloadFile = async (fileId, bucket, filename) => {
        try {
            const response = await fetch(
                `https://file-upload-api-livid.vercel.app/file/${fileId}/${bucket}?inline=true`
            );
            if (!response.ok) throw new Error("Failed to fetch file");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download the file. Please try again.");
        }
    };

    return downloadFile;
};

export default useDownloadFile;