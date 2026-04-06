import { createContext, useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { users } = useContext(DataContext);

    const [currentUser, setCurrentUser] = useState(null);

    // load user from localStorage on refresh
    useEffect(() => {
        const getUser = () => {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        };

        getUser();
    }, []);

    // login function
    const login = (email, password) => {
        if (!email || !password) {
            return { success: false, message: "Please fill all fields" };
        }

        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }

        // save to state + localStorage
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));

        return { success: true, user };
    };

    // logout
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };