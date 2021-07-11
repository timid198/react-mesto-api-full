import React from 'react';
import PopupWithForm from './PopupWithForm';

function CardDeletePopup({isOpen, onClose, onCardDelete, closeOverlay}) {

    function handleSubmit(e) {
        e.preventDefault();      
        onCardDelete({
          _id: isOpen,
        });
    } 

    return(
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} closeOverlay={closeOverlay} />
    )
}

export default CardDeletePopup;