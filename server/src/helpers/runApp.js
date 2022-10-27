import express from "express";
import notes from "../routes/notes.routes.js";
import env from "../helpers/env.js";
const app = express();

export default async function start() {
  try {
    app.listen(process.env.PORT, () => {
      app.use(express.json());

      app.use("/note", notes);
      console.log(`start app listening on port ${env.PORT}`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}
