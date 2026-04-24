import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// register user
export const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

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
        });

        const token = generateToken(newUser._id);

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            role: newUser.role,
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
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};