import express from "express";
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
router.get("/:userId", getSingleUserByIdHandler);
router.patch("/me", patchSingleUserHandler);
router.patch("/me/avatar", patchSingleUserAvatarHandler);

export default router;
