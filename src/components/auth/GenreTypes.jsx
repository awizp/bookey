const GenreTypes = ({ form, setForm, next, prev, step = 2, totalSteps = 4 }) => {
    const genres = [
        "action", "adventure", "romance", "business", "self help",
        "mystery", "thriller", "horror", "spirituality",
        "young adult", "fiction", "scifi", "crime", "classics",
        "manga", "manhwa", "novel", "graphic novel", "fantasy", "philosophy"
    ];

    const toggleGenre = (genre) => {
        if (form.likedGenres.includes(genre)) {
            setForm({
                ...form,
                likedGenres: form.likedGenres.filter((g) => g !== genre),
            });
        } else {
            setForm({
                ...form,
                likedGenres: [...form.likedGenres, genre],
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg">

                {/* progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mb-6 overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                </div>

                {/* card */}
                <div className="bg-white/80 dark:bg-darkCard/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30">

                    {/* header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-primary">
                            What genres do you enjoy?
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Select all that match your interests
                        </p>
                    </div>

                    {/* chis to select */}
                    <div className="max-h-75 overflow-y-auto pr-1">
                        <div className="flex flex-wrap justify-center gap-3">

                            {genres.map((genre) => {
                                const isSelected = form.likedGenres.includes(genre);

                                return (
                                    <button
                                        key={genre}
                                        onClick={() => toggleGenre(genre)}
                                        className={`capitalize px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isSelected ? "bg-primary text-white shadow-md scale-105" : "bg-gray-100 dark:bg-gray-800 hover:bg-primary/20"}`}
                                    >
                                        {genre}
                                    </button>
                                );
                            })}

                        </div>
                    </div>

                    <div className="w-full flex justify-between gap-3 mt-8">

                        {/* back btn */}
                        <button
                            onClick={prev}
                            className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl"
                        >
                            Back
                        </button>

                        {/* continue btn */}
                        <button
                            onClick={next}
                            disabled={form.likedGenres.length === 0}
                            className="w-full cursor-pointer bg-primary text-white py-3 rounded-xl font-medium active:scale-95 transition disabled:opacity-50"
                        >
                            Continue
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

export default GenreTypes;