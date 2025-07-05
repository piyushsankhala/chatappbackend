import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userschema = new Schema({
    email : {
        type : String,
        required : [true, "Please provide your name"],
        unique : true,
        trim : true,
        
    },

    password : {
        type : String,
        required : [true, "Please provide your password"],
    },
    
    refreshtoken :{

        type : String,
        default : null,
    }

},
{
    timestamps : true,
}

);

userschema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})
    
   

userschema.methods.ispasswordvalid = async function(password){
    return await bcrypt.compare(password,this.password);
}

userschema.methods.getrefreshtoken = async function(){
    return jwt.sign({id : this._id},process.env.REFRESH_TOKEN_SECRET, {
        expiresIn : "7d"
    });

}
userschema.methods.getacesstoken = async function(){
    return jwt.sign({id : this._id},process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "1d"
    });
}

export const User  = mongoose.model("User", userschema);
