import Note from "../models/note.models.js";
export const getNotes = async (req, res) => {
  const notes = await Note.find({
    user: req.user.id,
  }).populate("user");
  res.json(notes);
};

export const createNote = async (req, res) => {
  const { title, description, date } = req.body;
  const newNote = new Note({
    title,
    description,
    date,
    user: req.user.id,
  });

  const saveNote = await newNote.save();
  res.json(saveNote);
};

export const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id).populate("user");
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

export const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  return res.sendStatus(204);
};
