import { Request, Response } from "express";
import User from "../models/user";

export const getUsersHandler = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

export const postUsersHandler = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

export const getSingleUserHandler = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send(err));
};

export const patchSingleUserHandler = (req: Request, res: Response) => {
  res.send("Patch users routes");
};
export const patchSingleUserAvatarHandler = (req: Request, res: Response) => {
  res.send(`Patch avatar user route`);
};
