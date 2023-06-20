import { Joi, celebrate } from "celebrate";
import { urlPattern } from "../constants/patterns";

export const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    about: Joi.string().min(2).max(200),
  }),
});
