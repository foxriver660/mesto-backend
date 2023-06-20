import { model, Schema, Types } from "mongoose";
import { urlPattern } from "../constants/patterns";

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      required: true,
      match: urlPattern,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      type: [Types.ObjectId],
      default: [],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default model<ICard>("card", cardSchema);
