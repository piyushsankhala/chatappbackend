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
    return jwt.sign({id : this._id},"0753c4e002c51ad26c2b8c47b7407e7c", {
        expiresIn : "7d"
    });

}
userschema.methods.getacesstoken = async function(){
    return jwt.sign({id : this._id},"9b5785c9178b8d044f2e552102035194", {
        expiresIn : "1d"
    });
}

export const User  = mongoose.model("User", userschema);