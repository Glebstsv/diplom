import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CarriageScheme.css";

const SchemeSeatsItem = ({ isDisabled, isSelected, item, onClick }) => {
  return (
    <button
      className="scheme-seats__item"
      data-selected={isSelected}
      disabled={isDisabled}
      onClick={() => onClick(item)}
    >
      {item}
    </button>
  );
};

SchemeSeatsItem.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  item: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

const FirstSchemeSeats = ({ className, isDisabled, onChange, price, values }) => {
  const placements = Array.from({ length: 8 }, (_, i) => i);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (values) {
      setSelectedSeats(values);
    } else {
      setSelectedSeats([]);
    }
  }, [values]);

  const isSelected = (index) => {
    return selectedSeats.some(seat => seat.index === index);
  };

  const handleClick = (index) => {
    if (isDisabled(index)) return;
    
    let newSeats;
    if (isSelected(index)) {
      newSeats = selectedSeats.filter(seat => seat.index !== index);
    } else {
      newSeats = [...selectedSeats, { index, price }];
    }
    setSelectedSeats(newSeats);
    onChange(newSeats);
  };

  return (
    <div className={`scheme-seats scheme-seats--first ${className || ''}`}>
      <ul className="scheme-seats__side scheme-seats__side--right">
        {placements.map(idx => (
          <li className="scheme-seats__placement" key={idx}>
            <div className="scheme-seats__col">
              <SchemeSeatsItem 
                item={idx * 2 + 1}
                isDisabled={isDisabled(idx * 2 + 1)}
                isSelected={isSelected(idx * 2 + 1)}
                onClick={handleClick}
              />
            </div>
            <div className="scheme-seats__col">
              <SchemeSeatsItem 
                item={idx * 2 + 2}
                isDisabled={isDisabled(idx * 2 + 2)}
                isSelected={isSelected(idx * 2 + 2)}
                onClick={handleClick}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="scheme-seats__side scheme-seats__side--left">
        {placements.map(idx => (
          <li className="scheme-seats__placement" key={idx}>
            <div className="scheme-seats__empty" />
          </li>
        ))}
      </ul>
    </div>
  );
};

FirstSchemeSeats.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  price: PropTypes.number,
  values: PropTypes.array
};

// Схема для Купе (second)
const SecondSchemeSeats = ({ bottomPrice, className, isDisabled, onChange, topPrice, values }) => {
  const placements = Array.from({ length: 8 }, (_, i) => i);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (values) {
      setSelectedSeats(values);
    } else {
      setSelectedSeats([]);
    }
  }, [values]);

  const isSelected = (index) => {
    return selectedSeats.some(seat => seat.index === index);
  };

  const handleClick = (index) => {
    if (isDisabled(index)) return;
    
    let newSeats;
    if (isSelected(index)) {
      newSeats = selectedSeats.filter(seat => seat.index !== index);
    } else {
      const price = index % 2 === 0 ? topPrice : bottomPrice;
      newSeats = [...selectedSeats, { index, price }];
    }
    setSelectedSeats(newSeats);
    onChange(newSeats);
  };

  return (
    <div className={`scheme-seats scheme-seats--second ${className || ''}`}>
      <ul className="scheme-seats__side scheme-seats__side--right">
        {placements.map(idx => (
          <li className="scheme-seats__placement" key={idx}>
            <div className="scheme-seats__col">
              <SchemeSeatsItem 
                item={idx * 4 + 2}
                isDisabled={isDisabled(idx * 4 + 2)}
                isSelected={isSelected(idx * 4 + 2)}
                onClick={handleClick}
              />
              <SchemeSeatsItem 
                item={idx * 4 + 1}
                isDisabled={isDisabled(idx * 4 + 1)}
                isSelected={isSelected(idx * 4 + 1)}
                onClick={handleClick}
              />
            </div>
            <div className="scheme-seats__col">
              <SchemeSeatsItem 
                item={idx * 4 + 4}
                isDisabled={isDisabled(idx * 4 + 4)}
                isSelected={isSelected(idx * 4 + 4)}
                onClick={handleClick}
              />
              <SchemeSeatsItem 
                item={idx * 4 + 3}
                isDisabled={isDisabled(idx * 4 + 3)}
                isSelected={isSelected(idx * 4 + 3)}
                onClick={handleClick}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="scheme-seats__side scheme-seats__side--left">
        {placements.map(idx => (
          <li className="scheme-seats__placement" key={idx}>
            <div className="scheme-seats__empty" />
          </li>
        ))}
      </ul>
    </div>
  );
};

SecondSchemeSeats.propTypes = {
  bottomPrice: PropTypes.number,
  className: PropTypes.string,
  isDisabled: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  topPrice: PropTypes.number,
  values: PropTypes.array
};

const ThirdSchemeSeats = ({ bottomPrice, className, isDisabled, onChange, sidePrice, topPrice, values }) => {
  const placements = Array.from({ length: 8 }, (_, i) => i);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (values) {
      setSelectedSeats(values);
    } else {
      setSelectedSeats([]);
    }
  }, [values]);

  const isSelected = (index) => {
    return selectedSeats.some(seat => seat.index === index);
  };

  const handleClick = (index) => {
    if (isDisabled(index)) return;
    
    let newSeats;
    if (isSelected(index)) {
      newSeats = selectedSeats.filter(seat => seat.index !== index);
    } else {
      let price;
      if (index > 32) {
        price = sidePrice;
      } else {
        price = index % 2 === 0 ? topPrice : bottomPrice;
      }
      newSeats = [...selectedSeats, { index, price }];
    }
    setSelectedSeats(newSeats);
    onChange(newSeats);
  };

  return (
    <div className={`scheme-seats scheme-seats--third ${className || ''}`}>
      <ul className="scheme-seats__side scheme-seats__side--right">
        {placements.map(idx => (
          <li className="scheme-seats__placement" key={idx}>
            <div className="scheme-seats__col">
              <SchemeSeatsItem 
                item={idx * 4 + 2}
                isDisabled={isDisabled(idx * 4 + 2)}
                isSelected={isSelected(idx * 4 + 2)}
                onClick={handleClick}
              />
              <SchemeSeatsItem 
                item={idx * 4 + 1}
                isDisabled={isDisabled(idx * 4 + 1)}
                isSelected={isSelected(idx * 4 + 1)}
                onClick={handleClick}
              />
            </div>
            <div className="scheme-seats__col">
              <SchemeSeatsItem 
                item={idx * 4 + 4}
                isDisabled={isDisabled(idx * 4 + 4)}
                isSelected={isSelected(idx * 4 + 4)}
                onClick={handleClick}
              />
              <SchemeSeatsItem 
                item={idx * 4 + 3}
                isDisabled={isDisabled(idx * 4 + 3)}
                isSelected={isSelected(idx * 4 + 3)}
                onClick={handleClick}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="scheme-seats__side scheme-seats__side--left">
        {placements.map(idx => (
          <li className="scheme-seats__placement" key={idx}>
            <SchemeSeatsItem 
              item={idx * 2 + 33}
              isDisabled={isDisabled(idx * 2 + 33)}
              isSelected={isSelected(idx * 2 + 33)}
              onClick={handleClick}
            />
            <SchemeSeatsItem 
              item={idx * 2 + 34}
              isDisabled={isDisabled(idx * 2 + 34)}
              isSelected={isSelected(idx * 2 + 34)}
              onClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

ThirdSchemeSeats.propTypes = {
  bottomPrice: PropTypes.number,
  className: PropTypes.string,
  isDisabled: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  sidePrice: PropTypes.number,
  topPrice: PropTypes.number,
  values: PropTypes.array
};

// Схема для Сидячего (fourth)
const FourthSchemeSeats = ({ bottomPrice, className, isDisabled, onChange, topPrice, values }) => {
  const placements = Array.from({ length: 16 }, (_, i) => i);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (values) {
      setSelectedSeats(values);
    } else {
      setSelectedSeats([]);
    }
  }, [values]);

  const isSelected = (index) => {
    return selectedSeats.some(seat => seat.index === index);
  };

  const handleClick = (index) => {
    if (isDisabled(index)) return;
    
    let newSeats;
    if (isSelected(index)) {
      newSeats = selectedSeats.filter(seat => seat.index !== index);
    } else {
      const price = index % 2 === 0 ? topPrice : bottomPrice;
      newSeats = [...selectedSeats, { index, price }];
    }
    setSelectedSeats(newSeats);
    onChange(newSeats);
  };

  return (
    <div className={`scheme-seats scheme-seats--fourth ${className || ''}`}>
      <ul className="scheme-seats__side scheme-seats__side--right">
        {placements.map(idx => (
          <li className="scheme-seats__col" key={idx}>
            <SchemeSeatsItem 
              item={idx * 2 + 2}
              isDisabled={isDisabled(idx * 2 + 2)}
              isSelected={isSelected(idx * 2 + 2)}
              onClick={handleClick}
            />
            <SchemeSeatsItem 
              item={idx * 2 + 1}
              isDisabled={isDisabled(idx * 2 + 1)}
              isSelected={isSelected(idx * 2 + 1)}
              onClick={handleClick}
            />
          </li>
        ))}
      </ul>
      <ul className="scheme-seats__side scheme-seats__side--left">
        {placements.map((idx) => {
          const item32 = idx * 2 + 32;
          const item33 = idx * 2 + 33;

          return (
            <li className="scheme-seats__col" key={idx}>
              {item32 >= 33 && item32 <= 62 && (
                <SchemeSeatsItem 
                  item={item32}
                  isDisabled={isDisabled(item32)}
                  isSelected={isSelected(item32)}
                  onClick={handleClick}
                />
              )}
              {item33 >= 33 && item33 <= 62 && (
                <SchemeSeatsItem 
                  item={item33}
                  isDisabled={isDisabled(item33)}
                  isSelected={isSelected(item33)}
                  onClick={handleClick}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

FourthSchemeSeats.propTypes = {
  bottomPrice: PropTypes.number,
  className: PropTypes.string,
  isDisabled: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  topPrice: PropTypes.number,
  values: PropTypes.array
};

const SelectionSeatsCoachDetailsScheme = ({ className, coach, onChange, values }) => {
  const schemeSeatsProps = {
    className: "selection-seats-coach-details-scheme__seats",
    isDisabled: (item) => {
      const seat = coach ? coach.seats.find(seat => seat.index === item) : null;
      return seat ? !seat.available : true;
    },
    onChange,
    values,
  };

  if (!coach) return null;

  return (
    <div className={`selection-seats-coach-details-scheme ${className || ''}`}>
      <p className="selection-seats-coach-details-scheme__number">{coach.coach.name}</p>
      <div className="selection-seats-coach-details-scheme__container">
        {coach.coach.class_type === "first" && (
          <FirstSchemeSeats
            {...schemeSeatsProps}
            price={coach.coach.price}
          />
        )}
        {coach.coach.class_type === "second" && (
          <SecondSchemeSeats
            {...schemeSeatsProps}
            bottomPrice={coach.coach.bottom_price}
            topPrice={coach.coach.top_price}
          />
        )}
        {coach.coach.class_type === "third" && (
          <ThirdSchemeSeats
            {...schemeSeatsProps}
            bottomPrice={coach.coach.bottom_price}
            sidePrice={coach.coach.side_price}
            topPrice={coach.coach.top_price}
          />
        )}
        {coach.coach.class_type === "fourth" && (
          <FourthSchemeSeats
            {...schemeSeatsProps}
            bottomPrice={coach.coach.bottom_price}
            topPrice={coach.coach.top_price}
          />
        )}
      </div>
    </div>
  );
};

SelectionSeatsCoachDetailsScheme.propTypes = {
  className: PropTypes.string,
  coach: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.array,
};

export default SelectionSeatsCoachDetailsScheme;