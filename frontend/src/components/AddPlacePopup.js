import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, closeOverlay}) {

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setTitle('');
        setLink('');
      }, [isOpen]); 

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: title,
            link,
        });
    } 

    return (
        <PopupWithForm name="add" title="Новое место" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} closeOverlay={closeOverlay} >
              <section className="popup__section">
                <input type="text" name="title" value={title} onChange={handleChangeTitle} className="popup__input popup__input_title" placeholder="Название" minLength="2" maxLength="30" required />
                <span className="popup__error popup__error_title" id="title-error"></span>
              </section>
              <section className="popup__section">
                <input type="url" name="link" value={link} onChange={handleChangeLink} className="popup__input popup__input_link" placeholder="Ссылка на картинку" required />
                <span className="popup__error popup__error_link" id="link-error"></span>
              </section>
        </PopupWithForm>
    )
}

export default AddPlacePopup;