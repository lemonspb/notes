import express from "express";
import { register, login } from "../controllers/auth.js";
import validate from "../middleware/validate.js";
import { registerRules, loginRules } from "../validations/auth.js";
const router = express();
router.post("/register", validate(registerRules), register);
router.post("/login", validate(loginRules), login);
export default router;
