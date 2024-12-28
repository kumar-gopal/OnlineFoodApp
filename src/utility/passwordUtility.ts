import { Response,Request } from "express";
import bcrypt from "bcryptjs";


// Generate salt and hash password
export const generateSalt = async() =>{
   return await bcrypt.genSalt(10);
}

export const generateHashPassword = async(password:string,salt:string)=>{
    return await bcrypt.hash(password, salt);
}