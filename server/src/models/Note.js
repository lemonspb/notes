import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const schema = new Schema({
  text: { type: String, default: "" },
  title: { type: String, default: "" },
  createdTime: { type: Date },
  updatedTime: { type: Date },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default model("Note", schema);
