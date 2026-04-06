import { Link } from "react-router-dom";

const CollectionsSection = () => {

    const steps = [
        "Sign in to your account",
        "Create a new collection",
        "Add books to your list",
        "Track your reading progress"
    ];

    return (
        <section id="collections" className="py-16">
            <div className="container mx-auto px-4 md:px-0">

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* collections banner */}
                    <div className="flex justify-center items-center w-full">
                        <img src="./collections-banner.svg" alt="Collections banner" className="w-full h-full object-contain" />
                    </div>

                    {/* content */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-primary">
                            Create Your Own Collections
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Organize your books into personalized collections like
                            <span className="text-shadow-primary font-medium"> Read</span>,
                            <span className="text-shadow-primary font-medium"> Currently Reading</span> and
                            <span className="text-shadow-primary font-medium"> Want to Read</span>.
                        </p>

                        {/* steps to login */}
                        <div className="space-y-4">
                            {steps.map((step, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white dark:bg-darkCard p-4 rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow transition"
                                >
                                    <div className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full text-sm">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm font-semibold">{step}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA login btn */}
                        <Link
                            to="/login"
                            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-full font-semibold active:scale-95"
                        >
                            Start Creating
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionsSection;