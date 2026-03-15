import express from "express";
import { registerUsers } from "./users.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUsers);

export default userRouter;
