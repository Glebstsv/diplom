import { useState } from 'react';
import { useSelector } from "react-redux";
import { selectSelectedSeat } from "../../../shop/getSeatsSlice";
import { totalSum } from "../../../utils/selectionWagon";

const WidgetDetailsPass = ({ depPass, arrPass }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => { 
    setIsCollapsed(!isCollapsed);
  };

  const safeDepPass = depPass || { adult: 0, child: 0 };
  const safeArrPass = arrPass || { adult: 0, child: 0 };
  
  const adult = (safeDepPass.adult || 0) + (safeArrPass.adult || 0);
  const child = (safeDepPass.child || 0) + (safeArrPass.child || 0);

  const selectedSeat = useSelector(selectSelectedSeat);
  const seatsDep = selectedSeat?.departure || [];
  const seatsArr = selectedSeat?.arrival || [];

  const calculateTotal = () => {
    try {
      return (totalSum(seatsDep) || 0) + (totalSum(seatsArr) || 0);
    } catch (error) {
      console.error('Ошибка подсчета суммы:', error);
      return 0;
    }
  };

  const totalPrice = calculateTotal();

  return (
    <div className="widget__passengers">
      <div className="widget__passenger-header">
        <div className="widget__icon widget__icon--passenger"></div>
        <h4 className="widget__header-title">Пассажиры</h4>
        <div 
          className={`widget__toggle ${isCollapsed ? 'widget__toggle--show' : ''}`}
          onClick={toggleCollapse}
        ></div>
      </div>
      {!isCollapsed && (
        <>
          {adult > 0 && (
            <div className="widget__passenger-info">
              <h4 className="widget__passenger-count">{adult} Взрослых</h4>
              <div className="widget__price">
                <p className="widget__price-value">{totalPrice}</p>
                <div className="widget__currency"></div>
              </div>
            </div>
          )}
          {child > 0 && (
            <div className="widget__passenger-info">
              <h4 className="widget__passenger-count">{child} Ребенок</h4>
              <div className="widget__price">
                <p className="widget__price-value">1920</p>
                <div className="widget__currency"></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WidgetDetailsPass;