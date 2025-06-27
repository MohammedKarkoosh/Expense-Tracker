import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";


export const hashPassword = async (userVal) =>{
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashPassword(userVal, salt);

    return hashPassword;
};
