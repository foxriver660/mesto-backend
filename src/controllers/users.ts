import { NextFunction, Request, Response } from "express";
import ExError from "../errors/CustomError";
import { CustomRequest } from "../middleware/auth";
import User from "../models/user";

export const getUsersHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.find({})
    .select("-__v")
    .then((users) => res.send(users))
    .catch(next);
};

export const postUsersHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      /* throw new Error("Принудительная ошибка"); */
      res.send({
        name,
        about,
        avatar,
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

export const getSingleUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId)
    .select("-__v")
    .then((user) => {
      /* throw new Error("Принудительная ошибка"); */
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(ExError.notFoundRequest());
      } else {
        next(err);
      }
    });
};

export const patchSingleUserHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.user?._id;
  const { name, about, avatar } = req.body;
  User.findOneAndUpdate(
    { _id },
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .select("-__v")
    .then((updatedUser) => {
      if (!updatedUser) {
        throw ExError.notFoundRequest();
      }
      /* throw new Error("Принудительная ошибка"); */
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(ExError.badRequest());
      } else {
        next(err);
      }
    });
};

export const patchSingleUserAvatarHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.user?._id;
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id },
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .select("-__v")
    .then((updatedUser) => {
      /*  throw new Error("Принудительная ошибка"); */
      if (!updatedUser) {
        throw ExError.notFoundRequest();
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(ExError.badRequest());
      } else {
        next(err);
      }
    });
};
