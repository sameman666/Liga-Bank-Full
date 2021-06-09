/* eslint-disable no-console */
import {useEffect, useRef, useState} from 'react';
import CurrencyInput from 'react-currency-input';
import Select from 'react-select';
// import Swiper core and required modules
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import 'swiper/components/pagination/pagination.scss';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import car from '../tab/car.jpg';
import carMobile from '../tab/car_mobile.jpg';
import carTablet from '../tab/car_tablet.jpg';
import lock from '../tab/lock.jpg';
import lockMobile from '../tab/lock_mobile.jpg';
import lockTablet from '../tab/lock_tablet.jpg';
import phone from '../tab/phone.jpg';
import phoneMobile from '../tab/phone_mobile.jpg';
import phoneTablet from '../tab/phone_tablet.jpg';
import piggyBank from '../tab/piggybank.jpg';
import piggyBankMobile from '../tab/piggybank_mobile.jpg';
import piggyBankTablet from '../tab/piggybank_tablet.jpg';
import Tab from '../tab/tab';
import './main.scss';


// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

const PLACEHOLDER = `Выберите цель кредита`;
const smoothScroll = {
  behavior: `smooth`,
};
const ESCAPE_KEYCODE = 27;
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

const availableCredits = {
  HOUSE_CREDIT: `Ипотечное кредитование`,
  CAR_CREDIT: `Автомобильное кредитование`
};

const options = [
  {value: availableCredits.HOUSE_CREDIT, label: availableCredits.HOUSE_CREDIT},
  {value: availableCredits.CAR_CREDIT, label: availableCredits.CAR_CREDIT},
];

const customStyles = {
  indicatorsContainer: (provided, state) => ({
    ...provided,
    "transform": state.menuIsOpen ? `rotate(180deg)` : `rotate(0deg)`,
    "marginRight": 22,
    "@media (max-width: 767.2px)": {
      ...provided[`@media only screen and (max-width: 767.2px)`],
      marginRight: 14,
    },
  }),
  indicatorSeparator: () => ({
    display: `none`
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
    borderRadius: `0 0 4px 4px`
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    border: `1px solid #1F1E25`,
  }),
  option: (provided) => ({
    ...provided,
    padding: `25px 24px`,
    borderBottom: `1px solid #C1C2CA`,
    height: 60,
  }),
  control: (provided, state) => ({
    ...provided,
    "borderRadius": state.menuIsOpen ? `4px 4px 0 0` : `4px 4px 4px 4px`,
    "boxShadow": `none`,
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
    currentOption: ``,
    isFormShowed: false,
    isFormSubmitted: false,
    price: 2000000,
    initialFee: 200000,
    invalidPrice: false,
    invalidYears: false,
    initialFeeInPercent: 10,
    years: 5
  };

  const [state, setState] = useState(initialState);

  const calculator = useRef();
  const offices = useRef();
  const form = useRef();
  const successPopup = useRef();
  const initialFeeRange = useRef();
  const yearsRange = useRef();

  useEffect(() => {
    if (state.isFormShowed) {
      form.current.scrollIntoView(smoothScroll);
    }
    if (state.isFormSubmitted) {
      successPopup.current.focus();
    }
  });

  const scrollToCalculator = () => {
    calculator.current.scrollIntoView(smoothScroll);
  };

  const scrollToOffices = () => {
    offices.current.scrollIntoView(smoothScroll);
  };

  const tabHandler = (evt) => {
    setState({
      ...state,
      activeTab: evt.target.dataset.tabName,
    });
  };

  const createCustomDropdownIndicator = ({innerProps}) => {
    return <div className="main__dropdown-indicator" {...innerProps}></div>;
  };

  const setCurrentOption = (option) => {
    setState({
      ...state,
      currentOption: option.value,
    });
  };

  const setIsFormShowed = () => {
    setState({
      ...state,
      isFormShowed: true,
      isFormSubmitted: initialState.isFormSubmitted
    });
  };

  const closePopupSuccess = () => {
    setState({
      ...state,
      isFormSubmitted: initialState.isFormSubmitted
    });
    document.body.classList.toggle(`popup-opened`);
  };

  const onKeyDownHandler = (evt) => {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      setState({
        ...state,
        isFormSubmitted: initialState.isFormSubmitted
      });
      document.body.classList.toggle(`popup-opened`);
    }
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      isFormShowed: false,
      isFormSubmitted: true
    });
    document.body.classList.toggle(`popup-opened`);
  };

  const priceHandler = (_evt, _maskedValue, floatValue) => {
    if (floatValue < 1200000 || floatValue > 25000000) {
      setState({
        ...state,
        invalidPrice: true,
        price: floatValue,
      });
    } else {
      setState({
        ...state,
        invalidPrice: false,
        price: floatValue,
        initialFee: floatValue / 10,
      });
    }
    initialFeeRange.current.value = initialState.initialFeeInPercent;
  };

  const initialFeeHandler = (_evt, _maskedValue, floatValue) => {
    setState({
      ...state,
      initialFee: floatValue,
    });
    initialFeeRange.current.value = floatValue * 100 / state.price;
  };

  const incrementPrice = () => {
    if ((state.price + 100000) <= 25000000) {
      setState({
        ...state,
        price: state.price + 100000,
        initialFee: (state.price + 100000) / 10,
      });
    }
    initialFeeRange.current.value = initialState.initialFeeInPercent;
  };

  const decrementPrice = () => {
    if ((state.price - 100000) >= 1200000) {
      setState({
        ...state,
        price: state.price - 100000,
        initialFee: (state.price - 100000) / 10,
      });
    }
    initialFeeRange.current.value = initialState.initialFeeInPercent;
  };

  const initialFeeRangeHandler = (evt) => {
    setState({
      ...state,
      initialFee: state.price * evt.target.value / 100,
    });
  };

  const yearsHandler = (_evt, _maskedValue, floatValue) => {
    if (floatValue > 30 || floatValue < 5) {
      setState({
        ...state,
        invalidYears: true,
        years: floatValue,
      });
    } else {
      setState({
        ...state,
        invalidYears: false,
        years: floatValue,
      });
    }
    yearsRange.current.value = floatValue;
  };

  const yearsRangeHandler = (evt) => {
    setState({
      ...state,
      invalidYears: false,
      years: evt.target.value,
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
            <Select
              onChange={setCurrentOption}
              placeholder={PLACEHOLDER}
              options={options}
              styles={customStyles}
              components={{DropdownIndicator: createCustomDropdownIndicator}}
            />
          </div>
          {state.currentOption && <div className="main__calculator-parameters">
            <h3>Шаг 2. Введите параметры кредита</h3>
            <label htmlFor="price">Стоимость недвижимости</label>
            <div className="main__calculator-parameters-price">
              {state.invalidPrice && <p>Некорректное значение</p>}
              <CurrencyInput
                className={state.invalidPrice ? `main__invalid-input` : ``}
                value={state.price}
                onChangeEvent={priceHandler}
                suffix=" рублей"
                precision="0"
                thousandSeparator=" "
              />
              <button onClick={decrementPrice} className="main__calculator-price-button main__calculator-price-button--minus"></button>
              <button onClick={incrementPrice} className="main__calculator-price-button main__calculator-price-button--plus"></button>
            </div>
            <p className={state.invalidPrice ? `main__invalid-input-prompt` : ``}>От 1 200 000  до 25 000 000 рублей</p>
            <label htmlFor="initial-fee">Первоначальный взнос</label>
            <CurrencyInput value={state.initialFee} onChangeEvent={initialFeeHandler} suffix=" рублей" precision="0" thousandSeparator=" "/>
            <input ref={initialFeeRange} onChange={initialFeeRangeHandler} defaultValue={state.initialFeeInPercent} type="range" min='10' max="100" name="price-range" id="price-range" step="5"/>
            <p>10%</p>
            <label htmlFor="credit-term">Срок кредитования</label>
            {state.invalidYears && <p className="main__invalid-years-message">Некорректное значение</p>}
            <CurrencyInput
              className={state.invalidYears ? `main__invalid-input` : ``}
              value={state.years}
              onChangeEvent={yearsHandler}
              suffix=" лет"
              precision="0"
              thousandSeparator=" "
            />
            <input ref={yearsRange} defaultValue={state.years} onChange={yearsRangeHandler} type="range" min='5' max="30" name="years-range" id="years-range" step="1"/>
            <div className="main__calculator-years">
              <p className={state.invalidYears ? `main__invalid-input-prompt` : ``}>5 лет</p>
              <p className={state.invalidYears ? `main__invalid-input-prompt` : ``}>30 лет</p>
            </div>
            <input type="checkbox" name="maternal-capital" id="maternal-capital" />
            <label htmlFor="maternal-capital">Использовать материнский капитал</label>
          </div>}
        </div>
        {state.currentOption && <div className="main__calculator-popup">
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
            <button onClick={setIsFormShowed} type="button">Оформить заявку</button>
          </div>
          <div className="main__calculator-reject">
            <p className="main__calculator-offer-title">Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей.</p>
            <p className="main__calculator-offer-description">Попробуйте использовать другие параметры для расчёта.</p>
          </div>
        </div>}
      </section>
      {state.isFormShowed && <section className="main__form" ref={form}>
        <form onSubmit={formSubmitHandler} action="https://echo.htmlacademy.ru">
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
      </section>}
      {state.isFormSubmitted && <div onKeyDown={onKeyDownHandler} tabIndex={1} ref={successPopup} className="main__popup-success-overlay">
        <div className="main__popup-success">
          <button onClick={closePopupSuccess} type="button"></button>
          <p className="main__calculator-offer-title">Спасибо за обращение в наш банк.</p>
          <p className="main__calculator-offer-description">Наш менеджер скоро свяжется с вами по указанному номеру телефона.</p>
        </div>
      </div>}
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
