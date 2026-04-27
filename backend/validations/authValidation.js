import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    username: z.string().min(3),

    email: z.string().email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    readerType: z.string().optional(),

    likedGenres: z.array(z.string()).optional(),

    selectedBooks: z.array(z.string()).optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
