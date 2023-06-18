import { NextFunction, Request, Response } from "express";

import { SERVER_ERROR } from "../constants/errorsStatus";

const errorHandler = (
  error: { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status = SERVER_ERROR.code, message } = error;
  res.status(status).send({
    message: status === SERVER_ERROR.code ? SERVER_ERROR.message : message,
  });
  next();
};

export default errorHandler;
