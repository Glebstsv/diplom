import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SeatAmount from "./components/SeatAmount";
import SeatCarriageType from "./components/SeatCarriageType/SeatCarriageType";
import SeatHeader from "./components/SeatHeader";
import SeatTrainName from "./components/SeatTrainName";
import CarriageDetails from "./components/CarriageDetails/CarriageDetails";
import { getSeat, setSelectedClassType } from "../../shop/getTrainSeatSlice";
import "./SeatSelection.css";

const SeatSelection = ({ train, route, direction }) => {
  const { departure, arrival } = useSelector((state) => state.trainSeat?.seat || { departure: [], arrival: [] });
  const { selectedClassType } = useSelector((state) => state.trainSeat || {});
  const [showCarriageDetails, setShowCarriageDetails] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (train && direction && train[direction] && train[direction]._id) {
      dispatch(getSeat({ id: train[direction]._id, direction }));
    }
  }, [train, direction, dispatch]);

  const handleClassTypeSelect = (classType) => {
    dispatch(setSelectedClassType(classType));
    setShowCarriageDetails(true);
  };

  if (!train || !direction || !train[direction]) {
    return null;
  }

  const currentSeat = direction === "departure" ? departure : arrival;

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
        onSelect={handleClassTypeSelect}
        selectedType={selectedClassType}
      />
      
      {showCarriageDetails && selectedClassType && currentSeat?.length > 0 && (
        <CarriageDetails
          carriages={currentSeat}
          classType={selectedClassType}
          direction={direction}
        />
      )}
    </div>
  );
};

export default SeatSelection;