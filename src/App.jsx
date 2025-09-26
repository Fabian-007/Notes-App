import { useEffect, useState } from "react";
import noteService from "./services/notes";
import Note from "./components/Note";
import Notification from "./components/error";
import Footer from "./components/footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then((initialNotes) => {
    console.log('initial promise', initialNotes)
    setNotes(initialNotes);
    });
  }, []);

  console.log("render", notes.length, "notes");

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    console.log("note object", note);
    const changedNote = { ...note, important: !note.important };
    console.log("new note object??", changedNote);
    noteService
    .update(id, changedNote)
    .then((returnedNote) => {
      console.log("updated promise?", returnedNote);
      console.log("note id?", note.id);
      console.log(`importance of ${id} needs to be toggled`);

      setNotes(
        notes.map(
          (note) =>
            note.id === id
              ? returnedNote //replace the matching note object with updated new note object one from server,
              : note //otherwise, just leave note object unchanged
        )
      );
    })
    .catch(error=>{
      setErrorMessage(`the note  "${note.content}" was already deleted from server`
      )
     setTimeout(() => {
      setErrorMessage(null)
      
     }, 5000);
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  // filtering displayed element
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  console.log("note to show??", notesToShow);
  console.log("show all is?", showAll);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
    .create(noteObject)
    .then((returnedNote) => {
      console.log("RESPONSE", returnedNote);
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });

    // console.log('button clicked', e.target)
    //  console.log('button clicked', e)`
  };
  const handleNoteChange = (e) => {
    const inputValue = e.target.value;
    console.log("input field value:", inputValue);
    setNewNote(inputValue);
  };
  return (
    <>
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <button onClick={() => setShowAll(!showAll)}>
        show{showAll ? "important" : "all"}
      </button>

      <ul>
        {notesToShow.map((note) => (
          //refactored to have a notes component
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer/>
    </>
  );
};

export default App;
