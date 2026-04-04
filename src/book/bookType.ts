import type { User } from "../users/userType.js";

export interface BookType {
  _id: string;
  title: string;
  author: User;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}
