import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;
const schema = new Schema({
  text: { type: String, default: "" },
  title: { type: String, default: "" },
  date: { type: Date },
});

export default model("Note", schema);
