import mongoose  , {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const otpschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

otpschema.methods.isvalid = async function(otp) {
    return await bcrypt.compare(this.otp , otp)
}

export const Otp = mongoose.model("Otp",otpschema )

