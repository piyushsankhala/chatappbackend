import {User} from '../models/user.js';

const registeruser =async(req,res) =>{
    try{
        
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false , message: "Please provide all required fields"});
        }
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message: "User already exists"});
        }
        const newuser = await User.create({email,password});
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        }
        )
       
    }
    catch(error){
        console.error("Error in registeruser:", error);
        return res.status(500).json({message: "Internal server error"});
    }


}

const loginuser = async(req,res) =>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message: "Please provide all required fields"});
        }
        const existinguser = await User.findOne({email});
        if(!existinguser){
            return res.status(400).json({message: "User does not exist"});
        }
        const ispasswordvalid = await existinguser.ispasswordvalid(password);
        if(!ispasswordvalid){
            return res.status(400).json({message: "Invalid password"});
        }
        const accesstoken = await existinguser.getacesstoken();
        const refreshtoken = await existinguser.getrefreshtoken();
        existinguser.refreshtoken = refreshtoken;
        await existinguser.save();
        const options = {
            httpOnly : true,
            secure : true, // Set to true if using HTTPS

        }

        return res.status(200).cookie("accesstoken",accesstoken,options).cookie("refreshtoken",refreshtoken,options).json({
            
                existinguser: {
                    _id: existinguser._id,
                    email: existinguser.email,
                },
            success: true,
            message: "User logged in successfully",
            accesstoken,
            refreshtoken,
        }
        )

       




    }
    catch(error){
        console.error("Error in loginuser:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const logoutuser = async(req,res) =>{
    try{
        const options = {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now())
        };
        return res.status(200).clearCookie("accesstoken", options).clearCookie("refreshtoken", options).json({
            message: "User logged out successfully"
        });
    
    }
    catch(error){
        console.error("Error in logoutuser:", error);
        return res.status(500).json({message: "Internal server error"});
    }

}

const refreshacesstoken = async(req,res) =>{
    try{
        const refreshtoken = req.cookies.refreshtoken;
        if(!refreshtoken){
            return res.status(400).json({message: "Please provide a valid refresh token"});
        }
        const existinguser = await User.findOne({refreshtoken});
        if(!existinguser){
            return res.status(400).json({message: "User does not exist"});
        }
        if(refreshtoken!== existinguser.refreshtoken){
            return res.status(400).json({message: "Invalid refresh token"});
        }
        const accesstoken = await existinguser.getacesstoken();
        const newrefershtoken = await existinguser.getrefreshtoken();
        existinguser.refreshtoken = newrefershtoken;
        await existinguser.save();
       const options = {
            httpOnly: true,
            secure: false, 
            sameSite: "Lax", 
            path : "/" 
       }

        return res.status(200).cookie("accesstoken", accesstoken, options)
            .cookie("refreshtoken", newrefershtoken, options)
            .json({
                message: "Access token refreshed successfully",
                accesstoken,
                newrefershtoken
            });
        
    }
    catch(error){
        console.error("Error in refreshacesstoken:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
 const currentuser = async(req,res) =>{
    try{
        const userId = req.user._id; // Assuming user is set in req.user by auth middleware
        const existinguser = await User.findById(userId).select("-password -refreshtoken");
        if (!existinguser) {
            return res.status(404).json({ message: "User not found" });
        }


        return res.status(200).json({
            message: "Current user retrieved successfully",
            data: existinguser
        }); 
    }
    catch(error){
        console.error("Error in currentuser:", error);
        return res.status(500).json({message: "Internal server error"});
    }   
}

const getallusers = async(req,res) =>{
    try{
        const users = await User.find().select("-password -refreshtoken");
        return res.status(200).json({
            message: "All users retrieved successfully",
            data: users
        });
    }
    catch(error){
        console.error("Error in getallusers:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}   
export { registeruser, loginuser, logoutuser, refreshacesstoken, currentuser , getallusers };
