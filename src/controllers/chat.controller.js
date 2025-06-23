import {Chat} from "../models/chat.models.js";
import {User} from "../models/user.js";
const acessorcreateChat = async (req, res) => {
  const {recieverid} = req.body;
  if(!recieverid){
    return res.status(404).json({message :"reciever id is not provided"})

  }
    if (req.userid === recieverid) {
        return res.status(400).json({ message: "You cannot create a chat with yourself" });
    }
    const reciever = await User.findById(recieverid).select("-password -refreshtoken");
    if (!reciever) {
        return res.status(404).json({ message: "Receiver not found" });
    }
    const sender = await User.findById(req.userId).select("-password -refreshtoken");
    if (!sender) {  
        return res.status(404).json({ message: "Sender not found" });
    }
    try {
        let chat = await Chat.findOne({ users: { $all: [reciever, sender] } });
        if (chat) {
            return res.status(200).json({
                message: "Chat already exists",
                chat,
            });
        }
        chat = await Chat.create({
            users: [reciever,sender],
            messages: [],
        });

        await chat.populate("users", "-password -refreshtoken").populate("messages");
        return res.status(201).json({
            message: "Chat created successfully",
            chat,
        });
    } catch (error) {
        console.error("Error in createChat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }




  
  
}
 
export { acessorcreateChat };

        