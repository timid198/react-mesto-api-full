import React from 'react';

function InfoTooltip({ isOpen, content, onClose, closeOverlay }) {

    const className = `popup ${isOpen ? 'popup_opened' : ''}`;
    const imageSrc = `${content ? 'popup-infotooltip__image-sucсess' : 'popup-infotooltip__image-failed'}`
    const title = `${content ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`

    return(
        <div className={className} onClick={closeOverlay}>
            <div className="popup__window popup-infotooltip">
                <button type="reset" className="popup__close popup-infotooltip__close" onClick={onClose} />
                <div className={imageSrc} />
                <h2 className="popup-infotooltip__title">{title}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;