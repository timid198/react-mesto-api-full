import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, closeOverlay}) {

const [name, setName] = React.useState('');
const [description, setDescription] = React.useState('');

const currentUser = React.useContext(CurrentUserContext);

React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 


    return (
        <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} closeOverlay={closeOverlay} >
              <section className="popup__section">
                <input type="text" value={name} onChange={handleChangeName} name="name" className="popup__input popup__input_name" placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="popup__error popup__error_name" id="name-error"> </span>
              </section>
              <section className="popup__section">
                <input type="text"  value={description} onChange={handleChangeDescription} name="about" className="popup__input popup__input_about" placeholder="О себе" minLength="2" maxLength="200" required />
                <span className="popup__error popup__error_about" id="about-error"> </span>
              </section>
        </PopupWithForm>
    )
}

export default EditProfilePopup;