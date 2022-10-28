import express from "express";
import { register } from "../controllers/auth.js";
import validate from "../middleware/validate.js";
import { registerRules } from "../validations/auth.js";

const router = express();
router.post("/register", validate(registerRules), register);

export default router;
