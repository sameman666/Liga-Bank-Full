/* eslint-disable no-console */
import {useState} from 'react';
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

const Main = () => {

  const initialState = {
    activeTab: TabName.DEPOSITS,
  };

  const [state, setState] = useState(initialState);

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
                <button type="button">Рассчитать кредит</button>
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
                <button type="button">Найти отделение</button>
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
    </main>
  );
};

export default Main;
