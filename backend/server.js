import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import bookPostRoutes from "./routes/bookPostRoutes.js";

// mongodb server is slow so using cloudflare dns
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// using cors to fetch the backend
app.use(cors({
    origin: process.env.BASE_UI,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// connect database
connectDB();

// test route
app.get("/", (req, res) => {
    res.send("Hello from bookey server");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/book-posts", bookPostRoutes);

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});