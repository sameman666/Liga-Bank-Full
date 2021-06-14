import car from '../components/tab/car.jpg';
import carMobile from '../components/tab/car_mobile.jpg';
import carTablet from '../components/tab/car_tablet.jpg';
import lock from '../components/tab/lock.jpg';
import lockMobile from '../components/tab/lock_mobile.jpg';
import lockTablet from '../components/tab/lock_tablet.jpg';
import phone from '../components/tab/phone.jpg';
import phoneMobile from '../components/tab/phone_mobile.jpg';
import phoneTablet from '../components/tab/phone_tablet.jpg';
import piggyBank from '../components/tab/piggybank.jpg';
import piggyBankMobile from '../components/tab/piggybank_mobile.jpg';
import piggyBankTablet from '../components/tab/piggybank_tablet.jpg';

export const INITIAL_PRICE = 2000000;
export const ESCAPE_KEYCODE = 27;
export const INITIAL_FEE_IN_PERCENT_FOR_HOUSE = 10;
export const INITIAL_FEE_IN_PERCENT_FOR_CAR = 20;
export const INITIAL_FORM_NUMBER = 11;
export const YEARS_FOR_HOUSE_MIN = 5;
export const YEARS_FOR_CAR_MIN = 1;
export const YEARS_FOR_HOUSE_MAX = 30;
export const YEARS_FOR_CAR_MAX = 5;
export const PRICE_FOR_HOUSE_MIN = 1200000;
export const PRICE_FOR_HOUSE_MAX = 25000000;
export const PRICE_FOR_CAR_MIN = 500000;
export const PRICE_FOR_CAR_MAX = 5000000;
export const STEP_FOR_HOUSE_PRICE = 100000;
export const STEP_FOR_CAR_PRICE = 50000;
export const MATERNAL_CAPITAL = 470000;
export const MIN_HOUSE_INITIAL_FEE_IN_PERCENT_FOR_LOWER_RATE = 15;
export const MIN_CAR_PRICE_FOR_LOWER_RATE = 2000000;
export const MONTHS_IN_YEAR = 12;
export const MIN_INCOME_IN_PERCENT = 45;
export const MIN_RATE_FOR_HOUSE = 8.50;
export const MAX_RATE_FOR_HOUSE = 9.40;
export const RATE_FOR_CAR_WITH_ALL_INSURANCE = 3.50;
export const RATE_FOR_CAR_WITH_SOME_INSURANCE = 8.50;
export const RATE_FOR_CAR_WITH_HIGH_PRICE = 15;
export const RATE_FOR_CAR_DEFAULT = 16;
export const DELAY_FOR_SLIDER = 4000;
export const PLACEHOLDER = `Выберите цель кредита`;
const PRICE_SEPARATOR = 3;
const CREDIT_FOR_HOUSE_MIN = 500000;
const CREDIT_FOR_CAR_MIN = 200000;

export const AvailableCredit = {
  HOUSE_CREDIT: `Ипотечное кредитование`,
  CAR_CREDIT: `Автомобильное кредитование`
};

export const options = [
  {value: AvailableCredit.HOUSE_CREDIT, label: AvailableCredit.HOUSE_CREDIT},
  {value: AvailableCredit.CAR_CREDIT, label: AvailableCredit.CAR_CREDIT},
];

export const TabName = {
  DEPOSITS: `DEPOSITS`,
  CREDITS: `CREDITS`,
  INSURANCE: `INSURANCE`,
  ONLINE: `ONLINE`
};

export const smoothScroll = {
  behavior: `smooth`,
};


export const mockTabsData = {
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

export const customStyles = {
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

export const returnCreditTarget = (currentOption) => {
  switch (currentOption) {
    case AvailableCredit.HOUSE_CREDIT: {
      return `Ипотека`;
    }
    case AvailableCredit.CAR_CREDIT: {
      return `Автокредит`;
    }
  }
  return ``;
};


export const returnSeparatedPrice = (price) => {
  let separatedPrice;
  if (typeof price === `string`) {
    separatedPrice = price.split(``).reverse();
  } else {
    separatedPrice = price.toFixed().split(``).reverse();
  }
  for (let i = PRICE_SEPARATOR; i < separatedPrice.length; i = i + PRICE_SEPARATOR + 1) {
    separatedPrice.splice(i, 0, ` `);
  }
  return separatedPrice.reverse().join(``);
};

export const setLocalStorageItems = (evt) => {
  switch (evt.target.name) {
    case `full-name`: {
      localStorage.setItem(`full-name`, evt.target.value);
      break;
    }
    case `phone`: {
      localStorage.setItem(`phone`, evt.target.value);
      break;
    }
    case `email`: {
      localStorage.setItem(`email`, evt.target.value);
      break;
    }
  }
};

export const returnCreditOption = (currentOption) => {
  switch (currentOption) {
    case AvailableCredit.HOUSE_CREDIT: {
      return `недвижимости`;
    }
    case AvailableCredit.CAR_CREDIT: {
      return `автомобиля`;
    }
  }
  return ``;
};

export const returnPriceRange = (currentOption) => {
  switch (currentOption) {
    case AvailableCredit.HOUSE_CREDIT: {
      return {
        min: returnSeparatedPrice(PRICE_FOR_HOUSE_MIN),
        max: returnSeparatedPrice(PRICE_FOR_HOUSE_MAX)
      };
    }
    case AvailableCredit.CAR_CREDIT: {
      return {
        min: returnSeparatedPrice(PRICE_FOR_CAR_MIN),
        max: returnSeparatedPrice(PRICE_FOR_CAR_MAX)
      };
    }
  }
  return ``;
};

export const returnMinCreditAmount = (currentOption) => {
  switch (currentOption) {
    case AvailableCredit.HOUSE_CREDIT: {
      return CREDIT_FOR_HOUSE_MIN;
    }
    case AvailableCredit.CAR_CREDIT: {
      return CREDIT_FOR_CAR_MIN;
    }
  }
  return ``;
};

export const returnCreditname = (currentOption) => {
  switch (currentOption) {
    case AvailableCredit.HOUSE_CREDIT: {
      return `ипотечные `;
    }
    case AvailableCredit.CAR_CREDIT: {
      return `авто`;
    }
  }
  return ``;
};

export const returnYearsRange = (currentOption) => {
  switch (currentOption) {
    case AvailableCredit.HOUSE_CREDIT: {
      return {
        min: YEARS_FOR_HOUSE_MIN,
        max: YEARS_FOR_HOUSE_MAX
      };
    }
    case AvailableCredit.CAR_CREDIT: {
      return {
        min: YEARS_FOR_CAR_MIN,
        max: YEARS_FOR_CAR_MAX
      };
    }
  }
  return ``;
};

export const returnYearsText = (years) => {
  years = years % 100;
  if (years >= 5 && years <= 20) {
    return ` лет`;
  } else {
    years = years % 10;
    if (years === 1) {
      return ` год`;
    } else if (years >= 2 && years <= 4) {
      return ` года`;
    } else {
      return ` лет`;
    }
  }
};

export const returnCurrencyText = (amount) => {
  amount = amount % 100;
  if (amount >= 5 && amount <= 20) {
    return ` рублей`;
  } else {
    amount = amount % 10;
    if (amount === 1) {
      return ` рубль`;
    } else if (amount >= 2 && amount <= 4) {
      return ` рубля`;
    } else {
      return ` рублей`;
    }
  }
};

export const returnCreditTargetForPopup = (currentOption) => {
  switch (currentOption) {
    case AvailableCredit.HOUSE_CREDIT: {
      return `ипотеки`;
    }
    case AvailableCredit.CAR_CREDIT: {
      return `автокредита`;
    }
  }
  return ``;
};
