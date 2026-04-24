import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { TrackingContext } from "../context/TrackingContext";

const ReadingPlaylist = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);
    const { trackingData } = useContext(TrackingContext);

    const navigate = useNavigate();

    const userTracking = useMemo(() => {
        return trackingData.find(
            (t) => t.userId === currentUser.id
        );
    }, [trackingData, currentUser]);

    const readingList = useMemo(() => {
        return (userTracking?.currentlyReading || [])
            .sort((a, b) =>
                new Date(b.addedAt || b.startedAt) -
                new Date(a.addedAt || a.startedAt)
            );
    }, [userTracking]);

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 p-4 bg-bgLight dark:bg-darkBg space-y-4">

                    <h1 className="text-xl font-semibold">
                        Currently Reading
                    </h1>

                    {readingList.length === 0 ? (

                        <p className="text-sm text-gray-500">
                            No books in your reading list yet 🚀
                        </p>

                    ) : (

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                            {readingList.map((item) => {

                                const book = books.find(
                                    (b) => b.id === item.bookId
                                );

                                if (!book) return null;

                                const progress = Math.min(
                                    (item.pagesRead / item.totalPages) * 100,
                                    100
                                );

                                return (
                                    <div
                                        key={item.bookId}
                                        onClick={() =>
                                            navigate(`/app/reading/${book.id}`)
                                        }
                                        className="bg-white dark:bg-darkCard rounded-2xl p-3 cursor-pointer hover:shadow transition"
                                    >

                                        {/* cover */}
                                        <div className="w-full h-40 rounded-xl overflow-hidden">
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* content */}
                                        <div className="mt-2 space-y-1">

                                            <p className="text-sm font-semibold line-clamp-2">
                                                {book.title}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {item.pagesRead} / {item.totalPages}
                                            </p>

                                            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
};

export default ReadingPlaylist;