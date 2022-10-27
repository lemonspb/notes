import express from "express";
import notes from "../routes/notes.routes.js";
const app = express();
const port = 3001;

export default async function start() {
  try {
    app.listen(port, () => {
      app.use(express.json());

      app.use("/", notes);
      console.log(`dffdsf app listening on   port ${port}`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}
