import jwt from "jsonwebtoken";
import { User } from "../models/user.js";


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
         req.userId = decoded._id; 
        const user = await User.findById(decoded.id).select("-password -refreshtoken");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}
