const LikedBooks = ({
    form,
    setForm,
    books,
    next,
    prev,
    step = 3,
    totalSteps = 4,
}) => {

    // Filter books based on selected genres
    const filteredBooks = books.filter((book) =>
        book.genre.some((g) => form.likedGenres.includes(g))
    );

    // Toggle selection (max 3)
    const toggleBook = (id) => {
        if (form.selectedBooks.includes(id)) {
            setForm({
                ...form,
                selectedBooks: form.selectedBooks.filter((b) => b !== id),
            });
        } else if (form.selectedBooks.length < 3) {
            setForm({
                ...form,
                selectedBooks: [...form.selectedBooks, id],
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-3xl">

                {/* progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mb-6 overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>

                <div className="bg-white/80 dark:bg-darkCard/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/30">

                    {/* header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-primary">
                            Pick 3 books you've read
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            We'll use this to personalize your feed
                        </p>
                    </div>

                    {/* book grid */}
                    <div className="max-h-100 overflow-y-auto pr-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                            {filteredBooks.map((book) => {
                                const isSelected = form.selectedBooks.includes(book.id);

                                return (
                                    <div
                                        key={book.id}
                                        onClick={() => toggleBook(book.id)}
                                        className={`relative cursor-pointer rounded-xl overflow-hidden border transition-all duration-200 ${isSelected ? "border-primary scale-105 shadow-md" : "border-gray-200 dark:border-gray-700 hover:border-primary"}`}
                                    >
                                        {/* book image */}
                                        <div className="h-40 bg-gray-200">
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* content */}
                                        <div className="p-2">
                                            <p className="text-sm font-semibold line-clamp-2">
                                                {book.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {book.author}
                                            </p>
                                        </div>

                                        {/* selected badge */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                        </div>
                    </div>

                    {/* next and prev btns */}
                    <div className="w-full flex justify-between gap-3 mt-8">

                        <button
                            onClick={prev}
                            className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl"
                        >
                            Back
                        </button>

                        <button
                            onClick={next}
                            disabled={form.selectedBooks.length !== 3}
                            className="w-full bg-primary cursor-pointer text-white py-3 rounded-xl font-medium active:scale-95 transition disabled:opacity-50"
                        >
                            Continue ({form.selectedBooks.length}/3)
                        </button>

                    </div>

                    {/* steps */}
                    <p className="mt-4 text-center text-xs text-gray-400">
                        Step {step} of {totalSteps}
                    </p>

                </div>

            </div>
        </div>
    );
};

export default LikedBooks;