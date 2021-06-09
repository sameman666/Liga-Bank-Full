/* eslint-disable no-console */
import {useState, useRef} from 'react';
import 'swiper/components/pagination/pagination.scss';
import './main.scss';
import Tab from '../tab/tab';
import piggyBank from '../tab/piggybank.jpg';
import car from '../tab/car.jpg';
import lock from '../tab/lock.jpg';
import phone from '../tab/phone.jpg';
import piggyBankTablet from '../tab/piggybank_tablet.jpg';
import carTablet from '../tab/car_tablet.jpg';
import lockTablet from '../tab/lock_tablet.jpg';
import phoneTablet from '../tab/phone_tablet.jpg';
import piggyBankMobile from '../tab/piggybank_mobile.jpg';
import carMobile from '../tab/car_mobile.jpg';
import lockMobile from '../tab/lock_mobile.jpg';
import phoneMobile from '../tab/phone_mobile.jpg';
import Select from 'react-select';
// import Swiper core and required modules
import SwiperCore, {Autoplay, Pagination} from 'swiper';

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

const TabName = {
  DEPOSITS: `DEPOSITS`,
  CREDITS: `CREDITS`,
  INSURANCE: `INSURANCE`,
  ONLINE: `ONLINE`
};

const mockTabsData = {
  DEPOSITS: {
    title: `Вклады Лига Банка – это выгодная инвестиция в свое будущее`,
    features: [`Проценты по вкладам до 7%`, `Разнообразные условия`, `Возможность ежемесячной капитализации или вывод процентов на банковскую карту`],
    isButton: true,
    isLink: false,
    image: piggyBank,
    imageTablet: piggyBankTablet,
    imageMobile: piggyBankMobile,
  },
  CREDITS: {
    title: `Лига Банк выдает кредиты под любые цели`,
    features: [`Ипотечный кредит`, `Автокредит`, `Потребительский кредит`],
    isButton: false,
    isLink: true,
    image: car,
    imageTablet: carTablet,
    imageMobile: carMobile,
  },
  INSURANCE: {
    title: `Лига Страхование — застрахуем все что захотите`,
    features: [`Автомобильное страхование`, `Страхование жизни и здоровья`, `Страхование недвижимости`],
    isButton: true,
    isLink: false,
    image: lock,
    imageTablet: lockTablet,
    imageMobile: lockMobile,
  },
  ONLINE: {
    title: `Лига Банк — это огромное количество онлайн-сервисов для вашего удобства`,
    features: [`Мобильный банк,
    который всегда под рукой`, `Приложение Лига-проездной позволит вам оплачивать билеты по всему миру`],
    isButton: true,
    isLink: false,
    image: phone,
    imageTablet: phoneTablet,
    imageMobile: phoneMobile,
  },
};

const options = [
  {value: `Ипотечное кредитование`, label: `Ипотечное кредитование`},
  {value: `Автомобильное кредитование`, label: `Автомобильное кредитование`},
];

const customStyles = {
  indicatorSeparator: () => ({
    display: `none`
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (provided) => ({
    ...provided,
    padding: `25px 24px`,
    borderBottom: `1px solid #C1C2CA`,
    height: 60,
  }),
  control: (provided) => ({
    ...provided,
    "height": 60,
    "paddingLeft": 21,
    "borderColor": `#1F1E25`,
    "paddingTop": 3,
    "@media (max-width: 767.2px)": {
      ...provided[`@media only screen and (max-width: 767.2px)`],
      paddingLeft: 12,
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  container: (provided) => ({
    ...provided,
    "width": 600,
    "height": 60,
    "marginTop": 25,
    "@media (max-width: 1023.2px)": {
      ...provided[`@media only screen and (max-width: 1023.2px)`],
      width: `100%`,
      marginTop: 21,
    },
    "@media (max-width: 767.2px)": {
      ...provided[`@media only screen and (max-width: 767.2px)`],
      marginTop: 16,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: `#1F1E25`,
    fontWeight: 500,
  }),
};

const Main = () => {

  const initialState = {
    activeTab: TabName.DEPOSITS,
  };

  const [state, setState] = useState(initialState);

  const calculator = useRef();
  const offices = useRef();

  const scrollToCalculator = () => {
    calculator.current.scrollIntoView({behavior: `smooth`});
  };

  const scrollToOffices = () => {
    offices.current.scrollIntoView({behavior: `smooth`});
  };

  const tabHandler = (evt) => {
    setState({
      ...state,
      activeTab: evt.target.dataset.tabName,
    });
  };

  return (
    <main className="main">
      <section className="main__swiper">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{clickable: false}}
          autoplay={{
            "delay": 4000,
            "disableOnInteraction": false
          }}
        >
          <SwiperSlide>
            <div className="main__swiper-slide main__swiper-slide--1">
              <div className="main__swiper-slide-info">
                <h1>Лига Банк</h1>
                <p>Кредиты на любой случай</p>
                <button onClick={scrollToCalculator} type="button">Рассчитать кредит</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="main__swiper-slide main__swiper-slide--2">
              <div className="main__swiper-slide-info">
                <h1>Лига Банк</h1>
                <p>Ваша уверенность в завтрашнем дне</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="main__swiper-slide main__swiper-slide--3">
              <div className="main__swiper-slide-info">
                <h1>Лига Банк</h1>
                <p>Всегда рядом</p>
                <button onClick={scrollToOffices} type="button">Найти отделение</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="main__tabs">
        <div className="main__tabs-buttons">
          <button onClick={tabHandler} className={`main__tabs-button main__tabs-button--vault ${state.activeTab === TabName.DEPOSITS ? `main__tabs-button--active` : ``}`} data-tab-name={TabName.DEPOSITS} type="button">Вклады</button>
          <button onClick={tabHandler} className={`main__tabs-button main__tabs-button--cards ${state.activeTab === TabName.CREDITS ? `main__tabs-button--active` : ``}`} data-tab-name={TabName.CREDITS} type="button">Кредиты</button>
          <button onClick={tabHandler} className={`main__tabs-button main__tabs-button--security ${state.activeTab === TabName.INSURANCE ? `main__tabs-button--active` : ``}`} data-tab-name={TabName.INSURANCE} type="button">Страхование</button>
          <button onClick={tabHandler} className={`main__tabs-button main__tabs-button--phone ${state.activeTab === TabName.ONLINE ? `main__tabs-button--active` : ``}`} data-tab-name={TabName.ONLINE} type="button">Онлайн-сервисы</button>
        </div>
        <div className="main__tabs-content">
          <Tab data={mockTabsData[state.activeTab]}/>
        </div>
      </section>
      <section className="main__swiper-service">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{clickable: false}}
        >
          <SwiperSlide>
            <Tab data={mockTabsData[TabName.DEPOSITS]}/>
          </SwiperSlide>
          <SwiperSlide>
            <Tab data={mockTabsData[TabName.CREDITS]}/>
          </SwiperSlide>
          <SwiperSlide>
            <Tab data={mockTabsData[TabName.INSURANCE]}/>
          </SwiperSlide>
          <SwiperSlide>
            <Tab data={mockTabsData[TabName.ONLINE]}/>
          </SwiperSlide>
        </Swiper>
      </section>
      <section ref={calculator} className="main__calculator">
        <div className="main__calculator-inputs">
          <h2>Кредитный калькулятор</h2>
          <div className="main__calculator-target">
            <h3>Шаг 1. Цель кредита</h3>
            <Select placeholder={`Выберите цель кредита`} options={options} styles={customStyles} />
          </div>
          <div className="main__calculator-parameters">
            <h3>Шаг 2. Введите параметры кредита</h3>
            <label htmlFor="price">Стоимость недвижимости</label>
            <div className="main__calculator-parameters-price">
              <input type="text" name="price" id="price" defaultValue="2 000 000 рублей"/>
              <button className="main__calculator-price-button main__calculator-price-button--minus"></button>
              <button className="main__calculator-price-button main__calculator-price-button--plus"></button>
            </div>
            <p>От 1 200 000  до 25 000 000 рублей</p>
            <label htmlFor="initial-fee">Первоначальный взнос</label>
            <input type="text" name="initial-fee" id="initial-fee" defaultValue="200 000 рублей"/>
            <div className="main__calculator-line">
              <div className="main__calculator-pin"></div>
              <div className="main__calculator-depth"></div>
            </div>
            <p>10%</p>
            <label htmlFor="credit-term">Срок кредитования</label>
            <input type="text" name="credit-term" id="credit-term" defaultValue="5 лет"/>
            <div className="main__calculator-line">
              <div className="main__calculator-pin"></div>
              <div className="main__calculator-depth"></div>
            </div>
            <div className="main__calculator-years">
              <p>5 лет</p>
              <p>30 лет</p>
            </div>
            <input type="checkbox" name="maternal-capital" id="maternal-capital" />
            <label htmlFor="maternal-capital">Использовать материнский капитал</label>
          </div>
        </div>
        <div className="main__calculator-popup">
          <div className="main__calculator-offer">
            <p className="main__calculator-offer-title">Наше предложение</p>
            <div className="main__calculator-offer-wrapper">
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">1 330 000 рублей</p>
                <p className="main__calculator-offer-description">Сумма ипотеки</p>
              </div>
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">9,40%</p>
                <p className="main__calculator-offer-description">Процентная ставка</p>
              </div>
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">27 868 рублей</p>
                <p className="main__calculator-offer-description">Ежемесячный платеж</p>
              </div>
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">61 929 рублей</p>
                <p className="main__calculator-offer-description">Необходимый доход</p>
              </div>
            </div>
            <button type="button">Оформить заявку</button>
          </div>
          <div className="main__calculator-reject">
            <p className="main__calculator-offer-title">Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей.</p>
            <p className="main__calculator-offer-description">Попробуйте использовать другие параметры для расчёта.</p>
          </div>
        </div>
      </section>
      <section className="main__form">
        <form action="https://echo.htmlacademy.ru">
          <h3>Шаг 3. Оформление заявки</h3>
          <ul>
            <li>
              <p>Номер заявки</p>
              <p>№ 0010</p>
            </li>
            <li>
              <p>Цель кредита</p>
              <p>Ипотека</p>
            </li>
            <li>
              <p>Стоимость недвижимости</p>
              <p>2 000 000 рублей</p>
            </li>
            <li>
              <p>Первоначальный взнос</p>
              <p>200 000 рублей</p>
            </li>
            <li>
              <p>Срок кредитования</p>
              <p>5 лет</p>
            </li>
          </ul>
          <label htmlFor="full-name"></label>
          <input type="text" name="full-name" id="full-name" placeholder="ФИО"/>
          <div className="main__form-contacts">
            <label htmlFor="phone"></label>
            <input type="tel" name="phone" id="phone" placeholder="Телефон"/>
            <label htmlFor="email"></label>
            <input type="email" name="email" id="email" placeholder="E-mail"/>
          </div>
          <button type="submit">Отправить</button>
        </form>
      </section>
      <section ref={offices} className="main__offices">
        <div className="main__offices-map">
          <h2>Отделения Лига Банка</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d577325.3464971667!2d36.82513809290739!3d55.58152447403445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2z0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1623077063555!5m2!1sru!2sru" style={{border: `0`}} allowFullScreen="" loading="lazy"></iframe>
        </div>
      </section>
    </main>
  );
};

export default Main;
