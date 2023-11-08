import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import router from "./routes/index";
import authHandler from "./middleware/auth";
import { errorHandler, pageErrorHandler } from "./middleware/error";
import { createUserHandler } from "./controllers/signup";
import { loginHandler } from "./controllers/signin";
import { requestLogger, errorLogger } from "./middleware/logger";
import { loginValidation } from "./validation/signinValidation";
import { createUserValidation } from "./validation/signupValidation";
import { preValidateUrl } from "./middleware/urlValidation";
import swaggerDocs from "./swagger";

const app = express();
const $PORT = 4200;
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
swaggerDocs(app, $PORT);
app.use(requestLogger);
app.use(preValidateUrl);
app.use(express.json());

/**
 * @openapi
 * /signin:
 *   post:
 *     tags:
 *      - Auth
 *     description: login
 *     responses:
 *       201:
 *         description: Success
 */
app.post("/signin", loginValidation, loginHandler);
/**
 * @openapi
 * /signup:
 *   post:
 *     tags:
 *      - Auth
 *     description: registration
 *     responses:
 *       201:
 *         description: Success
 *
 */
app.post("/signup", createUserValidation, createUserHandler);

app.use(authHandler, router);

app.use(pageErrorHandler);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen($PORT, () => {
  console.log(`Server listening on port ${$PORT}`);
});
