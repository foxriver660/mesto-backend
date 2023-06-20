import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import ExError from "../errors/ExError";

export const loginHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "secret", {
        expiresIn: "7d",
      });
      res.cookie("token", token, { httpOnly: true });
      res.send({ message: "You are successfully logged in" });
    })
    .catch((err) => {
      if (err) {
        next(ExError.unauthorized());
      } else {
        next(err);
      }
    });
};
