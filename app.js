import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import chatRoutes from './src/routes/chat.route.js';
import userRoutes from './src/routes/use.routes.js'; // ✅ FIXED
import messageRoutes from './src/routes/messages.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.cors_origin, // Use the environment variable for the client URL
    credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
