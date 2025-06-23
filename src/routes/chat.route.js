import express from "express";
import { acessorcreateChat } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Assuming JWT token middleware

const router = express.Router();

// All routes are protected with token
router.post("/acessorcreate", authMiddleware, acessorcreateChat);


export default router;
