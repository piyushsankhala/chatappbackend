import express from "express";
import {
  registeruser,
  loginuser,
  logoutuser,
  refreshacesstoken,
  currentuser,
  getallusers
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registeruser);
router.post("/login", loginuser);
router.post("/refresh", refreshacesstoken);

// Protected routes
router.get("/logout",authMiddleware, logoutuser);
router.get("/me", authMiddleware, currentuser);
router.get("/all",authMiddleware, getallusers);

export default router;
