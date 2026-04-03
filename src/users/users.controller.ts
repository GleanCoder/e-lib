import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import UserModel from "./users.model.js";
import bcrypt from "bcrypt";
import type { User } from "./userType.js";

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
  

  // Send Response to Client
  res.status(201).json({
    message: "User created successfully!",
    user: newUser._id,
  });
};

export { registerUsers };
