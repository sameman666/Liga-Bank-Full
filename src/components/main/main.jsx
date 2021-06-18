import React, {useEffect, useRef, useState} from 'react';
import CurrencyInput from 'react-currency-input';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import Tab from '../tab/tab';
import {PLACEHOLDER, smoothScroll, ESCAPE_KEYCODE, TabName, mockTabsData, AvailableCredit, options, customStyles, INITIAL_FORM_NUMBER, MIN_INCOME_IN_PERCENT, returnCreditTarget, returnSeparatedPrice, setLocalStorageItems, returnCreditOption, returnPriceRange, returnMinCreditAmount, returnCreditName, returnYearsRange, returnYearsText, returnCreditTargetForPopup, DELAY_FOR_SLIDER, returnCurrencyText, Price, Rate, Fee, Year} from '../../utils/const';
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import 'swiper/components/pagination/pagination.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import './main.scss';
SwiperCore.use([Autoplay, Pagination]);

const {INITIAL_PRICE, PRICE_FOR_CAR_MAX, PRICE_FOR_CAR_MIN, PRICE_FOR_HOUSE_MAX, PRICE_FOR_HOUSE_MIN, MIN_CAR_PRICE_FOR_LOWER_RATE, STEP_FOR_HOUSE_PRICE, STEP_FOR_CAR_PRICE, MATERNAL_CAPITAL} = Price;

const {MIN_RATE_FOR_HOUSE, MAX_RATE_FOR_HOUSE, RATE_FOR_CAR_DEFAULT, RATE_FOR_CAR_WITH_ALL_INSURANCE, RATE_FOR_CAR_WITH_HIGH_PRICE, RATE_FOR_CAR_WITH_SOME_INSURANCE} = Rate;

const {INITIAL_FEE_IN_PERCENT_FOR_HOUSE, INITIAL_FEE_IN_PERCENT_FOR_CAR, MIN_HOUSE_INITIAL_FEE_IN_PERCENT_FOR_LOWER_RATE} = Fee;

const {YEARS_FOR_HOUSE_MIN, YEARS_FOR_CAR_MIN, YEARS_FOR_HOUSE_MAX, YEARS_FOR_CAR_MAX, MONTHS_IN_YEAR} = Year;

const Main = () => {

  const initialState = {
    activeTab: TabName.DEPOSITS,
    currentOption: ``,
    isFormShowed: false,
    isFormSubmitted: false,
    price: null,
    initialFee: null,
    initialFeeInPercent: null,
    years: null,
    invalidPrice: false,
    invalidYears: false,
    invalidInitialFee: false,
    isMaternalCapital: false,
    initialFormNumber: INITIAL_FORM_NUMBER,
    isComplexInsurance: false,
    isLifeInsurance: false
  };

  const initialLocalStorage = {
    fullName: localStorage.getItem(`full-name`) ? localStorage.getItem(`full-name`) : ``,
    phone: localStorage.getItem(`phone`) ? localStorage.getItem(`phone`) : ``,
    email: localStorage.getItem(`email`) ? localStorage.getItem(`email`) : ``,
  };

  const [storage] = useState(initialLocalStorage);

  const [state, setState] = useState(initialState);

  const calculator = useRef();
  const offices = useRef();
  const form = useRef();
  const successPopup = useRef();
  const initialFeeRange = useRef();
  const yearsRange = useRef();
  const fullName = useRef();
  const userPhone = useRef();
  const email = useRef();

  useEffect(() => {
    if (state.isFormSubmitted) {
      successPopup.current.focus();
    }
  });

  useEffect(() => {
    if (state.isFormShowed) {
      form.current.scrollIntoView(smoothScroll);
    }
  }, [state.isFormShowed]);

  useEffect(() => {
    if (state.currentOption) {
      initialFeeRange.current.value = INITIAL_FEE_IN_PERCENT_FOR_HOUSE;
      yearsRange.current.value = YEARS_FOR_CAR_MIN;
    }
  }, [state.currentOption]);

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
    switch (option.value) {
      case AvailableCredit.HOUSE_CREDIT: {
        setState({
          ...state,
          currentOption: option.value,
          price: INITIAL_PRICE,
          initialFee: INITIAL_PRICE * INITIAL_FEE_IN_PERCENT_FOR_HOUSE / 100,
          initialFeeInPercent: INITIAL_FEE_IN_PERCENT_FOR_HOUSE,
          years: YEARS_FOR_HOUSE_MIN
        });
        break;
      }
      case AvailableCredit.CAR_CREDIT: {
        setState({
          ...state,
          currentOption: option.value,
          price: INITIAL_PRICE,
          initialFee: INITIAL_PRICE * INITIAL_FEE_IN_PERCENT_FOR_CAR / 100,
          initialFeeInPercent: INITIAL_FEE_IN_PERCENT_FOR_CAR,
          years: YEARS_FOR_CAR_MIN
        });
        break;
      }
    }
  };

  const setIsFormShowed = () => {
    setState({
      ...state,
      isFormShowed: true,
      isFormSubmitted: initialState.isFormSubmitted
    });
    if (state.isFormShowed) {
      form.current.scrollIntoView(smoothScroll);
    }
  };

  const closePopupSuccess = () => {
    setState({
      ...state,
      isFormSubmitted: initialState.isFormSubmitted
    });
    document.body.classList.toggle(`popup-opened`);
  };

  const keyDownHandler = (evt) => {
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
    if (!fullName.current.value || !userPhone.current.value || !email.current.value) {
      form.current.classList.remove(`main__form-error`);
      (() => {
        return form.current.offsetWidth;
      })();
      form.current.classList.add(`main__form-error`);
      return;
    }
    form.current.classList.remove(`main__form-error`);
    setState({
      ...state,
      isFormShowed: false,
      isFormSubmitted: true,
      initialFormNumber: state.initialFormNumber + 1,
    });
    document.body.classList.toggle(`popup-opened`);
    localStorage.clear();
  };

  const priceHandler = (_evt, _maskedValue, floatValue) => {
    let minPrice;
    let maxPrice;
    let initialFee;
    switch (state.currentOption) {
      case AvailableCredit.HOUSE_CREDIT: {
        minPrice = PRICE_FOR_HOUSE_MIN;
        maxPrice = PRICE_FOR_HOUSE_MAX;
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_HOUSE;
        break;
      }
      case AvailableCredit.CAR_CREDIT: {
        minPrice = PRICE_FOR_CAR_MIN;
        maxPrice = PRICE_FOR_CAR_MAX;
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_CAR;
        break;
      }
    }
    if (floatValue < minPrice || floatValue > maxPrice) {
      setState({
        ...state,
        invalidPrice: true,
        price: floatValue,
      });
    } else {
      setState({
        ...state,
        invalidPrice: false,
        invalidInitialFee: false,
        price: floatValue,
        initialFee: floatValue * initialFee / 100,
      });
    }
    initialFeeRange.current.value = initialFee;
  };

  const initialFeeHandler = (_evt, _maskedValue, floatValue) => {
    let initialFee;
    switch (state.currentOption) {
      case AvailableCredit.HOUSE_CREDIT: {
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_HOUSE;
        break;
      }
      case AvailableCredit.CAR_CREDIT: {
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_CAR;
        break;
      }
    }
    if (floatValue < (state.price * initialFee / 100)) {
      setState({
        ...state,
        invalidInitialFee: true,
        initialFee: floatValue,
      });
    } else {
      setState({
        ...state,
        invalidInitialFee: false,
        initialFee: floatValue,
      });
    }
  };

  const initialFeeRangeHandler = (evt) => {
    setState({
      ...state,
      invalidInitialFee: false,
      initialFee: state.price * evt.target.value / 100,
    });
  };

  const incrementPrice = () => {
    let step;
    let minPrice;
    let maxPrice;
    let initialFee;
    switch (state.currentOption) {
      case AvailableCredit.HOUSE_CREDIT: {
        step = STEP_FOR_HOUSE_PRICE;
        minPrice = PRICE_FOR_HOUSE_MIN;
        maxPrice = PRICE_FOR_HOUSE_MAX;
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_HOUSE;
        break;
      }
      case AvailableCredit.CAR_CREDIT: {
        step = STEP_FOR_CAR_PRICE;
        minPrice = PRICE_FOR_CAR_MIN;
        maxPrice = PRICE_FOR_CAR_MAX;
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_CAR;
        break;
      }
    }
    if ((state.price + step) <= maxPrice && (state.price + step >= minPrice)) {
      setState({
        ...state,
        invalidPrice: false,
        invalidInitialFee: false,
        price: state.price + step,
        initialFee: (state.price + step) * initialFee / 100,
      });
      initialFeeRange.current.value = initialFee;
    }
  };

  const decrementPrice = () => {
    let step;
    let minPrice;
    let maxPrice;
    let initialFee;
    switch (state.currentOption) {
      case AvailableCredit.HOUSE_CREDIT: {
        step = STEP_FOR_HOUSE_PRICE;
        minPrice = PRICE_FOR_HOUSE_MIN;
        maxPrice = PRICE_FOR_HOUSE_MAX;
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_HOUSE;
        break;
      }
      case AvailableCredit.CAR_CREDIT: {
        step = STEP_FOR_CAR_PRICE;
        minPrice = PRICE_FOR_CAR_MIN;
        maxPrice = PRICE_FOR_CAR_MAX;
        initialFee = INITIAL_FEE_IN_PERCENT_FOR_CAR;
        break;
      }
    }
    if ((state.price - step) >= minPrice && (state.price - step) <= maxPrice) {
      setState({
        ...state,
        invalidPrice: false,
        price: state.price - step,
        initialFee: (state.price - step) * initialFee / 100,
      });
      initialFeeRange.current.value = initialFee;
    }
  };

  const yearsHandler = (_evt, _maskedValue, floatValue) => {
    let minYears;
    let maxYears;
    switch (state.currentOption) {
      case AvailableCredit.HOUSE_CREDIT: {
        minYears = YEARS_FOR_HOUSE_MIN;
        maxYears = YEARS_FOR_HOUSE_MAX;
        break;
      }
      case AvailableCredit.CAR_CREDIT: {
        minYears = YEARS_FOR_CAR_MIN;
        maxYears = YEARS_FOR_CAR_MAX;
        break;
      }
    }
    if (floatValue > maxYears || floatValue < minYears) {
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

  const maternalCapitalHandler = (evt) => {
    setState({
      ...state,
      isMaternalCapital: evt.target.checked
    });
  };

  const complexInsuranceHandler = (evt) => {
    setState({
      ...state,
      isComplexInsurance: evt.target.checked
    });
  };

  const lifeInsuranceHandler = (evt) => {
    setState({
      ...state,
      isLifeInsurance: evt.target.checked
    });
  };

  const countCreditAmount = () => {
    return (state.isMaternalCapital ? state.price - state.initialFee - MATERNAL_CAPITAL : state.price - state.initialFee).toFixed();
  };

  const countPercentRate = () => {
    switch (state.currentOption) {
      case AvailableCredit.HOUSE_CREDIT: {
        return (state.initialFee * 100 / state.price) < MIN_HOUSE_INITIAL_FEE_IN_PERCENT_FOR_LOWER_RATE ? MAX_RATE_FOR_HOUSE : MIN_RATE_FOR_HOUSE;
      }
      case AvailableCredit.CAR_CREDIT: {
        if (state.isLifeInsurance && state.isComplexInsurance) {
          return RATE_FOR_CAR_WITH_ALL_INSURANCE;
        } else if (state.isLifeInsurance || state.isComplexInsurance) {
          return RATE_FOR_CAR_WITH_SOME_INSURANCE;
        } else if (state.price >= MIN_CAR_PRICE_FOR_LOWER_RATE) {
          return RATE_FOR_CAR_WITH_HIGH_PRICE;
        } else {
          return RATE_FOR_CAR_DEFAULT;
        }
      }
    }
    return ``;
  };

  const countAnnuityPayment = () => {
    let monthlyPercentRate = countPercentRate();
    monthlyPercentRate = monthlyPercentRate / 100 / MONTHS_IN_YEAR;
    return (countCreditAmount() * (monthlyPercentRate + (monthlyPercentRate / ((Math.pow(1 + monthlyPercentRate, state.years * MONTHS_IN_YEAR)) - 1)))).toFixed();
  };

  const countRequiredIncome = () => {
    return (countAnnuityPayment() * 100 / MIN_INCOME_IN_PERCENT).toFixed();
  };

  return (
    <main className="main">
      <section className="main__swiper">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{clickable: false}}
          autoplay={{
            "delay": DELAY_FOR_SLIDER,
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
        <h2 className="visually-hidden">Услуги</h2>
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
        <h2 className="visually-hidden">Услуги</h2>
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
            <label htmlFor="select-credit-option"></label>
            <Select
              onChange={setCurrentOption}
              placeholder={PLACEHOLDER}
              options={options}
              styles={customStyles}
              components={{DropdownIndicator: createCustomDropdownIndicator}}
              inputId="select-credit-option"
            />
          </div>
          {state.currentOption && <div className="main__calculator-parameters">
            <h3>Шаг 2. Введите параметры кредита</h3>
            <label htmlFor="price">{`Стоимость ${returnCreditOption(state.currentOption)}`}</label>
            <div className="main__calculator-parameters-price">
              {state.invalidPrice && <p>Некорректное значение</p>}
              <CurrencyInput
                className={state.invalidPrice ? `main__invalid-input` : ``}
                value={state.price}
                onChangeEvent={priceHandler}
                suffix={` ${returnCurrencyText(state.price)}`}
                precision="0"
                thousandSeparator=" "
                name="price"
                id="price"
              />
              <button onClick={decrementPrice} className="main__calculator-price-button main__calculator-price-button--minus"></button>
              <button onClick={incrementPrice} className="main__calculator-price-button main__calculator-price-button--plus"></button>
            </div>
            <p className={state.invalidPrice ? `main__invalid-input-prompt` : ``}>{`От ${returnPriceRange(state.currentOption).min}  до ${returnPriceRange(state.currentOption).max} рублей`}</p>
            <label htmlFor="initial-fee">Первоначальный взнос</label>
            {state.invalidInitialFee && <p className="main__invalid-initial-fee-message">Некорректное значение</p>}
            <CurrencyInput
              className={state.invalidInitialFee ? `main__invalid-input` : ``}
              value={state.initialFee}
              onChangeEvent={initialFeeHandler}
              suffix={` ${returnCurrencyText(state.initialFee)}`}
              precision="0"
              thousandSeparator=" "
              name="initial-fee"
              id="initial-fee"
            />
            <input className="main__range" ref={initialFeeRange} onChange={initialFeeRangeHandler} defaultValue={state.initialFeeInPercent} type="range" min={state.initialFeeInPercent} max="100" name="price-range" id="price-range" step="5"/>
            <p className={state.invalidInitialFee ? `main__invalid-input-prompt` : ``}>{`${state.initialFeeInPercent}%`}</p>
            <label htmlFor="credit-term">Срок кредитования</label>
            {state.invalidYears && <p className="main__invalid-years-message">Некорректное значение</p>}
            <CurrencyInput
              className={state.invalidYears ? `main__invalid-input` : ``}
              value={state.years}
              onChangeEvent={yearsHandler}
              suffix={returnYearsText(state.years)}
              precision="0"
              thousandSeparator=" "
              name="credit-term"
              id="credit-term"
            />
            <input className="main__range main__range--last" ref={yearsRange} defaultValue={state.years} onChange={yearsRangeHandler} type="range" min={returnYearsRange(state.currentOption).min} max={returnYearsRange(state.currentOption).max} name="years-range" id="years-range" step="1"/>
            <div className="main__calculator-years">
              <p className={state.invalidYears ? `main__invalid-input-prompt` : ``}>{`${returnYearsRange(state.currentOption).min} ${returnYearsText(returnYearsRange(state.currentOption).min)}`}</p>
              <p className={state.invalidYears ? `main__invalid-input-prompt` : ``}>{`${returnYearsRange(state.currentOption).max} ${returnYearsText(returnYearsRange(state.currentOption).max)}`}</p>
            </div>
            {state.currentOption === AvailableCredit.HOUSE_CREDIT &&
            <React.Fragment>
              <input onChange={maternalCapitalHandler} type="checkbox" name="maternal-capital" id="maternal-capital" />
              <label className="main__label-checkbox" htmlFor="maternal-capital">Использовать материнский капитал</label>
            </React.Fragment>
            }
            {state.currentOption === AvailableCredit.CAR_CREDIT &&
            <React.Fragment>
              <input onChange={complexInsuranceHandler} type="checkbox" name="complex-insurance" id="complex-insurance" />
              <label className="main__label-checkbox" htmlFor="complex-insurance">Оформить КАСКО в нашем банке</label>
              <input onChange={lifeInsuranceHandler} type="checkbox" name="life-insurance" id="life-insurance" />
              <label className="main__label-checkbox" htmlFor="life-insurance">Оформить Страхование жизни в нашем банке</label>
            </React.Fragment>
            }
          </div>}
        </div>
        {state.invalidPrice === false &&
        state.invalidInitialFee === false &&
        state.invalidYears === false &&
        state.currentOption !== `` &&
        <div className="main__calculator-popup">
          {countCreditAmount() >= returnMinCreditAmount(state.currentOption) && <div className="main__calculator-offer">
            <p className="main__calculator-offer-title">Наше предложение</p>
            <div className="main__calculator-offer-wrapper">
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">{`${returnSeparatedPrice(countCreditAmount())} ${returnCurrencyText(countCreditAmount())}`}</p>
                <p className="main__calculator-offer-description">{`Сумма ${returnCreditTargetForPopup(state.currentOption)}`}</p>
              </div>
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">{`${countPercentRate().toFixed(2)}%`}</p>
                <p className="main__calculator-offer-description">Процентная ставка</p>
              </div>
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">{`${returnSeparatedPrice(countAnnuityPayment())} ${returnCurrencyText(countAnnuityPayment())}`}</p>
                <p className="main__calculator-offer-description">Ежемесячный платеж</p>
              </div>
              <div className="main__calculator-offer-item">
                <p className="main__calculator-offer-title">{`${returnSeparatedPrice(countRequiredIncome())} ${returnCurrencyText(countRequiredIncome())}`}</p>
                <p className="main__calculator-offer-description">Необходимый доход</p>
              </div>
            </div>
            <button onClick={setIsFormShowed} type="button">Оформить заявку</button>
          </div>}
          {countCreditAmount() < returnMinCreditAmount(state.currentOption) && <div className="main__calculator-reject">
            <p className="main__calculator-offer-title">{`Наш банк не выдаёт ${returnCreditName(state.currentOption)}кредиты меньше ${returnMinCreditAmount(state.currentOption)} рублей.`}</p>
            <p className="main__calculator-offer-description">Попробуйте использовать другие параметры для расчёта.</p>
          </div>}
        </div>}
      </section>
      {state.isFormShowed && <section className="main__form">
        <form onSubmit={formSubmitHandler} ref={form} action="https://echo.htmlacademy.ru">
          <h3>Шаг 3. Оформление заявки</h3>
          <ul>
            <li>
              <p>Номер заявки</p>
              <p>{`№ 00${state.initialFormNumber}`}</p>
            </li>
            <li>
              <p>Цель кредита</p>
              <p>{returnCreditTarget(state.currentOption)}</p>
            </li>
            <li>
              <p>{`Стоимость ${returnCreditOption(state.currentOption)}`}</p>
              <p>{`${returnSeparatedPrice(state.price)} ${returnCurrencyText(state.price)}`}</p>
            </li>
            <li>
              <p>Первоначальный взнос</p>
              <p>{`${returnSeparatedPrice(state.initialFee)} ${returnCurrencyText(state.initialFee)}`}</p>
            </li>
            <li>
              <p>Срок кредитования</p>
              <p>{`${state.years} ${returnYearsText(state.years)}`}</p>
            </li>
          </ul>
          <label htmlFor="full-name"></label>
          <input onChange={setLocalStorageItems} defaultValue={storage.fullName} ref={fullName} type="text" name="full-name" id="full-name" placeholder="ФИО" autoFocus={true} />
          <div className="main__form-contacts">
            <label htmlFor="phone"></label>
            <InputMask
              mask="+7(999)-999-9999"
              onChange={setLocalStorageItems}
              defaultValue={storage.phone}
              type="tel"
              name="phone"
              id="phone"
              placeholder="Телефон"
              ref={userPhone}
            />
            <label htmlFor="email"></label>
            <input onChange={setLocalStorageItems} defaultValue={storage.email} ref={email} type="email" name="email" id="email" placeholder="E-mail" />
          </div>
          <button type="submit">Отправить</button>
        </form>
      </section>}
      {state.isFormSubmitted && <div onKeyDown={keyDownHandler} tabIndex={1} ref={successPopup} className="main__popup-success-overlay">
        <div className="main__popup-success">
          <button onClick={closePopupSuccess} type="button"></button>
          <p className="main__calculator-offer-title">Спасибо за обращение в наш банк.</p>
          <p className="main__calculator-offer-description">Наш менеджер скоро свяжется с вами по указанному номеру телефона.</p>
        </div>
      </div>}
      <section ref={offices} className="main__offices">
        <div className="main__offices-map">
          <h2>Отделения Лига Банка</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d577325.3464971667!2d36.82513809290739!3d55.58152447403445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2z0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1623077063555!5m2!1sru!2sru" title="map" style={{border: `0`}} allowFullScreen="" loading="lazy"></iframe>
        </div>
      </section>
    </main>
  );
};

export default Main;
