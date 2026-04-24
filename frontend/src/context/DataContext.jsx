import { createContext, useState, useEffect } from "react";

import booksData from "../data/books.json";
import usersData from "../data/users.json";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [books, setBooks] = useState(booksData);
    const [users, setUsers] = useState([]);
    const [collections, setCollections] = useState([]);

    // create collection
    const createCollection = (data, user) => {

        if (!data?.name || data.name.trim() === "") return;

        const newCollection = {
            id: "col_" + new Date().getTime(),
            name: data.name.trim(),
            userId: user.id,
            type: data.type || "custom",
            books: [],
        };

        setCollections((prev) => [...prev, newCollection]);
    };

    // liked collection
    const createLikedCollection = (userId) => {

        const exists = collections.find(
            (c) => c.userId === userId && c.type === "liked"
        );

        if (exists) return exists;

        const newLiked = {
            id: "liked_" + new Date().getTime(),
            name: "Liked Books",
            userId,
            type: "liked",
            books: [],
        };

        setCollections((prev) => [...prev, newLiked]);

        return newLiked;
    };

    // delete collection
    const deleteCollection = (collectionId) => {
        setCollections((prev) =>
            prev.filter((col) => col.id !== collectionId)
        );
    };

    // add book to collection (fixed)
    const addBookToCollection = (collectionId, book) => {

        setCollections((prev) =>
            prev.map((col) => {

                if (col.id !== collectionId) return col;

                const exists = col.books.find((b) => b.id === book.id);
                if (exists) return col;

                return { ...col, books: [...col.books, book] };
            })
        );
    };

    // remove book from collection (new)
    const removeBookFromCollection = (collectionId, bookId) => {

        setCollections((prev) =>
            prev.map((col) =>
                col.id === collectionId ? { ...col, books: col.books.filter((b) => b.id !== bookId) } : col)
        );
    };

    // clubs
    const [clubs, setClubs] = useState([
        {
            id: "club_1",
            name: "Sci-Fi Club",
            genre: "scifi",
            members: [],
            posts: [],
        },
    ]);

    // create club
    const createClub = (clubData, user) => {
        if (user.role !== "moderator") return;

        const newClub = {
            id: "club_" + new Date().getTime(),
            name: clubData.name,
            genre: clubData.genre,
            members: [],
            posts: [],
            createdBy: user.id,
            createdByRole: user.role,
        };

        setClubs((prev) => [...prev, newClub]);
    };

    // join club
    const joinClub = (clubId, user) => {
        setClubs((prev) =>
            prev.map((club) =>
                club.id === clubId ? { ...club, members: [...club.members, user.id] } : club)
        );
    };

    // leave club
    const leaveClub = (clubId, user) => {
        setClubs((prev) =>
            prev.map((club) =>
                club.id === clubId ? { ...club, members: club.members.filter((id) => id !== user.id) } : club)
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
            synopsis: "This book explores more of this genre and lot of insights",
            pages: 250
        };

        setBooks((prev) => [newBook, ...prev]);
    };

    // delete book
    const deleteBook = (bookId, user) => {
        if (!["admin", "moderator"].includes(user.role)) return;

        // remove from books
        setBooks((prev) =>
            prev.filter((book) => book.id !== bookId)
        );

        // remove from all collections
        setCollections((prev) =>
            prev.map((col) => ({ ...col, books: col.books.filter((b) => b.id !== bookId) }))
        );
    };

    // add post
    const addPost = (clubId, postData, user) => {
        const newPost = {
            id: "p_" + new Date().getTime(),
            content: postData.content,
            type: postData.type,
            createdBy: user.id,
            userName: user.name,
            createdAt: new Date().toString(),
        };

        setClubs((prev) =>
            prev.map((club) =>
                club.id === clubId ? { ...club, posts: [newPost, ...club.posts] } : club));
    };

    // delete post
    const deletePost = (clubId, postId) => {
        setClubs((prev) =>
            prev.map((club) =>
                club.id === clubId
                    ? { ...club, posts: club.posts.filter((p) => p.id !== postId) } : club
            )
        );
    };

    // get local storage users
    useEffect(() => {
        const getLocalUsers = () => {
            const storedUsers = localStorage.getItem("users");

            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            } else {
                setUsers(usersData);
            }
        };

        getLocalUsers();
    }, []);

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

            clubsJoined: [],
            createdAt: new Date().toString(),
            blockedUntil: null
        };

        setUsers((prev) => [...prev, newUser]);

        return newUser;
    };

    // block user
    const blockUser = (userId, duration) => {
        const now = new Date().getTime();

        setUsers((prev) =>
            prev.map((u) => {
                if (u.id !== userId) return u;
                if (u.role !== "user") return u;

                return { ...u, blockedUntil: now + duration };
            })
        );
    };

    // unblock user
    const unblockUser = (userId) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId ? { ...u, blockedUntil: null } : u)
        );
    };

    const valueProvider = {
        books,
        users,
        setUsers,
        registerUser,
        addBook,
        deleteBook,

        collections,
        createCollection,
        createLikedCollection,
        deleteCollection,
        addBookToCollection,
        removeBookFromCollection,

        clubs,
        createClub,
        joinClub,
        leaveClub,
        addPost,
        deletePost,

        blockUser,
        unblockUser
    };

    return (
        <DataContext.Provider value={valueProvider}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };