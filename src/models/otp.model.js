import mongoose  , {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const otpschema = new mongoose.Schema({
   
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

otpschema.methods.isvalid = function(inputOtp) {
    return this.otp === inputOtp;
};


export const Otp = mongoose.model("Otp",otpschema )

