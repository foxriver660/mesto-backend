import express from "express";
import {
  getCardsHandler,
  postCardsHandler,
  deleteCardsHandler,
  putCardLikeHandler,
  deleteCardLikeHandler,
} from "../controllers/cards";

const router = express.Router();

router.get("/", getCardsHandler);
router.post("/", postCardsHandler);
router.delete("/:cardId", deleteCardsHandler);
router.put("/:cardId/likes", putCardLikeHandler);
router.delete("/:cardId/likes", deleteCardLikeHandler);

export default router;
