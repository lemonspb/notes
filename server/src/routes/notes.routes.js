import express from "express";
import { create, getById, getAll, remove, edit } from "../controllers/notes.js";

const router = express();
router.post("/create", create);
router.get("/:id", getById);
router.post("/all", getAll);
router.patch("/edit", edit);
router.delete("/remove/:id", remove);
export default router;
