import {Chat} from "../models/chat.models.js";

const createChat = async (req, res) => {
    const { recieverid } = req.body;
    const users = [req.userId, reciever]
    if (!users || users.length < 2) {
        return res.status(400).json({ message: "At least two users are required to create a chat" });
    }   
    try{
        const existingChat = await Chat.findOne({ users: { $all: users } });
        if (existingChat) {
            return res.status(200).json({ message: "Chat already exists", chatId: existingChat._id });
        }

        const newChat = await Chat.create({ users , chatid: users.sort().join("_") });
        return res.status(201).json({
            message: "Chat created successfully",
            chatId: newChat._id,
        });
    }
    catch (error) {
        console.error("Error in createChat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}
 const acesschat = async (req, res) => {
     const { recieverid } = req.body;
    const users = [req.userId, reciever]
    if (!users || users.length < 2) {
        return res.status(400).json({ message: "At least two users are required to access a chat" });
    }   
    try {
        const chat = await Chat.findOne({ users: { $all: users } }).populate("users", "-password -refreshtoken").populate("messages");
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        return res.status(200).json({
            message: "Chat accessed successfully",
            chat,
        });
    } catch (error) {
        console.error("Error in acesschat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export { createChat, acesschat };

        