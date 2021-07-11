import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, closeOverlay}) {

    const avatarRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault();      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
    } 

    return(
        <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} closeOverlay={closeOverlay} >
              <section className="popup__section">
                <input type="url" ref={avatarRef} name="avatar" className="popup__input popup__input_avatar" placeholder="Ссылка на аватар" required />
                <span className="popup__error popup__error_avatar" id="avatar-error"> </span>
              </section>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;