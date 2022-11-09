import jwt from "jsonwebtoken";
import env from "../helpers/env.js";

export const generateToken = (data, expiresIn = "10h") => {
  const options = {
    expiresIn,
  };
  return jwt.sign(data, process.env.JWT, options);
};

export const verifyToken = (token) => jwt.verify(token, env.JWT);
