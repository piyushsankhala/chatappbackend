import express from "express";
import { createChat, accessChat } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Assuming JWT token middleware

const router = express.Router();

// All routes are protected with token
router.post("/create", verifyAccessToken, createChat);
router.post("/access", verifyAccessToken, accessChat);

export default router;
