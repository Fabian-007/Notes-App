import { useEffect, useState } from 'react';
import axios from 'axios'
import Note from './components/Note';


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] =useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    console.log('ID', id)
    console.log('URL',url)
    const note = notes.find(n => n.id === id) 
    console.log('note object', note)
    const changedNote = {...note, important : !note.important}
    console.log('new note object??', changedNote)
    axios.put(url, changedNote).then(response => {
      console.log('PUT promise?', response)
      console.log('response data?', response.data)
      console.log('note id?', note.id)
      console.log(`importance of ${id} needs to be toggled`)
      

    setNotes(notes.map(note => note.id === id 
      ? response.data //replace the matching note object with updated new note object one from server, 
      : note //otherwise, just leave note object unchanged  
       ))
      })
      
  }

  const hook = ()=> {
  console.log('effect')
  const promise = axios.get('http://localhost:3001/notes')
    promise.then( response => {
      console.log('promise fufilled')
      setNotes(response.data)
    })
    console.log('promise',promise)
  }

  useEffect(hook, [])

  console.log('render', notes.length, 'notes')


  // filtering displayed element 
  const notesToShow = showAll
  ? notes : notes.filter(note => note.important)
  console.log('note to show??',notesToShow)
  console.log('show all is?',showAll)

  const addNote = (e) => {
   e.preventDefault()
   const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }
  
  axios
  .post('http://localhost:3001/notes', noteObject)
  .then(response => {
    console.log('RESPONSE', response)
    setNotes(notes.concat(response.data))
    setNewNote('')
  })

  // console.log('button clicked', e.target)
  //  console.log('button clicked', e)`
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
        <Note 
        key={note.id} 
        note = {note}
        toggleImportance = {()=> toggleImportanceOf(note.id)}/>

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
