import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleLogin = () => {
        const result = login(form.email, form.password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/app");
    };

    return (
        <div className="w-full max-w-md mx-auto">

            {/* content */}
            <div className="mb-6 space-y-2">
                <h2 className="text-2xl font-bold text-primary">
                    Continue Your Reading Journey!
                </h2>
                <p className="text-gray-500 text-sm mt-1 font-semibold">
                    Access your collections, track your progress, and discover books tailored to your taste.
                </p>
            </div>

            {/* form data */}
            <div className="bg-white dark:bg-darkCard p-10 rounded-2xl shadow-sm">

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-500 block mb-1 font-semibold">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500 block mb-1 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>

                </div>

                {/* error */}
                {error && (
                    <p className="text-red-500 text-sm mt-3 text-center">
                        {error}
                    </p>
                )}

                {/* login btn */}
                <button
                    onClick={handleLogin}
                    className="mt-6 w-full font-semibold bg-primary text-white py-3 rounded-xl active:scale-95 transition cursor-pointer"
                >
                    Sign In
                </button>

                {/* divider from signup */}
                <div className="flex items-center gap-2 my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <p className="text-xs text-gray-400">OR</p>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* CTA to signup */}
                <p className="text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-primary font-medium hover:underline"
                    >
                        Create one
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginForm;