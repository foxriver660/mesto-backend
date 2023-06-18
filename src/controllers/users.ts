import { NextFunction, Request, Response } from "express";
import ExError from "../errors/ExError";
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
// ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
const updateUser = (
  update: { name?: string; about?: string; avatar?: string },
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.user?._id;
  User.findOneAndUpdate({ _id }, update, { new: true, runValidators: true })
    .select("-__v")
    .then((updatedUser) => {
      if (!updatedUser) {
        throw ExError.notFoundRequest();
      }

      res.send(updatedUser);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(ExError.badRequest());
      } else {
        next(error);
      }
    });
};

export const patchSingleUserHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => updateUser({ name: req.body.name, about: req.body.about }, req, res, next);

export const patchSingleUserAvatarHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => updateUser({ avatar: req.body.avatar }, req, res, next);
