// PROPS DRILLING
import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Notes from "./components/Notes"
import pen from './assets/images/pen.svg'
import Modal from "./components/Modal"
import { ToDoContext  } from "./content/context"
import { useTranslation } from "react-i18next"


function App() {
  const { t } = useTranslation()
  const getLs = () => localStorage.notes ? JSON.parse(localStorage.notes) : []
  const setLs = () => localStorage.notes = JSON.stringify(notes)
  const [notes, setNotes] = useState(getLs)
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    setLs()
  }, [notes])
  
  
  const openModalHandler = () => {
    setIsModalOpen(true)
  }
  const closeModalHandler = () => {
    setEditNote(null)
    setIsModalOpen(false)
    setIsEdit(false)
  }
  const addOrChangeNoteHandler = (note) => {
    if(editNote?.id){
      const updatedNotes = notes.map(item => {
        if(item.id === note.id) {
          return note
        }
        return item
      })
      setNotes(updatedNotes)
    }else  setNotes([...notes, note])
  }
  const deleteNoteHandler = (id) => {
    if (confirm('Вы уверены?')) {
      setNotes(notes.filter(note => note.id !== id))
    }
  }
  const [isEdit, setIsEdit] = useState(false)
  const [editNote, setEditNote] = useState(null)
  const changeNoteHandler = (note) => {
    setEditNote(note)
    setIsModalOpen(true)
    setIsEdit(true)
  }

  const [searchValue, setSearchValue] = useState('')
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchValue.toLowerCase()))
  const setSearchingHandler = (val) => {
    setSearchValue(val)
  }



  return (
    <ToDoContext.Provider
      value={{ 
        setSearchingHandler,
        addOrChangeNoteHandler,
        deleteNoteHandler,
        closeModalHandler,
        changeNoteHandler,
        t
       }}
    >
      <Navbar />
      <Notes notes={filteredNotes}/>
      {isModalOpen && <Modal edit={isEdit} editNote={editNote}/>}
      <button className="add" onClick={() => openModalHandler()}>
        <img src={pen} alt="" />
      </button>
    </ToDoContext.Provider>
  )
}

export default App