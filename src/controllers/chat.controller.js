import {Chat} from "../models/chat.models.js";
import {User} from "../models/user.js";
const createchat = async (req, res) => {
    try{
        const { recieverid } = req.body;
        if (!recieverid) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }
        const senderId = req.user._id;
        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized" });   
        }
        const sender = await User.findById(senderId);
        if (!sender) { 
            return res.status(404).json({ message: "Sender not found" });
        }
        const reciever = await User.findById(recieverid);
        if (!reciever) {
            return res.status(404).json({ message: "Receiver not found" });
        }
        const existingChat = await Chat.findOne({
            users: { $all: [sender, reciever] }
        }).populate("users")
        if(existingChat) {
            return res.status(200).json({ data: existingChat, recieverid: reciever._id });
            
        }
        const newChat = Chat.create({
            users: [sender, reciever],   
            messages: []    
        });
        return res.status(201).json({ data: newChat, recieverid: reciever._id });
    }
    catch (error) {
        console.error("Error in fetchchat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

  const acesschat = async (req, res) => {
    try {
        const {recieverid} = req.body
        const senderId = req.user._id;
        if (!recieverid) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }
        if (!userId) {
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
        const users = [sender._id, reciever._id];
        const chats = await Chat.find({ users }).populate("users");
        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: "No chats found" });
        }
        return res.status(200).json({ data: chats });
    } catch (error) {
        console.error("Error in acessorcreateChat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export { acesschat, createchat  };

        