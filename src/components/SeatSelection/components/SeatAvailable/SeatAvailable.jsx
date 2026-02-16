import Seat from "./Seat";
import { useDispatch } from "react-redux";

const SeatAvailable = ({ carriage, type, direction }) => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    if (!e.target.classList.contains("occupied_seat")) {
      const selectedSeat = {
        type: type,
        num: e.target.dataset.id,
        id: carriage.coach._id,
        price: e.target.dataset.side ? e.target.dataset.side : e.target.dataset.price,
        direction: direction,
      };
      
      dispatch({ 
        type: 'getTrainSeat/addSelectedSeat', 
        payload: { seat: selectedSeat, direction } 
      });
      
      e.target.classList.toggle("seat-wagon_button_selected");
    }
  };

  return (
    <>
      <Seat
        seat={carriage.seats}
        onClick={onClick}
        type={type}
        bottomPrice={carriage.coach.bottom_price}
        topPrice={carriage.coach.top_price}
        sidePrice={carriage.coach.side_price}
      />
    </>
  );
};

export default SeatAvailable;