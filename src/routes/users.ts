import express from "express";
import {
  getUsersHandler,
  getSingleUserHandler,
  postUsersHandler,
  patchSingleUserHandler,
  patchSingleUserAvatarHandler,
} from "../controllers/users";

const router = express.Router();

router.get("/", getUsersHandler);
router.post("/", postUsersHandler);
router.get("/:userId", getSingleUserHandler);
router.patch("/me", patchSingleUserHandler);
router.patch("/me/avatar", patchSingleUserAvatarHandler);

export default router;
