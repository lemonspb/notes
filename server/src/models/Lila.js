const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  age: { type: Number, default: "" },
  weight: { type: Number, default: "" },
  cat: { type: String, default: "" },
  misha: { type: String, default: "" },
});

module.exports = model("Lila", schema);
