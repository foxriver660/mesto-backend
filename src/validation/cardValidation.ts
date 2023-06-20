import { Joi, celebrate } from "celebrate";
import mongoose from "mongoose";
import { urlPattern } from "../constants/patterns";

export const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(urlPattern).required(),
  }),
});

export const CardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }

        return value;
      })
      .required(),
  }),
});
