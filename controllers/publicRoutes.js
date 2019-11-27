const Router = require('express').Router()
import ReactDOM from 'react-dom'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)


    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

    }

    

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }
    }

    return (
        <div>
            <h1>Notes</h1>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root'))

module.exports = Router