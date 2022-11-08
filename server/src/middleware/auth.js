import { verifyToken } from "../helpers/jwt.js";

const isAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }
    req.user = verifyToken(token);
    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
};

export default isAuth;
