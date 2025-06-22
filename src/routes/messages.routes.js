import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send", verifyAccessToken, sendMessage);

export default router;
