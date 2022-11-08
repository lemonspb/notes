import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const note = new Schema({
  noteText: [{ id: String, types: String, data: {} }],
  title: { type: String, default: "" },
  createdTime: { type: Date },
  updatedTime: { type: Date },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default model("Note", note);
