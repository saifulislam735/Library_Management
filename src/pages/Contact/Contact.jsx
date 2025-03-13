const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Get in <span className="text-amber-400">Touch</span>
                </h2>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-teal-900 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-teal-900 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-teal-900 font-semibold mb-2">Message</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                rows="5"
                                placeholder="Your Message"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;