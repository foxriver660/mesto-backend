import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import ExError from "../errors/ExError";
import User from "../models/user";

export const createUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    email, name, about, avatar,
  } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw ExError.conflict();
      }
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))

    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(ExError.badRequest());
      } else {
        next(err);
      }
    });
};
