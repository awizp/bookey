import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import books from "../../data/books.json";

const LibraryPreview = () => {
    const scrollRef = useRef();
    const navigate = useNavigate();

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = window.innerWidth < 768 ? 200 : 400;

        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section id="library" className="py-14 bg-primary/5">
            <div className="container mx-auto px-4 md:px-0">

                {/* content */}
                <div className="flex justify-between items-center mb-6">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-primary">Explore Books</h2>
                        <p className="text-sm text-gray-500">
                            Swipe or use arrows to explore
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/login")}
                        className="text-gray-600 text-sm font-semibold cursor-pointer hover:text-primary"
                    >
                        View All →
                    </button>
                </div>

                {/* carousel wrapper */}
                <div className="relative">

                    {/* carousel left btn */}
                    <button
                        onClick={() => scroll("left")}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full w-8 h-8 justify-center items-center shadow-lg bg-primary text-white hover:bg-primary/90 cursor-pointer"
                    >
                        <FaChevronLeft size={24} />
                    </button>

                    {/* carousel right btn */}
                    <button
                        onClick={() => scroll("right")}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full w-8 h-8 justify-center items-center shadow-lg bg-primary text-white hover:bg-primary/90 cursor-pointer"
                    >
                        <FaChevronRight size={24} />
                    </button>

                    {/* carousel */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1 py-5"
                    >
                        {books.slice(0, 10).map((book) => (
                            <div
                                key={book.id}
                                onClick={() => navigate("/login")}
                                className="min-w-50 cursor-pointer hover:scale-105 transition"
                            >
                                <div className="rounded-xl border bg-white border-black/10 bg-base-100 shadow-md hover:shadow-lg transition active:scale-95 dark:bg-darkCard">

                                    {/* card image */}
                                    <figure className="px-4 pt-4">
                                        <div className="h-56 overflow-hidden p-1 w-full rounded-xl bg-linear-to-br from-primary/40 to-primary/10 flex items-center justify-center text-white font-bold text-lg">
                                            <img src={book.image} alt={book.title} className="w-full h-full object-fill rounded-xl" />
                                        </div>
                                    </figure>

                                    {/* card content */}
                                    <div className="space-y-1 p-3">
                                        <h3 className="text-sm font-semibold line-clamp-2">
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {book.author}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LibraryPreview;