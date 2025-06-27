import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (userVal) =>{
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashPassword(userVal, salt);

    return hashPassword;
};

export const passwordCompare = async (userPass, passwordFromDb)=>{

    try {
        const isMatch = await bcrypt.compare(userPass, passwordFromDb);

        return isMatch;        
    } catch (error) {
        console.log(error);
    }
};

export const createJWT = (userId)=>{

    return JWT.sign(
        {
            userId: userId
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: '1d',
        });
};
