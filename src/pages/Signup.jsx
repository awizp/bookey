import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../context/DataContext";

import { ReaderType, GenreTypes, LikedBooks, AccountDetails } from "../components/auth";
import { Navbar, Footer } from "../components/landing";

const Signup = () => {
    const { books, registerUser } = useContext(DataContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        readerType: "",
        likedGenres: [],
        selectedBooks: [],
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Submit final step
    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Register user
        registerUser(form);

        // Redirect to login
        navigate("/login");
    };

    return (
        <>
            <title>Sign up with your credentials | Bookey</title>

            <Navbar />

            <div className="w-full py-5">
                <div className="container mx-auto px-4 md:px-0">
                    <div className="space-y-3">

                        {/* header */}
                        <div className="text-center mt-6 mb-15">
                            <h1 className="text-2xl font-bold text-primary">
                                Start Your Reading Journey!
                            </h1>
                            <p className="text-gray-500 text-sm mt-2">
                                Tell us your preferences and we’ll build a personalized reading experience just for you.
                            </p>
                        </div>


                        <div className="w-full flex flex-col md:flex-row gap-10 justify-center md:justify-between items-center">
                            {/* banner */}
                            <div className="w-full flex justify-center items-center">
                                <img src="/login-banner.svg" alt="Login banner" className="w-full h-full object-contain" />
                            </div>

                            {/* steps */}
                            <div className="w-full">
                                {step === 1 && (
                                    <ReaderType
                                        form={form}
                                        setForm={setForm}
                                        next={() => setStep(2)}
                                        step={1}
                                        totalSteps={4}
                                    />
                                )}

                                {step === 2 && (
                                    <GenreTypes
                                        form={form}
                                        setForm={setForm}
                                        next={() => setStep(3)}
                                        prev={() => setStep(1)}
                                        step={2}
                                        totalSteps={4}
                                    />
                                )}

                                {step === 3 && (
                                    <LikedBooks
                                        form={form}
                                        setForm={setForm}
                                        books={books}
                                        next={() => setStep(4)}
                                        prev={() => setStep(2)}
                                        step={3}
                                        totalSteps={4}
                                    />
                                )}

                                {step === 4 && (
                                    <AccountDetails
                                        form={form}
                                        setForm={setForm}
                                        submit={handleSubmit}
                                        prev={() => setStep(3)}
                                        step={4}
                                        totalSteps={4}
                                    />
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Signup;