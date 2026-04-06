import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export interface AuthRequest extends Request {
  userId: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createHttpError(401, "No Token Present."));
  }

  try {
    const parsedToken = token.split(" ")[1];
    const verifiedToken = jwt.verify(parsedToken as string, config.jwtSecret);

    if (!verifiedToken) {
      return next(
        createHttpError(401, "Failed to authenticate, Please login again!"),
      );
    }

    const _req = req as AuthRequest;
    _req.userId = verifiedToken.sub as string;
    next();
  } catch (error) {
    return next(
      createHttpError(500, "Errror while verify jwt token. Invalid Token."),
    );
  }
};

export default authMiddleware;
