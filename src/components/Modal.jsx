import { useState, useContext } from 'react'
import { v4 } from 'uuid'
import { ToDoContext } from '../content/context'

const Modal = ({ edit, editNote }) => {
    const {closeModalHandler:closeModal, addOrChangeNoteHandler:addOrChangeNote} = useContext(ToDoContext)
    const [title, setTitle] = useState(editNote?.title ?? '')
    const [text, setText] = useState(editNote?.text ?? '')
    const addOrChange = () => {
        if (title.length > 1 && text.length > 1) {
            const note = {
                id: editNote?.id ?? v4(),
                title: title,
                text: text,
                date: new Date().toLocaleDateString()
            }
            addOrChangeNote(note)
            closeModal()
        }else alert('Слишком мало букв...')
    }
  return (
    <div className="modal" onClick={() => closeModal()}>
        <div className="modal__block" onClick={(event) => event.stopPropagation()}>
            <h2 className="modal__block-title">
                {!edit ? 'Добавить' : 'Изменить'} заметку
            </h2>
            <div className="modal__block-inputs">
                <label>
                    <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <span>Title</span>
                </label>
                <label>
                    <input type="text" placeholder='Content' value={text} onChange={(e) => setText(e.target.value)} />
                    <span>Content</span>
                </label>
            </div>
            <div className="modal__block-btns">
                <button className='red' onClick={() => closeModal()}>Отмена</button>
                {!edit && <button className='purple' onClick={() => addOrChange()}>Добавить</button>}
                {edit && <button className='purple' onClick={() => addOrChange()}>Изменить</button>}
            </div>
        </div>
    </div>
  )
}

export default Modal