import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAmountPassanger } from "../../../shop/getSeatsSlice";
import { clearPassangers } from "../../../shop/passangersSlice";

const SeatAmount = ({ direction }) => {
  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState(null);

  const onChange = (e) => {
    if (!isNaN(Number(e.target.value)) || e.target.value === '') {
      const { value } = e.target;
      const { type } = e.target.dataset;
      dispatch(addAmountPassanger({ value, type, direction }));
      dispatch(clearPassangers());
    }
  };

  const handleCardClick = (cardType) => {
    setActiveCard(cardType);
  };

  return (
    <div className="seat-amount_ticket">
      <h4 className="ticket-title seat">Количество билетов</h4>
      <div className="ticket-ages">
        <div 
          className={`age-inputs adult ${activeCard === 'adult' ? 'active' : ''}`}
          onClick={() => handleCardClick('adult')}
        >
          <input
            className="age-input adult"
            type="number"
            placeholder="Взрослых - 2"
            data-type="adult"
            onChange={onChange}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="input-desc adult">Можно добавить еще 3 пассажиров</p>
        </div>

        <div 
          className={`age-inputs children ${activeCard === 'child' ? 'active' : ''}`}
          onClick={() => handleCardClick('child')}
        >
          <input
            className="age-input children"
            type="number"
            placeholder="Детских - 1"
            data-type="child"
            onChange={onChange}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="input-desc children">
            Можно добавить еще детей до 10 лет. Свое место в вагоне, как у
            взрослых, но дешевле в среднем на 50-65%
          </p>
        </div>

        <div 
          className={`age-inputs no-place ${activeCard === 'noPlace' ? 'active' : ''}`}
          onClick={() => handleCardClick('noPlace')}
        >
          <input
            className="age-input no-place"
            type="number"
            placeholder='Детских "без места" - 0'
            data-type="noPlace"
            onChange={onChange}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="input-desc no-place">
            Доступно только для взрослого места. Можно добавить еще 2 детей.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeatAmount;