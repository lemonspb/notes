import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const user = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  notes: { type: Types.ObjectId, ref: "Note" },
  name: { type: String, default: "" },
});
user.pre("save", function () {});

export default model("User", user);
