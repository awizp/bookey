import { LoginForm } from "../components/auth";
import { Navbar, Footer } from "../components/landing";

const Login = () => {
    return (
        <>
            <title>Login | Bookey</title>

            <Navbar />

            <div className="min-h-screen flex items-center justify-center px-4 bg-bgLight dark:bg-darkBg">
                <div className="w-full max-w-5xl mx-auto">

                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        {/* banner */}
                        <div className="w-full flex justify-center items-center">
                            <img src="/login-banner.svg" alt="Login banner" className="w-full h-full object-contain" />
                        </div>

                        {/* form content */}
                        <LoginForm />

                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;