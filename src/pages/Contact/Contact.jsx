// Contact.jsx
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here (e.g., API call)
        console.log("Form submitted:", formData);
        setFormData({ name: "", email: "", message: "" }); // Reset form
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-5xl font-extrabold text-teal-900 mb-16 text-center animate-fade-in-down">
                    Get in <span className="text-amber-400">Touch</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-teal-900 font-semibold mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm transition-all duration-200"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-teal-900 font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm transition-all duration-200"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-teal-900 font-semibold mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm transition-all duration-200"
                                    rows="5"
                                    placeholder="Your Message"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-teal-900 text-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
                        <div>
                            <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
                            <p className="text-lg mb-4">
                                We are developers from the{" "}
                                <span className="text-amber-400 font-semibold">
                                    RUET ETE Department, 20 Series
                                </span>
                                , passionate about building innovative solutions like LibraryHub.
                            </p>
                            <div className="space-y-4">
                                <p>
                                    <span className="font-semibold">Address:</span> Rajshahi University of Engineering & Technology (RUET), Talaimari, Rajshahi-6204, Bangladesh
                                </p>
                                <p>
                                    <span className="font-semibold">Phone:</span> +880 721-750742
                                </p>
                                <p>
                                    <span className="font-semibold">Email:</span> info@ruet.ac.bd
                                </p>
                                <p>
                                    <span className="font-semibold">Website:</span>{" "}
                                    <a href="https://www.ruet.ac.bd" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                                        www.ruet.ac.bd
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635.792352557669!2d88.62599747517505!3d24.36356857826076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefb3e2b76d13%3A0x63e5f57a0c2b6e6!2sRajshahi%20University%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sbd!4v1698765432100!5m2!1sen!2sbd"
                                width="100%"
                                height="200"
                                style={{ border: 0, borderRadius: "1rem" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="RUET Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animation CSS */}
            <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Contact;