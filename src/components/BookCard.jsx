// components/BookCard.jsx
const BookCard = ({ item, onViewDetails, onDownload }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-teal-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                    {item.type}
                    {item.category && ` - ${item.category}`}
                    {item.downloadsCount !== undefined && ` (Downloads: ${item.downloadsCount})`}
                </p>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onViewDetails(item.id, item.bucket, item.title)}
                        className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => onDownload(item.id, item.bucket, item.title)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;