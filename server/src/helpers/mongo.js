import mongoose from "mongoose";
import env from "../helpers/env.js";

export default function runMongo() {
  return mongoose.connect(env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "notes",
  });
}
