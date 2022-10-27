import express from "express";
import { create, remove, edit } from "../controllers/notes.js";
const router = express();
router.post("/create", create);
router.patch("/edit", edit);
router.delete("/remove", remove);
export default router;
