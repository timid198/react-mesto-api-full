import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeletePopup from './CardDeletePopup';
import Spinner from './Spinner/Spinner';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../utils/mestoAuth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [cardToDelete, setCardToDelete] = React.useState({});

  function handleDeleteCard(card) {
    setCardToDelete(card);
  }

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(element) {
    setSelectedCard(element);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setCardToDelete({});
    setSelectedCard({});
    setIsInfoToolTip(false);
  }

  const [currentUser, setCurrentUser] = useState( {name: '', about: '', avatar: '', _id: ''} );
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    Promise.all([api.getUserData(), api.getCards()])
      .then(res => {
        const [userData, cardsData] = res;
        setCurrentUser(userData);
        setCards(cardsData);}) 
      .catch((err) => console.log(err))
      .finally(() => {setLoading(false)})
  }, [])

function handleUpdateUser(props) {
  setLoading(true)
  api.pushUserData(props)
  .then(res => {
    setCurrentUser(res);
    closeAllPopups();})
  .catch((err) => console.log(err))
  .finally(() => {setLoading(false)});
}

function handleUpdateAvatar(props) {
  setLoading(true)
  api.changeAvatar(props.avatar)
  .then(res => {
    setCurrentUser(res);
    closeAllPopups();})
  .catch((err) => console.log(err))
  .finally(() => {setLoading(false)});
  }
  
  function handleCardLike(card) {
    setLoading(true)
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeCardsLikes(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));})
    .catch((err) => console.log(err))
    .finally(() => {setLoading(false)});
} 

function handleCardDelete(card) {
  setLoading(true)
  api.deleteCard(card._id)
  .then((newCard) => {
    setCards((state) => state.filter((c) => c._id === card._id ? !newCard : c));
    closeAllPopups();})
  .catch((err) => console.log(err))
  .finally(() => {setLoading(false)});
} 

function handleAddPlaceSubmit(props) {
  setLoading(true)
  api.pushAddCardData(props)
  .then(res => {
    setCards([res, ...cards]);
    closeAllPopups();})
  .catch((err) => console.log(err))
  .finally(() => {setLoading(false)});
}

// 12 спринт

const [loggedIn, setLoggedIn] = useState(false);
const [userEmail, setUserEmail] = useState('');
const history = useHistory();

useEffect(() =>{
  checkToken();
}, [loggedIn]);

useEffect(() =>{
  if (loggedIn) {
    <Redirect to="/" />;
  }
}, [loggedIn]);

const [isInfoTooltip, setIsInfoToolTip] = useState(false);
const [contentInfotooltip, setContentInfoTooltip] = useState(false);

function handleRegister({password, email}) {
  mestoAuth.register(password, email)
  .then(data => {
    setIsInfoToolTip(true);
    setContentInfoTooltip(true);
  })
  .catch(err => {
    console.error(err);
    setIsInfoToolTip(true);
    setContentInfoTooltip(false);
  })
}

function handleLogin({password, email}) {
  mestoAuth.authorize(password, email)
  .then(data => {
    if (data.token) {
      setLoggedIn(true);
      localStorage.setItem('jwt', data.token);
      history.push('/');
    }
  })
  .catch(err => {
    console.error(err);
    setUserEmail('');
    setIsInfoToolTip(true);
    setContentInfoTooltip(false);
  })
}

function checkToken() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
  mestoAuth.getContent(jwt)
  .then(data => {
    if (data.data.email) {
      setUserEmail(data.data.email);
      setLoggedIn(true);
      history.push('/');
    }
  })
  .catch(err => console.error(err))
  }
}

function handleLogout() {
  setUserEmail('');
  setLoggedIn(false);
  localStorage.removeItem('jwt');
  history.push('/sign-in');
}

const [headerLink, setHeaderLink] = useState('/sign-up');
const [isHeaderLinkText, setIsHeaderLinkText] = useState('Регистрация');

function handleLinkClick() {
  if (headerLink === '/sign-up') {
    setHeaderLink('/sign-in');
    setIsHeaderLinkText('Войти');
  } else {
    setHeaderLink('/sign-up');
    setIsHeaderLinkText('Регистрация');
  }
}

function closeOverlay(evt){
  if(evt.target === evt.currentTarget){
    closeAllPopups()
  }
}

useEffect(() => {
  const handleEsc = (event) => {
      if (event.key === 'Escape') 
      closeAllPopups();
  };
  window.addEventListener('keydown', handleEsc);

  return () => {
      window.removeEventListener('keydown', handleEsc);
  };
}, []);

  return (

    <CurrentUserContext.Provider value={currentUser}>      
        <div className="App">
          <div className="page">
          
            <Header loggedIn={loggedIn} handleLogout={handleLogout} mail={userEmail} handleLinkClick={handleLinkClick} headerLink={headerLink} headerLinkText={isHeaderLinkText} />
            { isLoading ? <Spinner /> : '' }
            <Switch >
              <Route path="/sign-up">
                <Register handleRegister={handleRegister} clear={isInfoTooltip} />
              </Route>
              <Route path="/sign-in">
                <Login handleLogin={handleLogin} />
              </Route>
              <ProtectedRoute exact path="/" component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardDelete={handleDeleteCard} cards={cards} onCardLike={handleCardLike} loggedIn={loggedIn} />
              <Route>
                  {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            
            <Footer />

            <InfoTooltip isOpen={isInfoTooltip} content={contentInfotooltip} onClose={closeAllPopups} closeOverlay={closeOverlay} />
            
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} closeOverlay={closeOverlay} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} closeOverlay={closeOverlay} /> 
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} closeOverlay={closeOverlay} /> 
            <CardDeletePopup isOpen={cardToDelete._id} onClose={closeAllPopups} onCardDelete={handleCardDelete} closeOverlay={closeOverlay} />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} closeOverlay={closeOverlay} />

          </div>
        </div>      
    </CurrentUserContext.Provider>
  );
}

export default App;