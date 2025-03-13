const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-teal-900 to-slate-900 text-gray-200 py-12 px-6 mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Brand Info */}
                <div>
                    <h3 className="text-2xl font-bold text-amber-400 mb-4">LibraryHub</h3>
                    <p className="text-sm leading-relaxed">
                        A premium platform for managing your books and files with elegance and efficiency.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
                    <ul className="space-y-3">
                        <li>
                            <a href="/about" className="hover:text-amber-400 transition-colors duration-200">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-amber-400 transition-colors duration-200">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:text-amber-400 transition-colors duration-200">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                    <p className="text-sm">Email: support@libraryhub.com</p>
                    <p className="text-sm">Phone: +1 234 567 890</p>
                    <div className="mt-4 flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.6c-.9.4-1.8.7-2.8.8 1-.6 1.8-1.6 2.2-2.7-.9.6-2 1-3.1 1.2-2.7-3-7.2 1-5.5 4.2C9.6 7 5 4.8 2.3 1.5c-.9 1.6-.5 3.7 1 4.8-1-.1-2-.4-2.8-1v.1c0 2 1.4 3.7 3.3 4.1-.7.2-1.5.2-2.2 0 .2 1.7 1.3 3 3 3.1-1.1.9-2.5 1.4-4 1.2.3 1 1.3 2 2.5 2.7 4.8 0 9-4 9.8-9.4 0-.2 0-.4.1-.6.7-.5 1.3-1.1 1.8-1.8z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.1c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.1 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1 1.7-.5 3.5-.7 5.3-.7s3.6.2 5.3.7c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.7.9.7 1.5v2.2c0 .3.2.6.7.5 4-1.4 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-teal-800 mt-8 pt-4 text-center text-sm">
                <p>© 2025 LibraryHub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;