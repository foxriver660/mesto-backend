import { NextFunction, Request, Response } from "express";

import { ERROR } from "../constants/errorsStatus";

const errorHandler = (
  error: { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status = ERROR.CODE.SERVER, message } = error;
  res.status(status).send({
    message: status === ERROR.CODE.SERVER ? ERROR.MESSAGE.SERVER : message,
  });
  next();
};

export default errorHandler;
