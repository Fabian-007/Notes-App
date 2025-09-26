const Notification = ({message}) =>{
    console.log('error message', message)
    if(message === null){
        return null 
    }
    return(
    < div className = 'error'>
        {message}
    </div>
    )
}
export default Notification