const Note = (props)=>{
  console.log(props)
  const {note, toggleImportance} = props

  const label = note.important
   ? 'make not iportant'  : 'make important'
  return(
    <>
    <li className="note">
      {note.content}
       <button onClick={toggleImportance}>{label}</button></li>
    
    </>
  )
}

export default Note