import { useSelector } from "react-redux";
import "./ValidatePassangers.css";
import PassangersCards from "./components/PassangersCards";
import { useNavigate } from "react-router-dom";
import { selectSelectedSeat } from "../../shop/getSeatsSlice";
import { totalSum } from "../../utils/selectionWagon";

const ValidatePassangers = () => {
  const { passanger } = useSelector((state) => state.passangers);
  const seatsDep = useSelector(selectSelectedSeat).departure;
  const seatsArr = useSelector(selectSelectedSeat).arrival;
  const navigate = useNavigate();
    
  const handleChangeClick = () => {
    navigate("/passangers");
  };

  const hasPassengers = passanger && passanger.length > 0;

  return (
    <div className="validate">
      <div className="validate__header">
        <h3 className="validate__title">Пассажиры</h3>
      </div>
      <div className="validate__content">
        {hasPassengers ? (
          <PassangersCards passangers={passanger} />
        ) : (
          <div className="validate__empty">
            Нет данных о пассажирах
          </div>
        )}
        <div className="validate__summary">
          <div className="validate__total">
            <p className="validate__total-label">Всего</p>
            <p className="validate__total-sum">
              {totalSum(seatsDep) + totalSum(seatsArr)}
            </p>
          </div>
          <div className="validate__actions">
            <button 
              className="validate__change-button" 
              onClick={handleChangeClick}
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatePassangers;