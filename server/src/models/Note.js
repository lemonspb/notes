import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const note = new Schema({
  noteText: [],
  title: { type: String, default: "" },
  subTitle: { type: String, default: "" },
  createdTime: { type: Date },
  updatedTime: { type: Date },
  isFavorite: { type: Boolean, default: false },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default model("Note", note);
