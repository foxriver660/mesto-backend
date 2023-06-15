import { Request, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import User from "../models/user";

export const getUsersHandler = (req: any, res: Response) => {
  User.find({})
    .select("-__v")
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

export const postUsersHandler = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      const { name, about, avatar } = user;
      res.send({ name, about, avatar });
    })
    .catch((err) => res.status(400).send(err));
};

export const getSingleUserHandler = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .select("-__v")
    .then((user) => res.send(user))
    .catch((err) =>
      res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
    );
};

export const patchSingleUserHandler = (req: CustomRequest, res: Response) => {
  const { _id } = req.user;
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(_id, { name, about, avatar }, { new: true })
    .select("-__v")
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

export const patchSingleUserAvatarHandler = (req: any, res: Response) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .select("-__v")
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
