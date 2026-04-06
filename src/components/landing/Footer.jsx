import {
    FaInstagram,
    FaTelegram,
    FaTwitter,
    FaEnvelope,
} from "react-icons/fa";
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {

    const { theme } = useContext(ThemeContext);

    return (
        <footer className="mt-10 bg-black text-white dark:bg-primary/70 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    {/* logo */}
                    <div className="space-y-5">
                        <div className="w-32 h-8">
                            <img
                                src={theme === "dark" ? "/dark-logo.png" : "/light-logo.png"}
                                alt="Bookey Logo"
                                className="w-full h-full object-fill"
                            />
                        </div>

                        <p className="text-sm text-gray-300 mt-2 dark:text-white/80">
                            Organize your reading journey in one place.
                        </p>
                    </div>

                    {/* navigation links */}
                    <div>
                        <h3 className="font-semibold mb-3">Navigation</h3>
                        <ul className="space-y-2 text-sm text-gray-300 dark:text-white/80">
                            <li><a href="#library" className="hover:text-primary dark:hover:text-black">Library</a></li>
                            <li><a href="#collections" className="hover:text-primary dark:hover:text-black">Collections</a></li>
                            <li><a href="#clubs" className="hover:text-primary dark:hover:text-black">Clubs</a></li>
                            <li><a href="#about" className="hover:text-primary dark:hover:text-black">About</a></li>
                        </ul>
                    </div>

                    {/* support */}
                    <div>
                        <h3 className="font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-300 dark:text-white/80">
                            <li className="hover:text-primary dark:hover:text-black cursor-pointer">
                                Contact
                            </li>
                            <li className="hover:text-primary dark:hover:text-black cursor-pointer">
                                Privacy Policy
                            </li>
                            <li className="hover:text-primary dark:hover:text-black cursor-pointer">
                                Terms of Service
                            </li>
                        </ul>
                    </div>

                    {/* social links */}
                    <div>
                        <h3 className="font-semibold mb-3">Connect</h3>

                        <div className="flex gap-4 text-lg">

                            <a href="#" className="hover:text-primary dark:hover:text-black transition">
                                <FaInstagram />
                            </a>

                            <a href="#" className="hover:text-primary dark:hover:text-black transition">
                                <FaTelegram />
                            </a>

                            <a href="mailto:your@email.com" className="hover:text-primary dark:hover:text-black transition">
                                <FaEnvelope />
                            </a>

                            <a href="#" className="hover:text-primary dark:hover:text-black transition">
                                <FaTwitter />
                            </a>

                        </div>
                    </div>

                </div>

                {/* copyright */}
                <div className="border-t border-white/20 dark:border-black/20 mt-10 pt-6 text-center text-sm text-gray-400 dark:text-white">
                    {new Date().getFullYear()} © Bookey. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;