import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const user = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  notes: { type: Types.ObjectId, ref: "Note" },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  name: { type: String, default: "" },
});

user.pre("save", function () {});

export default model("User", user);
