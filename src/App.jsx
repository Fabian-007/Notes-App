import { useState } from 'react';
import Note from './components/Note';


const App = (props) => {
  console.log("notes props", props);
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] =useState('a new note...')
  const [showAll, setShowAll] = useState(true)



  const notesToShow = showAll
  ? notes : notes.filter(note => note.important)
  console.log('note to show??',notesToShow)
  console.log('show all is?',showAll)

  const addNote = (e) => {
   e.preventDefault()
   const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: String(notes.length +1)
  }
  setNotes(notes.concat(noteObject))
  setNewNote('')

  console.log('button clicked', e.target)
   console.log('button clicked', e)
  notes.forEach(note => {
   console.log(`id: ${note.id}, type: ${typeof note.id}`) 
  });
  }
  const handleNoteChange = (e) => {
    const inputValue = e.target.value
    console.log('input field value:', inputValue)
    setNewNote(inputValue)

    

  
  
  }
    return (
    <>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show{showAll? 'important' : 'all'}
      </button>

      <ul>
        {notesToShow.map((note) => (
        //refactored to have a notes component 
        <Note key={note.id} note = {note}/>
      ))}
      </ul>

      <form onSubmit={addNote}>
        <input 
        value = {newNote}
        onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </>
  );
};

export default App;
