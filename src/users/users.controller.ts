import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import UserModel from "./users.model.js";
import bcrypt from "bcrypt";
import type { User } from "./userType.js";
import jwt, { sign } from "jsonwebtoken"
import { config } from "../config/config.js";

const registerUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Receive Request
  const { name, email, password } = req.body;
  // Validate Input
  // here we are doing simple validation, but we can use tools like express validator
  if (!email || !name || !password) {
    const error = createHttpError(
      400,
      "Something is missed! You have to fill all field.",
    );
    return next(error);
  }
  // Check Existing User
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already exist with same email.");
      return next(error);
    }
  } catch (error) {
    const err = createHttpError(500, "Error in getting User");
    return next(err);
  }
  // Hash Password
  const hashPassword = await bcrypt.hash(password, 10);
  // Create User in Database
  let newUser: User;
  try {
    newUser = await UserModel.create({ name, email, password: hashPassword });
  } catch (error) {
    const err = createHttpError(500, "Error while creating User");
    return next(err);
  }
  // Generate JWT Tokent
try {
  const jwtToken=jwt.sign({sub:newUser._id},config.jwtSecret,{algorithm:"HS256",expiresIn:"7d"})
  res.status(201).json({accessToken:jwtToken})
  
} catch (error) {
     return next(createHttpError(500, "Error while signing the jwt token"));
}

  

  // Send Response to Client
  res.status(201).json({
    message: "User created successfully!",
    user: newUser._id,
  });
};


const loginUsers=async(req:Request,res:Response,next:NextFunction){

  const {email,password}=req.body

  if(!email || !password){
    const error=createHttpError(400, "Something is missed! You have to fill all field.",);
    return next(error);
  }

   //check user exist or not 
  let user;
 try {
  user=await UserModel.findOne({email})
  if(!user){
  return next(createHttpError(400,"User doesn't exist!"));
 }
  //check password is matching or not
  const isPasswordMatched= await bcrypt.compare(password,user.password)
  if(!isPasswordMatched){return next(createHttpError(400,"Username or password incorrect!"))}

  
 } catch (error) {
    return next(createHttpError(500,"error while fetching user!"));
 }

  //signup jwt

  try {
    const token=sign({sub:user._id},config.jwtSecret,{algorithm:"HS256",expiresIn:"7d"})

    res.status(200).json({
      Message:"LoggedIn successfully!",
      accessToken:token
    })
    
  } catch (error) {
    return next(createHttpError(500,"Error while sigin the jwt token"))
  }

}


export { registerUsers,loginUsers };
