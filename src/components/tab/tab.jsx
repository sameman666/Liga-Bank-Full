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
      <img src={data.image} alt="Вклады" />
    </div>
  );
};

Tab.propTypes = {
  data: PropTypes.object,
};

export default Tab;
