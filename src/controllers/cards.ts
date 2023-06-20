import { NextFunction, Request, Response } from "express";
import ExError from "../errors/ExError";
import Card from "../models/card";
import { CustomRequest } from "../middleware/auth";
import { ERROR } from "../constants/errorsStatus";

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
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: ownerId,
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
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw ExError.notFoundRequest(ERROR.MESSAGE.NOT_FOUND);
      }
      if (card.owner.toString() !== ownerId) {
        throw ExError.forbidden();
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => {
      res.send({
        message: "Card successfully deleted",
        data: card,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(ExError.notFoundRequest(ERROR.MESSAGE.NOT_FOUND));
      } else {
        next(err);
      }
    });
};

// РАБОТА С ЛАЙКАМИ
const toggleCardLike = (
  addLike: any,
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const ownerId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    addLike ? { $addToSet: { likes: ownerId } } : { $pull: { likes: ownerId } },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw ExError.notFoundRequest(ERROR.MESSAGE.NOT_FOUND);
      }
      res.send({
        message: `Like successfully ${addLike ? "added" : "removed"}`,
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

export const putCardLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => toggleCardLike(true, req, res, next);

export const deleteCardLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => toggleCardLike(false, req, res, next);
