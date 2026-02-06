import { useState } from "react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#202A44] text-white px-6 py-16 flex justify-center items-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-14">

                {/* LEFT SIDE — INFO */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-yellow-400 mb-6">
                        Get in Touch
                    </h1>

                    <p className="text-gray-200 text-lg leading-relaxed mb-10">
                        ✨We would love to hear from you. Whether you have feedback,
                        questions about movies, or need help with bookings, feel free
                        to reach out and we will get back to you as soon as possible.✨
                    </p>

                    <div className="space-y-6 text-lg">
                        <p>
                            <span className="text-yellow-400 font-semibold">Email</span><br />
                            support@cinebook.com
                        </p>

                        <p>
                            <span className="text-yellow-400 font-semibold">Phone</span><br />
                            +977 9749402610
                        </p>

                        <p>
                            <span className="text-yellow-400 font-semibold">Location</span><br />
                            Kathmandu, Nepal
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE — FORM / THANK YOU */}
                <div className="bg-[#1a2238] border border-yellow-500/40 rounded-3xl p-10 shadow-2xl flex items-center justify-center">

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
                                Send us a message
                            </h2>

                            <input
                                type="text"
                                required
                                placeholder="Your Name"
                                className="w-full bg-[#202A44] border border-yellow-500/40 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-400"
                            />

                            <input
                                type="email"
                                required
                                placeholder="Your Email"
                                className="w-full bg-[#202A44] border border-yellow-500/40 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-400"
                            />

                            <textarea
                                rows="5"
                                required
                                placeholder="Your Message"
                                className="w-full bg-[#202A44] border border-yellow-500/40 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-400 resize-none"
                            />

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#202A44] font-bold py-4 rounded-xl transition-all shadow-lg hover:scale-[1.02]"
                            >
                                Send Message
                            </button>
                        </form>
                    ) : (
                        /* THANK YOU ANIMATION */
                        <div className="text-center animate-fadeInScale">
                            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-[#202A44] text-4xl font-bold animate-bounce">
                                ✓
                            </div>

                            <h2 className="text-3xl font-bold text-yellow-400 mb-3">
                                Thank you!
                            </h2>

                            <p className="text-gray-200 text-lg">
                                Your feedback means a lot to us.
                                We will get back to you very soon.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
