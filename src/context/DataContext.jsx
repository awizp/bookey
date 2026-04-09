import { createContext, useState, useEffect } from "react";

import booksData from "../data/books.json";
import usersData from "../data/users.json";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [books, setBooks] = useState(booksData);
    const [users, setUsers] = useState([]);
    const [collections, setCollections] = useState([]);

    // create Collection
    const createCollection = (name) => {
        const newCollection = {
            id: "c_" + new Date().getTime(),
            name,
            books: [],
        };

        setCollections((prev) => [...prev, newCollection]);
    };

    // Add Book to Collection
    const addBookToCollection = (collectionId, book) => {
        setCollections((prev) =>
            prev.map((col) => col.id === collectionId ? { ...col, books: [...col.books, book] } : col));
    };

    // clubs State
    const [clubs, setClubs] = useState([
        {
            id: "club_1",
            name: "Sci-Fi Club",
            genre: "scifi",
            members: [],
            posts: [],
        },
    ]);

    // create Club
    const createClub = (clubData, user) => {
        if (user.role !== "moderator") return;

        const newClub = {
            id: "club_" + new Date().getTime(),
            name: clubData.name,
            genre: clubData.genre,
            members: [],
            posts: [],
        };

        setClubs((prev) => [...prev, newClub]);
    };

    // join Club
    const joinClub = (clubId, user) => {
        setClubs((prev) =>
            prev.map((club) =>
                club.id === clubId ? {
                    ...club,
                    members: [...club.members, user.id],
                }
                    : club
            )
        );
    };

    // leave Club
    const leaveClub = (clubId, user) => {
        setClubs((prev) =>
            prev.map((club) =>
                club.id === clubId ? {
                    ...club,
                    members: club.members.filter((id) => id !== user.id),
                }
                    : club
            )
        );
    };

    // add book
    const addBook = (bookData) => {
        const newBook = {
            id: "b_" + new Date().getTime(),
            title: bookData.title,
            author: bookData.author,
            image: bookData.image,
            genre: bookData.genre,
            description: "",
        };

        setBooks((prev) => [newBook, ...prev]);
    };

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
        <DataContext.Provider value={{ books, users, setUsers, registerUser, addBook, collections, createCollection, addBookToCollection, clubs, createClub, joinClub, leaveClub }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };