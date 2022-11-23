import express from "express";
import note from "../routes/notes.routes.js";
import auth from "../routes/auth.routes.js";
import env from "../helpers/env.js";
import cors from "cors";

const app = express();

export default async function start() {
  try {
    app.listen(3001, () => {
      app.use(cors());
      app.use(express.json());
      app.use("/note", note);
      app.use("/auth", auth);

      console.log(`start app listening on port ${env.PORT}`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}
