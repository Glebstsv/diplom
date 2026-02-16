import { useSelector } from "react-redux";
import { selectSelectedSeat } from "../../../shop/getSeatsSlice";
import { totalSum } from "../../../utils/selectionWagon";

const WidgetDetailsTotal = () => {
  const seatsDep = useSelector(selectSelectedSeat).departure;
  const seatsArr = useSelector(selectSelectedSeat).arrival;

  return (
    <div className="widget__total">
      <h4 className="widget__total-title">Итог</h4>
      <div className="widget__total-price">
        <p className="widget__total-value">{totalSum(seatsDep) + totalSum(seatsArr)}</p>
        <div className="widget__total-currency"></div>
      </div>
    </div>
  );
};

export default WidgetDetailsTotal;
