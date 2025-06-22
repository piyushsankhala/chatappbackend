import express from "express";
import {
  registeruser,
  loginuser,
  logoutuser,
  refreshacesstoken,
  currentuser,
  getallusers
} from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registeruser);
router.post("/login", loginuser);
router.post("/refresh-token", refreshacesstoken);

// Protected routes
router.get("/logout", verifyAccessToken, logoutuser);
router.get("/me", verifyAccessToken, currentuser);
router.get("/all", verifyAccessToken, getallusers);

export default router;
