import { verifyToken } from "../helpers/jwt.js";

const isAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // const token = req.headers.authorization.startsWith("Bearer ");
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }
    req.user = verifyToken(token);
    next();
  } catch (e) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};

export default isAuth;
