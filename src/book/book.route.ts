import express from "express";
import { createBook } from "./book.controller.js";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "url";

const bookRouter = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }, //10mb
});

bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook,
);

export default bookRouter;
