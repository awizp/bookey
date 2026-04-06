import { useState, useContext } from "react";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

const AppLayout = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);

    // recommended books
    const recommended = books.filter((book) =>
        book.genre.some((g) =>
            currentUser.likedGenres.includes(g)
        )
    );

    return (
        <>
            <title>Welcome to the dashboard | Bookey</title>

            <div className="h-screen flex overflow-hidden">

                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className="flex-1 flex flex-col">
                    <AppNavbar setIsOpen={setIsOpen} />

                    {/* content */}
                    <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">
                        <div className="mb-6 space-y-2">
                            <h1 className="text-2xl font-bold text-primary">
                                Hello, {currentUser?.name} 👋
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Discover books based on your interests
                            </p>
                        </div>

                        {/* book grid list */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-primary">
                                Recommended Books
                            </h2>

                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">

                                {recommended.slice(0, 5).map((book) => (
                                    <div
                                        key={book.id}
                                        className="bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border-2 border-black/10 p-2"
                                    >
                                        <div className="w-full overflow-hidden rounded-xl">
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="p-2">
                                            <p className="text-sm font-semibold line-clamp-2">
                                                {book.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {book.author}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                            <button className="bg-primary text-white py-3 rounded-xl">
                                Create Playlist
                            </button>

                            <button className="border py-3 rounded-xl">
                                Explore Library
                            </button>

                            <button className="border py-3 rounded-xl">
                                View Clubs
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppLayout;