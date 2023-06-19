import { NextFunction, Request, Response } from "express";
import ExError from "../errors/ExError";
import Card from "../models/card";
import { CustomRequest } from "../middleware/auth";

export const getCardsHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Card.find({})
    .select("-__v")
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

export const postCardsHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const ownerId = req.user?._id;
  const {
    name, link, likes, createdAt,
  } = req.body;
  Card.create({
    name,
    link,
    owner: ownerId,
    likes,
    createdAt,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(ExError.badRequest());
      } else {
        next(err);
      }
    });
};

export const deleteCardsHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const ownerId = req.user?._id;

  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw ExError.notFoundRequest();
      }
      if (card.owner.toString() !== ownerId) {
        throw ExError.forbidden();
      } else {
        res.send({
          message: "Card successfully deleted",
        });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(ExError.notFoundRequest());
      } else {
        next(err);
      }
    });
};

export const putCardLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const ownerId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: ownerId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw ExError.notFoundRequest();
      }
      res.send({
        message: "Like successfully added",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(ExError.badRequest());
      } else {
        next(err);
      }
    });
};

export const deleteCardLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const ownerId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: ownerId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw ExError.notFoundRequest();
      }
      res.send({
        message: "Like successfully removed",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(ExError.badRequest());
      } else {
        next(err);
      }
    });
};
