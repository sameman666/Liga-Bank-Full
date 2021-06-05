// import {useState, useRef} from 'react';
import 'swiper/components/pagination/pagination.scss';
import './main.scss';
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

const Main = () => {
  return (
    <main className="main">
      <div className="main__swiper">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{clickable: false}}
          // autoplay={{
          //   "delay": 4000,
          //   "disableOnInteraction": false
          // }}
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
            </div></SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
};

export default Main;
