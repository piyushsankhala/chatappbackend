import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatid : {
        type: String,
        required: true,
        unique: true,
    },
    users: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
    }, { timestamps: true });

    export const Chat = mongoose.model("Chat", chatSchema);
