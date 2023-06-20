import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import router from "./routes/index";
import authHandler from "./middleware/auth";
import errorHandler from "./middleware/error";
import ExError from "./errors/ExError";
import { createUserHandler } from "./controllers/signup";
import { loginHandler } from "./controllers/signin";
import { requestLogger, errorLogger } from "./middleware/logger";
import { loginValidation } from "./validation/signinValidation";
import { createUserValidation } from "./validation/signupValidation";

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(requestLogger);
app.use(express.json());

app.post("/signin", loginValidation, loginHandler);
app.post("/signup", createUserValidation, createUserHandler);

app.use(authHandler, router);

app.use(errorLogger);

app.use((req, res, next) => {
  next(ExError.notFoundPageRequest());
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
