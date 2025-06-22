import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import chatRoutes from './src/routes/chat.route.js';
import userRoutes from './src/routes/use.routes.js';
import messageRoutes from './src/routes/messages.routes.js';

const app = express();

app.use(cors({
    origin:process.env.cors_origin 

}))
app.use(cookieParser());
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});

export {app}