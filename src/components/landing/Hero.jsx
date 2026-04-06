import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* hero content */}
                    <div className="text-center md:text-left space-y-10">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                            Organize Your{" "}
                            <span className="text-primary">Reading Journey</span>
                        </h1>

                        <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold">
                            Bookey is a centralized platform designed to simplify how you organize, track, and explore your reading journey.
                        </p>

                        <div className="mt-6 flex flex-col xs:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                to="/login"
                                className="bg-primary font-semibold text-white px-6 py-3 rounded-full cursor-pointer active:scale-95"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/login"
                                className="border-2 font-semibold border-primary text-primary px-6 py-3 rounded-full cursor-pointer hover:bg-primary hover:text-white"
                            >
                                Explore
                            </Link>
                        </div>
                    </div>

                    {/* hero banner */}
                    <div className="w-full flex justify-center items-center">
                        <img src="/hero-banner.svg" alt="Hero banner" className="w-full h-full object-contain" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;