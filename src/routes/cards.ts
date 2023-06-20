import express from "express";
import {
  createCardValidation,
  CardIdValidation,
} from "../validation/cardValidation";
import {
  getCardsHandler,
  postCardsHandler,
  deleteCardsHandler,
  putCardLikeHandler,
  deleteCardLikeHandler,
} from "../controllers/cards";

const router = express.Router();

router.get("/", getCardsHandler);
router.post("/", createCardValidation, postCardsHandler);
router.delete("/:cardId", CardIdValidation, deleteCardsHandler);
router.put("/:cardId/likes", CardIdValidation, putCardLikeHandler);
router.delete("/:cardId/likes", CardIdValidation, deleteCardLikeHandler);

export default router;
