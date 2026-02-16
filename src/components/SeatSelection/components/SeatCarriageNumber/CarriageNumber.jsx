import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedSeat } from "../../../../shop/getTrainSeatSlice";

const CarriageNumber = ({ el, direction }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.trainSeat);

  const onClick = () => {
    setActive(!active);
    dispatch(getSelectedSeat({ el, direction }));
  };

  return (
    <>
      {el.coach.class_type === type && (
        <button className="carriage-button" onClick={onClick}>
          <div className={`number-current ${active}`}>
            {el.coach.name.replace(/\D/g, "")}
          </div>
        </button>
      )}
    </>
  );
};

export default CarriageNumber;
