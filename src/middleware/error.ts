import { NextFunction, Request, Response } from "express";
/* import mongoose from "mongoose"; */
import { ERROR } from "../constants/errorsStatus";
import ExError from "../errors/ExError";

const pageErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  next(ExError.notFoundRequest(ERROR.MESSAGE.NOT_FOUND_PAGE));
};

const errorHandler = (
  error: { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /* if (error instanceof mongoose.Error) {
    console.log("РАБОТАЕТ");
  } */
  const { status = ERROR.CODE.SERVER, message } = error;
  res.status(status).send({
    message: status === ERROR.CODE.SERVER ? ERROR.MESSAGE.SERVER : message,
  });
  next();
};

export { errorHandler, pageErrorHandler };
