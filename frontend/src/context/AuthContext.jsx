import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const normalizeUser = (user) => {
    if (!user) return null;

    return {
        ...user,
        id: user.id || user._id,
        blockedUntil: user.blockedUntil ? new Date(user.blockedUntil).getTime() : null,
    };
};

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    // load user from localStorage
    useEffect(() => {
        const getStoredUser = () => {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                setCurrentUser(normalizeUser(JSON.parse(storedUser)));
            }
        };

        getStoredUser();
    }, []);

    // login
    const login = (userData) => {
        const normalized = normalizeUser(userData);
        setCurrentUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
    };

    // update current user after profile/user changes
    const updateCurrentUser = (userData) => {
        const normalized = normalizeUser(userData);
        setCurrentUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
    };

    // logout
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser: updateCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
