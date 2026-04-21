const TrackingSection = ({ title, data }) => {

    return (
        <div className="bg-white dark:bg-darkCard rounded-2xl p-4 space-y-3">

            <h3 className="font-semibold text-sm">
                {title}
            </h3>

            {data.length === 0 ? (
                <p className="text-xs text-gray-500">
                    No books here
                </p>
            ) : (

                <div className="flex gap-3 overflow-x-auto">

                    {data.map(({ bookId, book }) => {

                        if (!book) return null;

                        return (
                            <div
                                key={bookId}
                                className="min-w-25 shrink-0"
                            >

                                <div className="w-full h-36 rounded-xl overflow-hidden">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <p className="text-xs mt-1 line-clamp-2">
                                    {book.title}
                                </p>

                            </div>
                        );
                    })}

                </div>

            )}

        </div>
    );
};

export default TrackingSection;