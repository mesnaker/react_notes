import { useContext } from 'react'
import pen from '../assets/images/pen.svg'
import del from '../assets/images/del.svg'
import clsx from 'clsx'
import { ToDoContext } from '../content/context'

const NotesItem = ({ note, view, }) => {
  const {changeNoteHandler, deleteNoteHandler} = useContext(ToDoContext)
  const noteItemTopClass = clsx("notes__item-top", {active: !view})
  return (
    <div className="notes__item">
      <div className={noteItemTopClass}>
        <h2>{note.title}</h2>
        <span>{note.date}</span>
      </div>
      <p>{note.text}</p>
      <div className="notes__item-btns">
        <button className="purple" onClick={() => changeNoteHandler(note)}>
          <img src={pen} alt="" />
          <span>РЕДАКТИРОВАТЬ</span>
        </button>
        <button className="red" onClick={()=>deleteNoteHandler(note.id)}>
          <img src={del} alt="" />
          <span>УДАЛИТЬ</span>
        </button>
      </div>
    </div>
  )
}

export default NotesItem