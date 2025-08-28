import Note from '../models/Note.js';

export const getAllNotes = async (_, res) => {
  try {
    // const notes = await Note.find(); // find all notes from database
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error('GetAllNotes Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id); // find note by id from database

    if (!note) {
      return res.status(404).json({ message: 'Note Not Found!' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error('GetNoteById Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    // we will get undefined undefined because we need to use middleware to parse the body of the request
    // we will use express.json() middleware to parse the body of the request
    // console.log(title, content);
    const note = new Note({ title, content }); // create a new note object with title and content properties
    const newNote = await note.save(); // save the new note object in database
    res.status(201).json({ newNote, message: 'Note Created Successfully!' });
  } catch (error) {
    console.error('CreateNote Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note Not Found!' });
    }

    res
      .status(200)
      .json({ updatedNote, message: 'Note Updated Successfully!' }); // send the updated note object to the client.
  } catch (error) {
    console.error('UpdateNote Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note Not Found!' });
    }

    res
      .status(200)
      .json({ deletedNote, message: 'Note Deleted Successfully!' });
  } catch (error) {
    console.error('DeleteNote Controller Not Working As Expected!', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};
