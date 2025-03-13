const CTABanner = () => (
    <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800 text-white py-16 px-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Dive In?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 font-light">
            Join LibraryHub today and unlock a world of knowledge at your fingertips.
        </p>
        <a
            href="/register"
            className="inline-block bg-amber-400 text-teal-900 px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-amber-500 hover:scale-105 transition-all duration-300"
        >
            Get Started
        </a>
    </div>
);
export default CTABanner;