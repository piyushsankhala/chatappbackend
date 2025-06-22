import express from "express";
import { createChat, acesschat } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Assuming JWT token middleware

const router = express.Router();

// All routes are protected with token
router.post("/create", authMiddleware, createChat);
router.post("/access", authMiddleware, acesschat);

export default router;
