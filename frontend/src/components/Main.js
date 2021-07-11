import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, deleteCard, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext); 
  
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__image">
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
            <button type="button" className="profile__overlay" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-title"><h2 className="profile__visitor-name">{currentUser.name}</h2><button type="button" className="profile__edit-button" onClick={onEditProfile}></button></div>
            <p className="profile__visitor-attribute">{currentUser.about}</p>
          </div>
          <div className="profile__add">
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
          </div>
        </div>
      </section>

      <section className="elements">
        {cards.map((item) => (<Card key={item._id} card={item} cardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike} />))}
      </section>
    </main>
  );
}

export default Main;