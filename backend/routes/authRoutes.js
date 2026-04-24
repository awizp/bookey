import express from "express";

import { registerUser, loginUser } from "../controllers/authController.js";
import validate from "../middleware/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";

const router = express.Router();

// register
router.post("/register", validate(registerSchema), registerUser);

// login
router.post("/login", validate(loginSchema), loginUser);

export default router;