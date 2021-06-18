import React from 'react';
import './tab.scss';
import PropTypes from 'prop-types';

const Tab = ({data}) => {
  return (
    <div className="tab">
      <div className="tab__description">
        <p>{data.title}</p>
        <ul>
          {data.features.map((feature, index) => <li key={index}>{feature}</li>)}
        </ul>
        {data.isButton && <button type="button">Узнать подробнее</button>}
        {data.isLink && <p>Рассчитайте ежемесячный платеж и ставку по кредиту воспользовавшись нашим <a href="">кредитным калькулятором</a></p>}
      </div>
      <picture>
        <source srcSet={data.imageMobile} media="(max-width: 767.2px)" />
        <source srcSet={data.imageTablet} media="(max-width: 1023.2px)" />
        <img src={data.image} alt="Вклады" />
      </picture>
    </div>
  );
};

Tab.propTypes = {
  data: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    imageMobile: PropTypes.string,
    imageTablet: PropTypes.string,
    isButton: PropTypes.bool,
    isLink: PropTypes.bool,
    title: PropTypes.string
  }),
};

export default Tab;
