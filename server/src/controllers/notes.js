import Note from "../models/Note.js";

const create = async (req, res) => {
  try {
    const body = req.body;
    const note = new Note({
      noteText: body.noteText,
      title: body.title,
      subTitle: body.subTitle,
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
    const note = await Note.findById(id).select(
      "title _id createdTime noteText updatedTime isFavorite"
    );

    res.status(200).json(note);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAll = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.userId })
      .select("title _id createdTime subTitle isFavorite")
      .sort({
        isFavorite: -1,
      })
      .sort({
        createdTime: "desc",
      });

    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const edit = async (req, res) => {
  try {
    const { id, noteText, title, subTitle } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, {
      noteText: noteText,
      title: title,
      subTitle: subTitle,
      updatedTime: new Date(),
    });
    res.status(200).json(updatedNote);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const setFavorite = async (req, res) => {
  try {
    const { id, isFavorite } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, {
      isFavorite: isFavorite,
    });
    res.status(200).json(updatedNote);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "sucsess" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { create, getById, getAll, edit, setFavorite, remove };
