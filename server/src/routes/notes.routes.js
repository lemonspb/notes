import express from "express";
import Notes from "../models/Notes.js";
const router = express();

router.post("/notes", async (req, res) => {
  const notes = new Notes({
    text: "vbf",
    title: "1321321",
    date: new Date(),
  });
  await notes.save();
  res.status(201).json(notes);
});

export default router;
