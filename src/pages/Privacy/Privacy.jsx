const Privacy = () => {
    return (
        <div className="bg-gray-50 py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-4xl font-bold text-teal-900 mb-12 text-center">
                    Privacy <span className="text-amber-400">Policy</span>
                </h2>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h3 className="text-2xl font-semibold text-teal-900 mb-6">Your Privacy Matters</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        At LibraryHub, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
                    </p>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-teal-900 mb-2">Data Collection</h4>
                            <p className="text-gray-600">
                                We collect only the information necessary to provide our services, such as your name, email, and uploaded files.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-teal-900 mb-2">Data Usage</h4>
                            <p className="text-gray-600">
                                Your data is used to enhance your experience, process your requests, and improve our platform.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-teal-900 mb-2">Security</h4>
                            <p className="text-gray-600">
                                We employ industry-standard encryption and security measures to protect your information.
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-700 mt-6">
                        For more details, contact us at <a href="mailto:support@libraryhub.com" className="text-teal-600 hover:underline">support@libraryhub.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;