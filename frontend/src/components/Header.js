import React from 'react';
import { Link } from 'react-router-dom';

function Header({ loggedIn, mail, handleLogout, handleLinkClick, headerLink, headerLinkText }) {
    return (
        <header className="header">
            <div className="header__logo">
            </div>
            <ul className="header__menu">
                <li className="header__mail">{mail}</li>
                <li>{loggedIn ? <button onClick={handleLogout} type="button" className="header__button">Выйти</button> : <Link onClick={handleLinkClick} className="header__link" to={headerLink} >{headerLinkText}</Link>}</li>
            </ul>
        </header>
    );
}

export default Header;