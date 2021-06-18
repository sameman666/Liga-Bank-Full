import React from 'react';
import './login-popup.scss';
import popupLogo from './popup_logo.png';
import PropTypes from 'prop-types';
import {useState} from 'react';

const LoginPopup = ({onLoginPopupHandler, onKeyDownHandler, passwordRef, onShowPasswordHandler, onHidePasswordHandler, onFormSubmitHandler}) => {

  const initialLocalStorage = {
    login: localStorage.getItem(`login`) ? localStorage.getItem(`login`) : ``,
    password: localStorage.getItem(`password`) ? localStorage.getItem(`password`) : ``,
  };

  const [state] = useState(initialLocalStorage);

  const setLocalStorageItems = (evt) => {
    switch (evt.target.name) {
      case `login`: {
        localStorage.setItem(`login`, evt.target.value);
        break;
      }
      case `password`: {
        localStorage.setItem(`password`, evt.target.value);
        break;
      }
    }
  };

  return (
    <div onKeyDown={onKeyDownHandler} tabIndex={0} className="popup-overlay">
      <div className="popup">
        <div className="popup__inputs">
          <div className="popup__head">
            <img src={popupLogo} alt="Лига Банк" />
            <button onClick={onLoginPopupHandler} className="popup__close-button"></button>
          </div>
          <form onSubmit={onFormSubmitHandler} action="https://echo.htmlacademy.ru">
            <label htmlFor="login">Логин</label>
            <input onChange={setLocalStorageItems} defaultValue={state.login} type="text" name="login" id="login" autoFocus={true} required/>
            <label htmlFor="password">Пароль</label>
            <input onChange={setLocalStorageItems} defaultValue={state.password} type="password" name="password" id="password" ref={passwordRef} required/>
            <button onMouseDown={onShowPasswordHandler} onMouseUp={onHidePasswordHandler} type="button"></button>
            <a href="#">Забыли пароль?</a>
            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginPopup.propTypes = {
  onLoginPopupHandler: PropTypes.func,
  onKeyDownHandler: PropTypes.func,
  passwordRef: PropTypes.shape({
    current: PropTypes.object
  }),
  onShowPasswordHandler: PropTypes.func,
  onHidePasswordHandler: PropTypes.func,
  onFormSubmitHandler: PropTypes.func
};

export default LoginPopup;
