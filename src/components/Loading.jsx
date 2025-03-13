// Loading.jsx
import PropTypes from "prop-types";

const Loading = ({ size = "md", color = "teal-600", message = "Loading..." }) => {
    // Size mapping for responsiveness
    const sizeStyles = {
        sm: "w-8 h-8 border-2",
        md: "w-12 h-12 border-4",
        lg: "w-16 h-16 border-4",
        xl: "w-24 h-24 border-6",
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div
                className={`border-t-transparent rounded-full animate-spin ${sizeStyles[size]} border-${color}`}
            ></div>
            {message && <p className="mt-4 text-gray-600 text-lg font-medium">{message}</p>}
        </div>
    );
};

Loading.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg", "xl"]), // Control spinner size
    color: PropTypes.string, // Tailwind color class (e.g., "teal-600", "blue-500")
    message: PropTypes.string, // Optional loading message
};

export default Loading;