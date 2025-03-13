const StatsCard = ({ title, value, description }) => (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <h3 className="text-3xl font-bold text-teal-900 mb-2">{value}</h3>
        <p className="text-xl font-semibold text-gray-800 mb-1">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

export default StatsCard;