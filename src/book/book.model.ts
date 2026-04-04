import mongoose from "mongoose";
import type { BookType } from "./bookType.js";
import UserModel from "../users/users.model.js";

const bookSchema = new mongoose.Schema<BookType>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const BookModel = mongoose.model("book", bookSchema);
