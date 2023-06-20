/* eslint-disable no-restricted-syntax */
import { NextFunction, Request, Response } from "express";
import ExError from "../errors/ExError";
import { ValidUrl } from "../constants/validUrl";

const isValidUrl = (url: string) => Object.values(ValidUrl).some((value) => {
  if (value instanceof RegExp) {
    return value.test(url);
  }
  return value === url;
});
export const validateUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const url = req.originalUrl;

  if (!isValidUrl(url)) {
    throw ExError.notFoundPageRequest();
  }

  next();
};
