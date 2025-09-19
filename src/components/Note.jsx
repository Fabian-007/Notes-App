const Note = (props)=>{
  console.log(props)
  const {note, toggleImportance} = props
  return(
    <>
    <li>{note.content}</li>
    <button onClick={toggleImportance}>toggle</button>
    </>
  )
}

export default Note