import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="sticky top-0 z-50 bg-bgLight/80 dark:bg-darkBg/80 backdrop-blur shadow-xs">
            <div className="container mx-auto px-4">

                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="w-32 h-8">
                        <img
                            src={theme === "dark" ? "/light-logo.png" : "/dark-logo.png"}
                            alt="Bookey Logo"
                            className="w-full h-full object-fill"
                        />
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex gap-6 items-center font-semibold">
                        <div className="flex items-center gap-6 mr-15">
                            <a href="#library" className="hover:text-primary">Library</a>
                            <a href="#collections" className="hover:text-primary">Collections</a>
                            <a href="#clubs" className="hover:text-primary">Clubs</a>
                        </div>

                        <button onClick={toggleTheme} className="cursor-pointer p-1">
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </button>

                        <Link
                            to="/login"
                            className="bg-primary px-4 py-2 rounded-full text-white hover:opacity-90"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-xl cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-bgLight dark:bg-darkBg font-semibold">
                    <div className="flex gap-3 flex-col">
                        <a href="#library">Library</a>
                        <a href="#collections">Collections</a>
                        <a href="#clubs">Clubs</a>
                    </div>

                    <div className="flex justify-center items-center gap-6">
                        <button onClick={toggleTheme} className="cursor-pointer">
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </button>

                        <Link
                            to="/login"
                            className="bg-primary px-4 py-2 rounded-full text-white cursor-pointer"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;