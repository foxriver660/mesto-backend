import { NextFunction, Request, Response } from "express";
import ExError from "../errors/ExError";
import { CustomRequest } from "../middleware/auth";
import User from "../models/user";
import { ERROR } from "../constants/errorsStatus";

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

// GET USER
const getUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  const _id = req.params.userId || req.user?._id;
  User.findById(_id)
    .select("-__v")
    .then((user) => {
      if (!user) {
        throw ExError.notFoundRequest(ERROR.MESSAGE.NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
};

export const getSingleUserByIdHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => getUser(req, res, next);

export const getSingleUserHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => getUser(req, res, next);

// UPDATE USER
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
        throw ExError.notFoundRequest(ERROR.MESSAGE.NOT_FOUND);
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
