import React from 'react';
import './footer.scss';
import logo from './logo.png';
import logoMobile from './logo_mobile.png';
import logoTablet from './logo_tablet.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__links">
          <a className="footer__logo" href="#">
            <picture>
              <source srcSet={logoMobile} media="(max-width: 767.2px)"/>
              <source srcSet={logoTablet} media="(max-width: 1023.2px)"/>
              <img src={logo} alt="Лига Банк"/>
            </picture>
          </a>
          <nav>
            <a href="#">Услуги</a>
            <a href="#">Рассчитать кредит</a>
            <a href="#">Контакты</a>
            <a href="#">Задать вопрос</a>
          </nav>
          <p>150015, г. Москва, ул. Московская, д. 32 Генеральная лицензия Банка России №1050 Ⓒ Лига Банк, 2019</p>
        </div>
        <div className="footer__contacts">
          <div className="footer__contact">
            <a href="tel:*0904">*0904</a>
            <p>Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
          </div>
          <div className="footer__contact">
            <a href="tel:88001112233">8 800 111 22 33</a>
            <p>Бесплатный для всех городов России</p>
          </div>
          <div className="footer__social">
            <a href="#" className="footer__social-link footer__social-link--facebook" aria-label="facebook"></a>
            <a href="#" className="footer__social-link footer__social-link--instagramm" aria-label="instagramm"></a>
            <a href="#" className="footer__social-link footer__social-link--twitter" aria-label="twitter"></a>
            <a href="#" className="footer__social-link footer__social-link--youtube" aria-label="youtube"></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
