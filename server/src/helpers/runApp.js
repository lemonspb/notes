import express from "express";
import note from "../routes/notes.routes.js";
import auth from "../routes/auth.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/note", note);
app.use("/auth", auth);
export { app };
