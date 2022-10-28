import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const schema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  notes: { type: Types.ObjectId, ref: "Notes" },
  name: { type: String, default: "" },
});

export default model("User", schema);
