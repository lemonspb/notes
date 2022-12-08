import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";
import { sendMail } from "../helpers/mail.js";
import { randomString } from "../helpers/randomString.js";
const register = async (req, res) => {
  try {
    const APP_URL = req.get("origin");
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationCode = randomString(20);
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
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verificate = async (req, res) => {
  try {
    const { confirmationCode } = req.body;
    const user = await User.findOne({ confirmationCode });
    user.status = "Active";
    res.status(200).json({ message: "User " });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.status === "Pending") {
      return res.status(403).json({ message: "User is not verification" });
    }
    const token = generateToken({ userId: user.id });
    res.status(200).json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export { register, login, verificate };
