import mongoose from "mongoose";
import type { User } from "./userType.js";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<User>("users", userSchema);

export default UserModel;
