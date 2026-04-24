import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    // load user from localStorage
    useEffect(() => {
        const getStoredUser = () => {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        };

        getStoredUser();
    }, []);

    // login
    const login = (userData) => {
        setCurrentUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // logout
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };