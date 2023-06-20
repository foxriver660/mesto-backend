import express from "express";
import {
  userIdValidation,
  patchSingleUserAvatarValidation,
  patchSingleUserValidation,
} from "../validation/userValidation";
import {
  getUsersHandler,
  getSingleUserByIdHandler,
  getSingleUserHandler,
  patchSingleUserHandler,
  patchSingleUserAvatarHandler,
} from "../controllers/users";

const router = express.Router();

router.get("/", getUsersHandler);
router.get("/me", getSingleUserHandler);
router.get("/:userId", userIdValidation, getSingleUserByIdHandler);
router.patch("/me", patchSingleUserValidation, patchSingleUserHandler);
router.patch(
  "/me/avatar",
  patchSingleUserAvatarValidation,
  patchSingleUserAvatarHandler,
);

export default router;
