import { useEffect, useState, useRef, useContext } from 'react'
import zoom from '../assets/images/zoom.svg'
import clean from '../assets/images/clean.svg'
import back from '../assets/images/back.svg'
import { ToDoContext } from '../content/context'
import i18next from 'i18next'

const Navbar = (  ) => {
  const {setSearchingHandler, t} = useContext(ToDoContext)
  const [show, setShow] = useState(true)
  const [text, setText] = useState('')
  const isMounted = useRef(false)
  const reset = () => {
    setText('')
    setShow(true)
  }


  useEffect(() => {
    if(isMounted.current) setSearchingHandler(text)
    isMounted.current = true
  }, [text])
  

  const [lang, setLang] = useState(false)
  const changeLang = () => {
    setLang(!lang)
    if(!lang) i18next.changeLanguage('uz')
    else i18next.changeLanguage('ru')

  }
  
  return (
    <header className="header">
      {show ? (
        <nav className="header__nav">
            <button className="header__nav-lang" onClick={() => changeLang()}>
              {!lang ? 'RU' : 'UZ'}
            </button>
            <h1 className="header__nav-title">{t('zametki')}</h1>
            <button className="header__nav-search" onClick={() => setShow(false)}>
                <img src={zoom} alt="" />
            </button>
        </nav>
      ) : (
        <nav className="header__nav">
          <button 
              className="header__nav-back" 
              onClick={() => reset(true)}>
            <img src={back} alt="" />
          </button>
              <input 
                  type="text" 
                  className="header__nav-input" 
                  placeholder='Поиск...' 
                  value={text} 
                   onChange={(e)=>setText(e.target.value)} 
               />
          <button 
              className="header__nav-clean" 
              onClick={() => setText('')}>
                  <img src={clean} alt="" />
          </button>
        </nav>
      )}
        
        
    </header>
  )
}

export default Navbar