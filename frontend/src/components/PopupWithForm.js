import React from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, children, closeOverlay }) {

  const className = `popup popup-${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={className} onClick={closeOverlay}>
      <div className={`popup__window popup-${name}__window`}>
        <button type="reset" className={`popup__close popup-${name}__close`} onClick={onClose}></button>
        <h2 className={`popup__title popup-${name}__title`}>{title}</h2>
        <form className={`popup__form popup-${name}__form`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`popup__button popup-${name}__button`}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;