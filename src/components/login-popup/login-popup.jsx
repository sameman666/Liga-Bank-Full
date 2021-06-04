import './login-popup.scss';
import popupLogo from './popup_logo.png';

const LoginPopup = () => {
  return (
    <div className="popup">
      <div className="popup__inputs">
        <div className="popup__head">
          <img src={popupLogo} alt="Лига Банк" />
          <button className="popup__close-button"></button>
        </div>
        <form action="https://echo.htmlacademy.ru">
          <label htmlFor="login">Логин</label>
          <input type="text" id="login" />
          <label htmlFor="password">Пароль</label>
          <input type="text" id="password" />
          <a href="#">Забыли пароль?</a>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
