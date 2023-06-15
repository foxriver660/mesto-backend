import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
