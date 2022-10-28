import User from "../models/User.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

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
    // const token = user.generateToken();
    // const refreshToken = user.generateToken('2h');

    res.status(201).json({ message: "User create" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

export { register };
