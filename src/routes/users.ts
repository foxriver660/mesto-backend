import express from "express";
import {
  getUsersHandler,
  getSingleUserHandler,
  patchSingleUserHandler,
  patchSingleUserAvatarHandler,
} from "../controllers/users";

const router = express.Router();

router.get("/", getUsersHandler);
router.get("/:userId", getSingleUserHandler);
router.patch("/me", patchSingleUserHandler);
router.patch("/me/avatar", patchSingleUserAvatarHandler);

export default router;
