import { Request, Response } from "express";

const errorHandler = (
  error: { status: number; message: any },
  req: Request,
  res: Response,
  next: any
) => {
  const { status = 500, message } = error;

  res.status(status).send({
    message: status === 500 ? "Server side error" : message,
  });
};

export default errorHandler;
