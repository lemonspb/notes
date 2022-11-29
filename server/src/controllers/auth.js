import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";
import { sendMail } from "../helpers/mail.js";
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User create", userId: user._id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const token = generateToken({ userId: user.id });
    res.status(200).json({ token, userId: user.id });
    sendMail();
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export { register, login };
