import express from "express";
import {
  create,
  getById,
  getAll,
  remove,
  edit,
  setFavorite,
} from "../controllers/notes.js";
import isAuth from "../middleware/auth.js";

const router = express();
router.post("/create", isAuth, create);
router.get("/:id", isAuth, getById);
router.post("/all", isAuth, getAll);
router.patch("/edit", isAuth, edit);
router.patch("/favorite", isAuth, setFavorite);
router.delete("/remove/:id", isAuth, remove);

export default router;
