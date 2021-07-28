import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import style from './style.module.css'

const Modal = ({ modalId, title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
      const handleClick = e => {
        if (e.target && e.target.id === modalId) {
            // Code
        }
      }

      if (isOpen) {
          document.body.style.overflow = 'hidden'
          window.addEventListener('click', handleClick)
      }
  }, [isOpen])

  return (
    isOpen &&
    createPortal(
      <div id={modalId} className={style.modal}>
        <div id="overlay" className={style.overlay}>
          <div className={style.content}>
            <div className={style.header}>
              <h3>{title}</h3>
              <FaTimes />
            </div>
            <div className={style.body}>{children}</div>
          </div>
        </div>
      </div>,
      document.body
    )
  )
}
