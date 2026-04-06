const ReaderType = ({ form, setForm, next, step = 1, totalSteps = 4 }) => {
    const types = [
        {
            key: "beginner",
            label: "Beginner",
            desc: "Just starting your reading journey",
        },
        {
            key: "regular",
            label: "Regular Reader",
            desc: "Reading consistently and often",
        },
        {
            key: "occasional",
            label: "Occasional Reader",
            desc: "Reading whenever you find time",
        },
    ];

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
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-primary">
                            What kind of reader are you?
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            This helps us personalize your experience
                        </p>
                    </div>

                    {/* chips to select */}
                    <div className="flex flex-wrap justify-center gap-3">

                        {types.map((type) => {
                            const isSelected = form.readerType === type.key;

                            return (
                                <button
                                    key={type.key}
                                    onClick={() =>
                                        setForm({ ...form, readerType: type.key })
                                    }
                                    className={`px-5 py-3 rounded-full text-sm flex justify-center items-center flex-col font-medium transition-all duration-200 text-left ${isSelected ? "bg-primary text-white shadow-md scale-105" : "bg-gray-100 dark:bg-gray-800 hover:bg-primary/20"}`}
                                >
                                    <div className="font-semibold">{type.label}</div>
                                    <div className="text-xs opacity-80 font-semibold text-center">
                                        {type.desc}
                                    </div>
                                </button>
                            );
                        })}

                    </div>

                    {/* continue btn */}
                    <button
                        onClick={next}
                        disabled={!form.readerType}
                        className="mt-8 w-full bg-primary text-white py-3 rounded-xl font-medium active:scale-95 transition disabled:opacity-50 cursor-pointer"
                    >
                        Continue
                    </button>

                    {/* steps informer */}
                    <p className="mt-4 text-center text-xs text-gray-400">
                        Step {step} of {totalSteps}
                    </p>

                </div>

            </div>
        </div>
    );
};

export default ReaderType;