import { createContext, useState, useEffect } from "react";

import booksData from "../data/books.json";
import usersData from "../data/users.json";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [books] = useState(booksData);
    const [users, setUsers] = useState([]);

    // load users from localStorage
    useEffect(() => {
        const fetchUsers = () => {
            const storedUsers = localStorage.getItem("users");

            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            } else {
                setUsers(usersData);
            }
        };

        fetchUsers();
    }, []);

    // setting users in localStorage
    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, [users]);

    // register user
    const registerUser = (formData) => {
        const newUser = {
            id: "user_" + new Date().getTime(),
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: "user",

            readerType: formData.readerType,
            likedGenres: formData.likedGenres,
            selectedBooks: formData.selectedBooks,

            collections: [],
            clubsJoined: [],

            createdAt: new Date().toString(),
        };

        setUsers((prev) => [...prev, newUser]);

        return newUser;
    };

    return (
        <DataContext.Provider value={{ books, users, setUsers, registerUser }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };