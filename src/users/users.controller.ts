import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import UserModel from "./users.model.js";
import bcrypt from "bcrypt";
import type { User } from "./userType.js";
import jwt from "jsonwebtoken"
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

  // Generate JWT Token
// jwt.sign(payload, secret, options)
// jwt.verify(token, secret)
// The payload must be an object

  try {
    const jwtToken=jwt.sign({sub:newUser._id},config.jwtSecret,{expiresIn:"7d",algorithm:"HS256"})
     res.status(201).json({
      message:"Account created Successfully!",
      accessToken:jwtToken
    })
  } catch (error) {
   return  next(createHttpError(500,"Error while authenticate with JWT"))
  }
};

export { registerUsers };
