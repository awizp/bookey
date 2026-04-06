import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";

const AppNavbar = ({ setIsOpen }) => {

    const { currentUser, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="h-16 bg-white dark:bg-darkCard rounded-2xl m-2 flex items-center justify-between px-4">

            {/* left side */}
            <div className="flex items-center gap-3">

                {/* mobile menu sidebar open */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-lg cursor-pointer"
                >
                    <FaBars />
                </button>

                <h2 className="font-semibold text-lg">
                    {currentUser?.name?.charAt(0).toUpperCase() + currentUser?.name?.slice(1)}
                </h2>
            </div>

            {/* right side */}
            <div className="relative" ref={dropdownRef}>

                {/* avatar */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
                >
                    {currentUser?.name?.charAt(0)}
                </button>

                {/* mobile dropdown menu */}
                {open && (
                    <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-darkCard border-2 border-black/10 rounded-xl shadow-lg p-3 z-50">

                        {/* user info */}
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="font-semibold text-primary">
                                {currentUser?.name}
                            </p>
                            <p className="text-xs text-white font-semibold bg-primary rounded-full w-fit px-3 py-1.5 flex justify-center items-center">
                                {currentUser?.role}
                            </p>
                        </div>

                        <div className="border-t my-2"></div>

                        {/* theme btn */}
                        <button
                            onClick={toggleTheme}
                            className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                        >
                            <span>{theme === 'dark' ? "Light" : "Dark"}</span>
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </button>

                        {/* logout */}
                        <button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="w-full border-2 mt-2 border-primary text-primary cursor-pointer flex justify-center items-center font-semibold text-left px-2 py-2 rounded-lg hover:bg-red-100 text-sm flex-nowrap"
                        >
                            Logout →
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
};

export default AppNavbar;