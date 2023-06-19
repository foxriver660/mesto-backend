/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import ExError from "../errors/ExError";

interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}
interface UserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<mongoose.Document<any, any, IUser>>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: "Неправильный формат почты",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    match: /^https?:\/\/.+/,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
});
userSchema.static(
  "findUserByCredentials",
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select("+password")
      .then((user: { password: string }) => {
        if (!user) {
          return Promise.reject(ExError.unauthorized());
        }

        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(ExError.unauthorized());
          }

          return user;
        });
      });
  },
);
export default mongoose.model<IUser, UserModel>("user", userSchema);
