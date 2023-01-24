import express from "express";
import { register, login, verificate } from "../controllers/auth.js";
import validate from "../middleware/validate.js";
import { registerRules, loginRules } from "../validations/auth.js";
const router = express();
router.post("/register", validate(registerRules), register);
router.post("/login", validate(loginRules), login);
router.get("/verificate/:confirmationCode", verificate);

export default router;
