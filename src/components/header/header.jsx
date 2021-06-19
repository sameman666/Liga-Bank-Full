import React from 'react';
import './header.scss';
import logo from './logo.png';
import logoMobile from './logo_mobile.png';
import logoTablet from './logo_tablet.png';
import LoginPopup from '../login-popup/login-popup';
import {useState, useRef} from 'react';

const ESCAPE_KEYCODE = 27;

const Header = () => {

  const initialState = {
    isLoginModalOpen: false,
    isMenuOpened: false
  };

  const [state, setState] = useState(initialState);

  const passwordRef = useRef();

  const handleLoginPopup = () => {
    if (!state.isMenuOpened) {
      document.body.classList.toggle(`popup-opened`);
    }
    setState({
      ...state,
      isLoginModalOpen: !state.isLoginModalOpen,
    });
  };

  const loginPopupHandler = (evt) => {
    evt.preventDefault();
    handleLoginPopup();
  };

  const keyDownHandler = (evt) => {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      handleLoginPopup();
    }
  };

  const showPasswordHandler = () => {
    passwordRef.current.type = `text`;
  };

  const hidePasswordHandler = () => {
    passwordRef.current.type = `password`;
  };

  const formSubmitHandler = () => {
    localStorage.clear();
    handleLoginPopup();
  };

  const menuHandler = () => {
    document.body.classList.toggle(`popup-opened`);
    setState({
      ...state,
      isMenuOpened: !state.isMenuOpened,
    });
  };

  return (
    <header className={`header ${state.isMenuOpened ? `header--menu-opened` : ``}`}>
      <div className="header__wrapper">
        <button onClick={menuHandler} className="header__menu-button" aria-label="menu-button"></button>
        <a href="#">
          <picture>
            <source srcSet={logoMobile} media="(max-width: 767.2px)"/>
            <source srcSet={logoTablet} media="(max-width: 1023.2px)"/>
            <img src={logo} alt="Лига Банк"/>
          </picture>
        </a>
        <button onClick={menuHandler} className="header__close-menu-button"></button>
        <div className="header__menu">
          <nav className="header__navigation">
            <a href="#">Услуги</a>
            <a href="#">Рассчитать кредит</a>
            <a href="#">Конвертер валют</a>
            <a href="#">Контакты</a>
          </nav>
          <div className="header__login">
            <a onClick={loginPopupHandler} href="#" className="header__login-link-icon" aria-label="Войти в Интернет банк"></a>
          </div>
        </div>
      </div>
      {state.isLoginModalOpen && <LoginPopup onFormSubmitHandler={formSubmitHandler} onShowPasswordHandler={showPasswordHandler} onHidePasswordHandler={hidePasswordHandler} onLoginPopupHandler={loginPopupHandler} onKeyDownHandler={keyDownHandler} passwordRef={passwordRef}/>}
    </header>
  );
};

export default Header;
