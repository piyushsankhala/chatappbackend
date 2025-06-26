import {Chat} from "../models/chat.models.js";
import {User} from "../models/user.js";
const createchat = async (req, res) => {
    try {
        console.log("👉 req.user in createchat:", req.user);
        const { recieverid } = req.body;
        console.log("📩 Reciever ID:", recieverid);

        if (!recieverid) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        const senderId = req.user?._id;
        console.log("🧑 Sender ID:", senderId);

        const sender = await User.findById(senderId);
        const reciever = await User.findById(recieverid);

        if (!sender || !reciever) {
            console.log("❌ Sender or Receiver not found");
            return res.status(404).json({ message: "Sender or receiver not found" });
        }

        const existingChat = await Chat.findOne({
            users: { $all: [sender._id, reciever._id] },
        }).populate("users");

        if (existingChat) {
            console.log("💬 Existing chat found");
            return res.status(200).json({ message: "Chat already exists", data: existingChat });
        }

        const newChat = await Chat.create({
            users: [sender._id, reciever._id],
            messages: [],
        });

        console.log("✅ New chat created:", newChat._id);

        return res.status(201).json({ data: newChat });
    } catch (error) {
        console.error("🔥 Error in createchat:", error.message);
        console.error(error.stack);
        return res.status(500).json({ message: "Internal server error" });
    }
};


  const acesschat = async (req, res) => {
    try {
        const {recieverid} = req.body
        const senderId = req.user._id;
        if (!recieverid) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }
        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const sender= await User.findById(senderId);
        const reciever = await User.findById(recieverid);
        if (!sender) {  
            return res.status(404).json({ message: "Sender not found" });
        }
        if (!reciever) {
            return res.status(404).json({ message: "Receiver not found" });
        }
        const users = [sender, reciever];
      const chats = await Chat.findOne({ users: { $all: [sender._id, reciever._id] } }).populate("users").populate("messages")

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: "No chats found" });
        }
        return res.status(200).json({ data: chats });
    } catch (error) {
  console.error("Error in acessorcreateChat:", error.message);
  console.error(error.stack);
  return res.status(500).json({ message: "Internal server error" });
}
}
export { acesschat, createchat  };

        