import jwt from "jsonwebtoken";
import { User } from "../models/user.js";


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken ;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token,  "0753c4e002c51ad26c2b8c47b7407e7c");
         req.userId = decoded.id; 
        const user = await User.findById(decoded.id).select("-password -refreshtoken");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(token);
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}
