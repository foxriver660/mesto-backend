import { NextFunction, Request, Response } from "express";
import ExError from "../errors/ExError";
import { ValidUrl } from "../constants/validUrl";
import { ERROR } from "../constants/errorsStatus";

const isValidUrl = (url: string) => Object.values(ValidUrl).some((value) => {
  if (value instanceof RegExp) {
    return value.test(url);
  }
  return value === url;
});
export const preValidateUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const url = req.originalUrl;

  if (!isValidUrl(url)) {
    return next(ExError.notFoundRequest(ERROR.MESSAGE.NOT_FOUND_PAGE));
  }

  next();
};
