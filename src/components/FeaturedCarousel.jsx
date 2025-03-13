import { useState } from "react";

const FeaturedCarousel = ({ items, onViewDetails, onDownload }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

    if (!items || items.length === 0) return null;

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {items.map((item) => (
                        <div key={item.id} className="min-w-full flex justify-center">
                            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                                <h3 className="text-xl font-semibold text-teal-900 mb-2">{item.filename}</h3>
                                <p className="text-sm text-gray-600 mb-4">{item.bucket}</p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => onViewDetails(item.id, item.bucket, item.filename)}
                                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => onDownload(item.id, item.bucket)}
                                        className="bg-amber-400 text-teal-900 px-4 py-2 rounded-lg hover:bg-amber-500"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
            >
                ←
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
            >
                →
            </button>
        </div>
    );
};

export default FeaturedCarousel;