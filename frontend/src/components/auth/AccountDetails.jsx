import { useState } from "react";

const AccountDetails = ({ form, setForm, submit, prev, step = 4, totalSteps = 4, }) => {
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!form.name || !form.username || !form.email || !form.password || !form.confirmPassword) {
            setError("Please fill all fields");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        submit();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg">

                {/* progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mb-6 overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>

                <div className="bg-white/80 dark:bg-darkCard/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30">

                    {/* header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-primary">
                            Create your account
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Almost done! Just a few details
                        </p>
                    </div>

                    {/* user details form */}
                    <div className="space-y-4">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) => setForm({ ...form, username: e.target.value })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) => setForm({ ...form, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) => setForm({ ...form, password: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ${form.confirmPassword && form.password !== form.confirmPassword ? "focus:ring-red-400" : "focus:ring-primary"}`}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />

                    </div>

                    {/* error component */}
                    {error && (
                        <p className="text-red-500 text-sm mt-3 text-center">
                            {error}
                        </p>
                    )}

                    {/* next and prev btns */}
                    <div className="w-full flex flex-col sm:flex-row justify-between gap-3 mt-8">

                        <button
                            onClick={prev}
                            className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="order-first sm:order-last w-full cursor-pointer bg-primary text-white py-3 rounded-xl font-medium active:scale-95 transition"
                        >
                            Create Account
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

export default AccountDetails;