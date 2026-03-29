import express from "express";
import { loginUsers, registerUsers } from "./users.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUsers);
userRouter.post("/login", loginUsers);

export default userRouter;
