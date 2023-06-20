/* eslint-disable no-unused-vars */
import { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ExError from "../errors/ExError";

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

const authHandler = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;
  if (!cookie) {
    next(ExError.unauthorized());
  } else {
    try {
      const decodedCookie = jwt.verify(
        cookie!.split("=")[1],
        "secret",
      ) as JwtPayload;
      req.user = {
        _id: decodedCookie?._id,
      };
      next();
    } catch (error) {
      next(ExError.unauthorized());
    }
  }
};

export default authHandler;
