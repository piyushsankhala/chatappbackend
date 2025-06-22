import { message } from "../models/message.js";
import { Chat } from "../models/chat.models.js";

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;

        if (!receiverId || !content) {
            return res.status(400).json({ message: "Receiver ID and content are required" });
        }

        const senderId = req.userId;

        const chat = await Chat.findOne({ users: { $all: [senderId, receiverId] } });

        if (!chat) {
            return res.status(404).json({ message: "Chat does not exist" });
        }

        const newMessage = await message.create({
            sender: senderId,
            receiver: receiverId,
            content,
            chat: chat._id, // optional field in schema if you want
        });

        await Chat.findByIdAndUpdate(chat._id, {
            $push: { messages: newMessage._id },
            $set: { updatedAt: new Date() },
        });

        return res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.error("Error in sendMessage:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
