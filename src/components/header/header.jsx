import './header.scss';
import logo from './logo.png';
import logoMobile from './logo_mobile.png';
import logoTablet from './logo_tablet.png';
import LoginPopup from '../login-popup/login-popup';

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <button className="header__menu-button"></button>
        <a href="#">
          <picture>
            <source srcSet={logoMobile} media="(max-width: 767.2px)" />
            <source srcSet={logoTablet} media="(max-width: 1023.2px)" />
            <img src={logo} alt="Лига Банк" />
          </picture>
        </a>
        <button className="header__close-menu-button"></button>
        <div className="header__menu">
          <nav className="header__navigation">
            <a href="#">Услуги</a>
            <a href="#">Рассчитать кредит</a>
            <a href="#">Конвертер валют</a>
            <a href="#">Контакты</a>
          </nav>
          <div className="header__login">
            <a href="#" className="header__login-link-icon"></a>
            <a href="#" className="header__login-link">Войти в Интернет банк</a>
          </div>
        </div>
      </div>
      <LoginPopup />
    </header>
  );
};

export default Header;
