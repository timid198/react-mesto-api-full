import React from 'react';

function ImagePopup({ card, onClose, closeOverlay }) {

  const className = `popup ${card.link ? 'popup_opened' : ''}`;
  
  return (
    <div className={className}  onClick={closeOverlay}>
      <div className="popup__window popup-view__window">
        <button type="reset" className="popup__close popup-view__close" onClick={onClose}></button>
        <div className="popup-view__form">
          <img src={card.link} alt={card.name} className="popup-view__image" />
          <h2 className="popup-view__title">{card.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup;