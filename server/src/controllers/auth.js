import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";
import { sendMail } from "../helpers/mail.js";
import createError from "http-errors";

import { randomString } from "../helpers/randomString.js";
const register = async (req, res, next) => {
  try {
    const APP_URL = req.get("origin");
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationCode = randomString(50);
    const user = new User({
      email,
      password: hashedPassword,
      confirmationCode: confirmationCode,
    });
    sendMail({
      subject: "Успешная регистрация",
      html: `<div>Чтобы завершить регистрацию  
      <a href="${APP_URL}/confirm/${confirmationCode}">${APP_URL}/confirm/${confirmationCode}</a></div>`,
      to: email,
    });

    await user.save();
    res.status(201).json({ message: "User create", userId: user._id });
  } catch (e) {
    next(e);
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};

const verificate = async (req, res) => {
  try {
    const { confirmationCode } = req.params;
    const user = await User.findOne({ confirmationCode });
    user.status = "Active";
    user.save();
    res.status(200).json({ message: "User verificate", isVerificate: true });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        createError(404, "There is no user with this email address!")
      );
    }
    if (user.status === "Pending") {
      return res.status(403).json({ message: "User is not verification" });
    }
    const token = generateToken({ userId: user.id });
    await res.status(200).json({ token, userId: user.id });
  } catch (e) {
    return next(e);
  }
};
export { register, login, verificate };
