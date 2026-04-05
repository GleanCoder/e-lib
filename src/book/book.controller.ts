import type { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  // const {}=req.body

  const files = req.files;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  try {
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };

    const fileName = files?.coverImage[0]?.filename;

    const localPath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName,
    );
    const coverImageMemetype = files.coverImage[0]?.mimetype.split("/").at(-1);

    const imageUploadResponse = cloudinary.uploader.upload(localPath, {
      filename_override: fileName,
      folder: "cover-images",
      format: coverImageMemetype,
    });

    if (!imageUploadResponse) {
      return "Failed to upload Cover Image into cloudinary";
    }

    const bookFileName = files?.file[0]?.filename;
    const bookLocalPath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName,
    );

    const pdfUploadResponse = cloudinary.uploader.upload(bookLocalPath, {
      resource_type: "raw",
      filename_override: bookFileName,
      folder: "book-pdfs",
      format: "pdf",
    });

    if (!pdfUploadResponse) {
      return "Failed to upload PDF into cloudinary";
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "error in upload into cloudinary"));
  }
};

export { createBook };
