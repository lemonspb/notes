import { check } from "express-validator";

export const registerRules = [
  check("email", "incorrect email").isEmail().exists(),
  check("password", "Minimum password length 6 characters")
    .isLength({ min: 6 })
    .exists(),
];
