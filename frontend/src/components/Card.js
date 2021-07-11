import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, cardClick, onCardDelete, onCardLike }) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_set' : 'element__trash_unset'}`
  ); 

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__title-like ${isLiked ? 'element__title-like_unset' : 'element__title-like_set'}`
  ); 

  function handleClick() {
    cardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <button type="submit" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
      <p className="element__title-counter">{card.likes.length}</p>
      <div className="element__title">
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <h2 className="element__title-text">{card.name}</h2>
      </div>
    </div>
  )
}

export default Card;