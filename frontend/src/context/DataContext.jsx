import { createContext, useCallback, useContext, useEffect, useState } from "react";

import booksData from "../data/books.json";
import usersData from "../data/users.json";
import { apiRequest } from "../api/api";
import { AuthContext } from "./AuthContext";

const DataContext = createContext();

const getId = (value) => {
    if (!value) return value;
    if (typeof value === "string") return value;
    return value.id || value._id;
};

const normalizeUser = (user) => ({
    ...user,
    id: getId(user),
    blockedUntil: user.blockedUntil ? new Date(user.blockedUntil).getTime() : null,
});

const normalizeBook = (book) => {
    if (!book) return null;

    return {
        ...book,
        id: getId(book),
        genre: Array.isArray(book.genre) ? book.genre : book.genre ? [book.genre] : [],
    };
};

const normalizeCollection = (collection, books = []) => ({
    ...collection,
    id: getId(collection),
    userId: getId(collection.userId),
    type: collection.type === "normal" ? "custom" : collection.type,
    books: (collection.books || []).filter(Boolean).map((book) => {
        if (typeof book === "string") {
            return books.find((item) => item.id === book) || { id: book };
        }

        return normalizeBook(book);
    }),
});

const normalizeClub = (club) => ({
    ...club,
    id: getId(club),
    createdBy: getId(club.createdBy),
    members: Array.isArray(club.members) ? club.members.map(getId) : [],
    memberCount: club.memberCount || (Array.isArray(club.members) ? club.members.length : Number(club.members) || 0),
    posts: (club.posts || []).map((post) => ({
        ...post,
        id: getId(post),
        createdBy: getId(post.createdBy),
    })),
});

const DataProvider = ({ children }) => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const [books, setBooks] = useState(booksData.map(normalizeBook).filter(Boolean));
    const [users, setUsers] = useState(usersData.map(normalizeUser));
    const [collections, setCollections] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleError = (err) => {
        setError(err.message || "Something went wrong");
        throw err;
    };

    const loadBooks = useCallback(async () => {
        try {
            const data = await apiRequest("/books");
            setBooks(data.map(normalizeBook).filter(Boolean));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const loadClubs = useCallback(async () => {
        try {
            const data = await apiRequest("/clubs");
            setClubs(data.map(normalizeClub));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const loadUsers = useCallback(async () => {
        if (!currentUser) {
            setUsers(usersData.map(normalizeUser));
            return;
        }

        if (!["admin", "moderator"].includes(currentUser.role)) {
            setUsers([normalizeUser(currentUser)]);
            return;
        }

        try {
            const data = await apiRequest("/users");
            setUsers(data.map(normalizeUser));
        } catch (err) {
            setError(err.message);
        }
    }, [currentUser]);

    const loadCollections = useCallback(async () => {
        if (!currentUser) {
            setCollections([]);
            return;
        }

        try {
            const data = await apiRequest("/collections");
            setCollections(data.map((collection) => normalizeCollection(collection, books)));
        } catch (err) {
            setError(err.message);
        }
    }, [books, currentUser]);

    useEffect(() => {
        loadBooks();
        loadClubs();
    }, [loadBooks, loadClubs]);

    useEffect(() => {
        loadCollections();
        loadUsers();
    }, [loadCollections, loadUsers]);

    const refreshData = async () => {
        setLoading(true);
        try {
            await Promise.all([loadBooks(), loadClubs(), loadCollections(), loadUsers()]);
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (formData) => {
        try {
            const data = await apiRequest("/auth/register", "POST", {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                readerType: formData.readerType,
                likedGenres: formData.likedGenres,
                selectedBooks: formData.selectedBooks,
            });

            return normalizeUser(data);
        } catch (err) {
            return handleError(err);
        }
    };

    const loginUser = async (formData) => {
        try {
            const data = await apiRequest("/auth/login", "POST", {
                email: formData.email,
                password: formData.password,
            });
            const user = normalizeUser(data);

            setCurrentUser(user);
            setUsers((prev) => {
                const exists = prev.some((item) => item.id === user.id);

                if (exists) {
                    return prev.map((item) => item.id === user.id ? user : item);
                }

                return [user, ...prev];
            });

            return user;
        } catch (err) {
            return handleError(err);
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const updated = normalizeUser(await apiRequest("/users/profile", "PUT", profileData));

            setUsers((prev) =>
                prev.map((user) => user.id === updated.id ? { ...user, ...updated } : user)
            );
            setCurrentUser({ ...currentUser, ...updated, token: currentUser.token });

            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const updateUserRole = async (userId, role) => {
        try {
            const updated = normalizeUser(await apiRequest(`/users/${userId}/role`, "PATCH", { role }));
            setUsers((prev) => prev.map((user) => user.id === userId ? updated : user));
            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await apiRequest(`/users/${userId}`, "DELETE");
            setUsers((prev) => prev.filter((user) => user.id !== userId));
        } catch (err) {
            return handleError(err);
        }
    };

    const blockUser = async (userId, duration) => {
        try {
            const updated = normalizeUser(await apiRequest(`/users/${userId}/block`, "PATCH", { duration }));
            setUsers((prev) => prev.map((user) => user.id === userId ? updated : user));
            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const unblockUser = async (userId) => {
        try {
            const updated = normalizeUser(await apiRequest(`/users/${userId}/unblock`, "PATCH"));
            setUsers((prev) => prev.map((user) => user.id === userId ? updated : user));
            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const createCollection = async (data) => {
        try {
            if (!data?.name?.trim()) return null;

            const created = await apiRequest("/collections", "POST", {
                name: data.name.trim(),
                type: data.type || "custom",
            });
            const normalized = normalizeCollection(created, books);

            setCollections((prev) => [...prev, normalized]);

            return normalized;
        } catch (err) {
            return handleError(err);
        }
    };

    const createLikedCollection = async () => {
        const existing = collections.find(
            (collection) => collection.userId === currentUser?.id && collection.type === "liked"
        );

        if (existing) return existing;

        return createCollection({ name: "Liked Books", type: "liked" });
    };

    const deleteCollection = async (collectionId) => {
        try {
            await apiRequest(`/collections/${collectionId}`, "DELETE");
            setCollections((prev) => prev.filter((collection) => collection.id !== collectionId));
        } catch (err) {
            return handleError(err);
        }
    };

    const addBookToCollection = async (collectionId, book) => {
        try {
            const updated = await apiRequest("/collections/add-book", "POST", {
                collectionId,
                bookId: book.id,
            });
            const normalized = normalizeCollection(updated, books);

            setCollections((prev) =>
                prev.map((collection) => collection.id === collectionId ? normalized : collection)
            );

            return normalized;
        } catch (err) {
            return handleError(err);
        }
    };

    const removeBookFromCollection = async (collectionId, bookId) => {
        try {
            const updated = await apiRequest("/collections/remove-book", "POST", {
                collectionId,
                bookId,
            });
            const normalized = normalizeCollection(updated, books);

            setCollections((prev) =>
                prev.map((collection) => collection.id === collectionId ? normalized : collection)
            );

            return normalized;
        } catch (err) {
            return handleError(err);
        }
    };

    const addBook = async (bookData) => {
        try {
            const created = normalizeBook(await apiRequest("/books", "POST", {
                title: bookData.title,
                author: bookData.author,
                image: bookData.image,
                genre: bookData.genre,
                description: bookData.description || "",
                synopsis: bookData.synopsis || "",
                pages: bookData.pages || 250,
            }));

            setBooks((prev) => [created, ...prev]);

            return created;
        } catch (err) {
            return handleError(err);
        }
    };

    const deleteBookFromPlatform = async (bookId) => {
        try {
            await apiRequest(`/books/${bookId}`, "DELETE");
            setBooks((prev) => prev.filter((book) => book.id !== bookId));
            setCollections((prev) =>
                prev.map((collection) => ({
                    ...collection,
                    books: collection.books.filter((book) => book.id !== bookId),
                }))
            );
        } catch (err) {
            return handleError(err);
        }
    };

    const createClub = async (clubData) => {
        try {
            const created = normalizeClub(await apiRequest("/clubs", "POST", clubData));
            setClubs((prev) => [created, ...prev]);
            return created;
        } catch (err) {
            return handleError(err);
        }
    };

    const joinClub = async (clubId) => {
        try {
            const data = await apiRequest(`/clubs/${clubId}/join`, "POST");
            const updated = normalizeClub(data.club);
            setClubs((prev) => prev.map((club) => club.id === clubId ? updated : club));
            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const leaveClub = async (clubId) => {
        try {
            const data = await apiRequest(`/clubs/${clubId}/leave`, "POST");
            const updated = normalizeClub(data.club);
            setClubs((prev) => prev.map((club) => club.id === clubId ? updated : club));
            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const deleteClub = async (clubId) => {
        try {
            await apiRequest(`/clubs/${clubId}`, "DELETE");
            setClubs((prev) => prev.filter((club) => club.id !== clubId));
        } catch (err) {
            return handleError(err);
        }
    };

    const addPost = async (clubId, postData) => {
        try {
            const updated = normalizeClub(await apiRequest(`/clubs/${clubId}/posts`, "POST", {
                content: postData.content,
                type: postData.type || "text",
            }));

            setClubs((prev) => prev.map((club) => club.id === clubId ? updated : club));

            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const deletePost = async (clubId, postId) => {
        try {
            const updated = normalizeClub(await apiRequest(`/clubs/${clubId}/posts/${postId}`, "DELETE"));

            setClubs((prev) => prev.map((club) => club.id === clubId ? updated : club));

            return updated;
        } catch (err) {
            return handleError(err);
        }
    };

    const valueProvider = {
        books,
        users,
        setUsers,
        registerUser,
        loginUser,
        updateProfile,
        updateUserRole,
        deleteUser,
        addBook,
        deleteBook: deleteBookFromPlatform,

        collections,
        createCollection,
        createLikedCollection,
        deleteCollection,
        addBookToCollection,
        removeBookFromCollection,

        clubs,
        setClubs,
        createClub,
        joinClub,
        leaveClub,
        deleteClub,
        addPost,
        deletePost,

        blockUser,
        unblockUser,

        loading,
        error,
        refreshData,
    };

    return (
        <DataContext.Provider value={valueProvider}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
