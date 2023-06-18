import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import authHandler from "./middleware/auth";
import errorHandler from "./middleware/error";
import ExError from "./errors/ExError";

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use(authHandler, router);

app.use((req, res, next) => {
  next(ExError.notFoundPageRequest());
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
