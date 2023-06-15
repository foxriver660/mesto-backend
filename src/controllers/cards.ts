import { Request, Response } from "express";

export const getCardsHandler = (req: Request, res: any) => {
  res.send("Get cards routes");
};
export const postCardsHandler = (req: Request, res: any) => {
  res.send("Post cards routes");
};
export const deleteCardsHandler = (req: Request, res: Response) => {
  res.send(`Delete card route, card id: ${req.params.cardId}`);
};
export const putCardLikeHandler = (req: Request, res: Response) => {
  res.send("Put card like routes");
};
export const deleteCardLikeHandler = (req: Request, res: Response) => {
  res.send(`Delete card like route`);
};
