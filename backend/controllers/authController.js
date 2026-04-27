import User from "../models/User.js";
import Collection from "../models/Collection.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// register user
export const registerUser = async (req, res) => {
    const {
        name,
        username,
        email,
        password,
        readerType,
        likedGenres,
        selectedBooks,
    } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            readerType,
            likedGenres: likedGenres || [],
            selectedBooks: selectedBooks || [],
            clubsJoined: [],
            blockedUntil: null,
        });

        await Collection.create({
            name: "Liked Books",
            userId: newUser._id,
            type: "liked",
            books: [],
        });

        const token = generateToken(newUser._id);

        res.status(201).json({
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            role: newUser.role,
            bio: newUser.bio,
            readerType: newUser.readerType,
            likedGenres: newUser.likedGenres,
            selectedBooks: newUser.selectedBooks,
            blockedUntil: newUser.blockedUntil,
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            bio: user.bio,
            readerType: user.readerType,
            likedGenres: user.likedGenres,
            selectedBooks: user.selectedBooks,
            blockedUntil: user.blockedUntil,
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
