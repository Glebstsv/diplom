import Seat from "./Seat";
import optionIcon1 from "../../../assets/train-card/option.png";
import optionIcon2 from "../../../assets/train-card/option-2.png";
import optionIcon3 from "../../../assets/train-card/option-3.png";

const CardSeat = ({
  availableSeats,
  priceDep,
  priceArr,
  conditioner,
  wifi,
  express,
  onClick,
  order,
}) => {
  return (
    <div className="train__seats">
      {availableSeats?.first && priceDep?.first && (
        <Seat
          priceDep={priceDep.first}
          priceArr={priceArr?.first}
          name={"Люкс"}
          seat={availableSeats.first}
        />
      )}
      {availableSeats?.second && priceDep?.second && (
        <Seat
          priceDep={priceDep.second}
          priceArr={priceArr?.second}
          name={"Купе"}
          seat={availableSeats.second}
        />
      )}
      {availableSeats?.third && priceDep?.third && (
        <Seat
          priceDep={priceDep.third}
          priceArr={priceArr?.third}
          name={"Плацкарт"}
          seat={availableSeats.third}
        />
      )}
      {availableSeats?.fourth && priceDep?.fourth && (
        <Seat
          priceDep={priceDep.fourth}
          priceArr={priceArr?.fourth}
          name={"Сидячий"}
          seat={availableSeats.fourth}
        />
      )}
      <div className="train__options">
        {conditioner && (
          <img src={optionIcon1} alt="Кондиционер" className="train__option" title="Кондиционер" />
        )}
        {wifi && <img src={optionIcon3} alt="Wi-Fi" className="train__option" title="Wi-Fi" />}
        {express && (
          <img src={optionIcon2} alt="Экспресс" className="train__option" title="Экспресс" />
        )}
      </div>
      <div className="train__button-wrapper">
        {order ? (
          <button className="train__button train__button--order" onClick={onClick}>
            Изменить
          </button>
        ) : (
          <button className="train__button" onClick={onClick}>
            Выбрать места
          </button>
        )}
      </div>
    </div>
  );
};

export default CardSeat;
