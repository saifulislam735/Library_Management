// components/Pagination.jsx
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 rounded-full ${currentPage === i
                            ? "bg-amber-400 text-teal-900"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } transition-all duration-200`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 transition-all duration-200"
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 transition-all duration-200"
            >
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;