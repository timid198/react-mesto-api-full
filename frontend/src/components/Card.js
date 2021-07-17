import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, cardClick, onCardDelete, onCardLike }) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser._id;
  const isCardOwn = card.owner._id === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `element__trash ${(isOwn || isCardOwn) ? 'element__trash_set' : 'element__trash_unset'}`
  ); 

  const isLiked = card.likes.some(i => i.includes(currentUser._id));
  // const isCardLiked = card.likes._id.some(i => i === currentUser._id);
  console.log(`при лайке: ${isLiked}`);
  // console.log(`при рендере: ${isCardLiked}, при лайке: ${isLiked}, выражение: ${isLiked || isCardLiked}`);

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