import { Joi, celebrate } from "celebrate";
import mongoose from "mongoose";
import { urlPattern } from "../constants/patterns";

export const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }

        return value;
      })
      .required(),
  }),
});

export const patchSingleUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const patchSingleUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern).required(),
  }),
});
