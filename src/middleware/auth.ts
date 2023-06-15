import { Response, NextFunction, Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "648af78166ca9ebf27cc3826", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
};

export default auth;
