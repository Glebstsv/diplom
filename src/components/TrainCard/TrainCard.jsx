import CardDirection from "../TrainCard/components/CardDirection";
import CardSeat from "../TrainCard/components/CardSeat";
import CardTitle from "../TrainCard/components/CardTitle";
import "./TrainCard.css";
import { useDispatch } from "react-redux";
import { getTrain } from "../../shop/getTrainSeatSlice";
import { useNavigate } from "react-router-dom";

const TrainCard = ({ card, order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(getTrain(card));
    navigate("/seat");
  };

  return (
    <div className="train">
      <CardTitle
        depTrain={card?.departure?.train?.name}
        depFrom={card?.departure?.from?.city?.name}
        depTo={card?.departure?.to?.city?.name}
        arrTrain={card?.arrival?.train?.name}
        arrTo={card?.arrival?.to?.city?.name}
      />
      <div className="train__direction">
        <CardDirection
          depTime={card?.departure?.from?.datetime}
          depFrom={card?.departure?.from?.city?.name}
          depFromStation={card?.departure?.from?.railway_station_name}
          duration={card?.departure?.duration}
          arrTime={card?.departure?.to?.datetime}
          arrTo={card?.departure?.to?.city?.name}
          arrToStation={card?.departure?.to?.railway_station_name}
          route={"to"}
        />
        {card.arrival && (
          <CardDirection
            depTime={card?.arrival?.from?.datetime}
            depFrom={card?.arrival?.from?.city?.name}
            depFromStation={card?.arrival?.from?.railway_station_name}
            duration={card?.arrival?.duration}
            arrTime={card?.arrival?.to?.datetime}
            arrTo={card?.arrival?.to?.city?.name}
            arrToStation={card?.arrival?.to?.railway_station_name}
            route={"back"}
          />
        )}
      </div>
      <CardSeat
        availableSeats={card?.available_seats_info}
        priceDep={card?.departure?.price_info}
        priceArr={card?.arrival?.price_info}
        conditioner={
          card?.arrival?.have_air_conditioning ||
          card?.departure?.have_air_conditioning
        }
        wifi={card?.arrival?.have_wifi || card?.departure?.have_wifi}
        express={card?.arrival?.is_express || card?.departure?.is_express}
        onClick={onClick}
        order={order}
      />
    </div>
  );
};

export default TrainCard;
