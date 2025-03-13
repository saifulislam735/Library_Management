const About = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800 text-white py-32 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                        Our <span className="text-amber-400">Story</span>
                    </h1>
                    <p className="text-lg md:text-2xl max-w-3xl mx-auto font-light">
                        Building LibraryHub during our industrial attachment in 2025.
                    </p>
                </div>
                <div className="absolute inset-0 bg-black opacity-10"></div>
            </section>

            {/* Mission Section */}
            <section className="container mx-auto py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-teal-900 mb-6">
                        Why <span className="text-amber-400">LibraryHub</span> Exists
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg mb-12">
                        LibraryHub was created by Saiful Islam and Md. Shahinur Islam during our industrial attachment at Brainstation 23. From March 1 to March 15, 2025, we worked together to design and develop a digital library platform that makes knowledge accessible and beautifully organized.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="bg-teal-900 text-white py-20 px-6">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
                    <div className="relative max-w-3xl mx-auto">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-amber-400 h-full"></div>

                        {/* Timeline Items */}
                        <div className="space-y-12">
                            <div className="relative flex items-center">
                                <div className="w-1/2 pr-8 text-right">
                                    <h3 className="text-xl font-semibold">March 1, 2025</h3>
                                    <p className="text-gray-200">Started Industrial Attachment</p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="relative flex items-center">
                                <div className="w-1/2 pr-8"></div>
                                <div className="w-1/2 pl-8 text-left">
                                    <h3 className="text-xl font-semibold">March 7, 2025</h3>
                                    <p className="text-gray-200">Designed LibraryHub Concept</p>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
                            </div>
                            <div className="relative flex items-center">
                                <div className="w-1/2 pr-8 text-right">
                                    <h3 className="text-xl font-semibold">March 15, 2025</h3>
                                    <p className="text-gray-200">Completed LibraryHub Prototype</p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Meet the <span className="text-amber-400">Team</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                        <div className="w-24 h-24 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                            SI
                        </div>
                        <h3 className="text-xl font-semibold text-teal-900 mb-2">Saiful Islam</h3>
                        <p className="text-gray-600">Co-Creator</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                        <div className="w-24 h-24 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                            MSI
                        </div>
                        <h3 className="text-xl font-semibold text-teal-900 mb-2">Md. Shahinur Islam</h3>
                        <p className="text-gray-600">Co-Creator</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;