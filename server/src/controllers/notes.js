import Notes from "../models/Notes.js";

const create = async (req, res) => {
  try {
    const body = req.body;
    const notes = new Notes({
      text: body.text,
      title: body.title,
      date: new Date(),
    });
    await notes.save();
    res.status(201).json(notes);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const edit = async (req, res) => {
  try {
    const body = req.body;
  } catch (e) {}
};

const remove = async (req, res) => {
  try {
  } catch (e) {}
};

export { create, edit, remove };
