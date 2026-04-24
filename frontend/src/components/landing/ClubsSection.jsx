import { Link } from "react-router-dom";

const ClubsSection = () => {
    return (
        <section id="clubs" className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* content */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-primary">
                            Discover Book Clubs
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Join genre based clubs where readers
                            <span className="text-shadow-primary font-medium"> share ideas</span>,
                            <span className="text-shadow-primary font-medium"> post updates</span> and
                            <span className="text-shadow-primary font-medium"> highlight meaningful quotes</span> from books they love.
                        </p>

                        {/* points */}
                        <div className="space-y-3">
                            <p className="flex items-center gap-2">
                                <span className="text-primary">●</span>
                                Join open genre or book clubs
                            </p>

                            <p className="flex items-center gap-2">
                                <span className="text-primary">●</span>
                                Share what you're currently reading
                            </p>

                            <p className="flex items-center gap-2">
                                <span className="text-primary">●</span>
                                Highlight quotes with page references
                            </p>
                        </div>

                        {/* CTA login btn */}
                        <Link
                            to="/login"
                            className="inline-block mt-6 bg-primary font-semibold text-white px-6 py-3 rounded-full cursor-pointer active:scale-95"
                        >
                            Join the Community
                        </Link>
                    </div>

                    {/* review like content */}
                    <div className="relative h-87 font-semibold">

                        <div className="absolute top-0 left-0 w-[80%] bg-white dark:bg-darkCard p-4 rounded-2xl shadow-md">
                            <p className="text-sm font-semibold">Self Growth Club</p>
                            <p className="text-xs text-gray-500">120 members</p>

                            <div className="mt-3 text-sm">
                                “Currently reading Atomic Habits… 🔥”
                            </div>
                        </div>

                        <div className="absolute top-36 right-0 w-[70%] bg-white dark:bg-darkCard p-4 rounded-2xl shadow-md">
                            <p className="text-sm">
                                📚 Suggested: Deep Work by Cal Newport
                            </p>
                        </div>

                        <div className="absolute bottom-0 left-10 w-[75%] bg-white dark:bg-darkCard p-4 rounded-2xl shadow-md">
                            <p className="text-xs text-gray-500 mb-2">Quote</p>
                            <p className="text-sm italic">
                                “You do not rise to the level of your goals…”
                            </p>
                            <p className="text-xs mt-2 text-gray-400">Page 23</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClubsSection;