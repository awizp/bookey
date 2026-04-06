import { Link } from "react-router-dom";

const AboutSection = () => {
    return (
        <section id="about" className="py-16">
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* banner */}
                    <div className="flex w-full justify-center items-center">
                        <img src="/about-banner.svg" alt="About banner" className="w-full h-full object-contain" />
                    </div>

                    {/* content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-4 text-primary">
                            A Better Way to Manage Your Books
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 font-semibold">
                            No more scattered lists or forgotten books everything lives in one place. Track books, build collections, and join clubs effortlessly.
                        </p>

                        {/* points */}
                        <div className="space-y-6 mb-15">

                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                    📚
                                </div>
                                <div>
                                    <p className="font-semibold">Centralized Library</p>
                                    <p className="text-sm text-gray-500">
                                        Keep all your books organized in one place
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                    🗂️
                                </div>
                                <div>
                                    <p className="font-semibold">Custom Collections</p>
                                    <p className="text-sm text-gray-500">
                                        Create personalized lists for every reading goal
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                    📈
                                </div>
                                <div>
                                    <p className="font-semibold">Track Progress</p>
                                    <p className="text-sm text-gray-500">
                                        Stay consistent with your reading habits
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* CTA login btn */}
                        <Link
                            to="/login"
                            className="bg-primary text-white px-6 py-3 rounded-full cursor-pointer font-semibold active:scale-95"
                        >
                            Explore Platform
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;