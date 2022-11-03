import Note from "../models/Note.js";

const create = async (req, res) => {
  try {
    const body = req.body;
    const note = new Note({
      text: body.text,
      title: body.title,
      owner: req.user.userId,
      createdTime: new Date(),
    });
    await note.save();
    res.status(201).json(note);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.status(201).json(note);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAll = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.userId }).limit().skip();
    res.status(201).json(notes);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const edit = async (req, res) => {
  try {
    const { id, text, title } = req.body;
    const _id = id;

    const updatedNote = await Note.findOneAndUpdate(_id, {
      text,
      title,
      updatedTime: new Date(),
    });
    res.status(201).json(updatedNote);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete({ _id: id });
    res.status(201).json({ message: "sucsess" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { create, getById, getAll, edit, remove };
