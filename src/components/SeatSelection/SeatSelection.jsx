import { useDispatch, useSelector } from "react-redux";
import SeatAmount from "./components/SeatAmount";
import SeatCarriage from "./components/SeatCarriage/SeatCarriage";
import SeatCarriageNumber from "./components/SeatCarriageNumber/SeatCarriageNumber";
import SeatCarriageType from "./components/SeatCarriageType/SeatCarriageType";
import SeatHeader from "./components/SeatHeader";
import SeatTrainName from "./components/SeatTrainName";

import "./SeatSelection.css";
import { getCarriageType, getSeat } from "../../shop/getTrainSeatSlice";
import { useEffect, useState } from "react";
import SeatAvailable from "./components/SeatAvailable/SeatAvailable";

const SeatSelection = ({ train, route, direction }) => {
  const { departure, arrival } = useSelector((state) => state.trainSeat?.seat || { departure: [], arrival: [] });
  const { type } = useSelector((state) => state.trainSeat?.type || []);
  const selectedSeat = useSelector((state) => state.trainSeat?.selectedSeat || { departure: [], arrival: [] });
  
  const [carriageNumber, setCarriageNumber] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (train && direction && train[direction] && train[direction]._id) {
      dispatch(getSeat({ id: train[direction]._id, direction }));
    }
  }, [train, direction, dispatch]);

  const onClick = (e) => {
    const { id } = e.currentTarget;
    if (id) {
      dispatch(getCarriageType(id));
      setCarriageNumber(!carriageNumber);
    }
  };

  if (!train || !direction || !train[direction]) {
    return null;
  }

  const currentSeat = direction === "departure" ? departure : arrival;
  const currentSelectedSeat = direction === "departure" ? selectedSeat.departure : selectedSeat.arrival;

  return (
    <div className={`select-seat ${route}`}>
      <SeatHeader route={route} />
      <SeatTrainName
        route={route}
        number={train[direction].train?.name}
        cityFrom={train[direction].from?.city?.name}
        cityTo={train[direction].to?.city?.name}
        stationFrom={train[direction].from?.railway_station_name}
        stationTo={train[direction].to?.railway_station_name}
        depFrom={train[direction].from?.datetime}
        depTo={train[direction].to?.datetime}
        duration={train[direction].duration}
      />
      <SeatAmount direction={direction} />
      <SeatCarriageType
        seat={train[direction].available_seats_info || {}}
        onClick={onClick}
      />
      {carriageNumber && currentSeat?.length > 0 && (
        <SeatCarriageNumber
          seat={currentSeat}
          direction={direction}
        />
      )}
      {currentSelectedSeat?.coach && (
        <SeatCarriage carriage={currentSelectedSeat} type={type} />
      )}
      {currentSelectedSeat?.coach && (
        <SeatAvailable
          carriage={currentSelectedSeat}
          type={type}
          direction={direction}
        />
      )}
    </div>
  );
};

export default SeatSelection;