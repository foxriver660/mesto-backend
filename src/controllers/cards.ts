import { Request, Response } from "express";
import Card from "../models/card";
import { CustomRequest } from "../middleware/auth";

export const getCardsHandler = (req: Request, res: Response) => {
  Card.find({})
    .select("-__v")
    .then((cards) => res.send(cards))
    .catch((err) => res.status(400).send(err));
};

export const postCardsHandler = (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, link, owner, likes, createdAt } = req.body;
  Card.create({ name, link, owner: userId, likes, createdAt })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => res.status(400).send(err));
};

export const deleteCardsHandler = (req: Request, res: Response) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((result) => {
      if (result) {
        res.send("Card delete success");
      } else {
        res.status(404).send("Cant find card");
      }
    })
    .catch((error) => {
      res.status(500).send("An error occurred while deleting the card");
    });
};

export const putCardLikeHandler = (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then(() => res.send("Like added"))
    .catch((err) => res.status(400).send(err));
};

export const deleteCardLikeHandler = (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then(() => res.send("like deleted"))
    .catch((err) => res.status(400).send(err));
};
