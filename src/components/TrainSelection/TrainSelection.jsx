import TrainCard from "../TrainCard/TrainCard";
import { useSelector, useDispatch } from "react-redux";
import "./TrainSelection.css";
import ChangePages from "../../components/ChangePages/ChangePages";
import FilterRoute from "../FilterRoute/FilterRoute";
import { useEffect, useMemo } from "react";
import { setFilteredCount, setTrains } from "../../shop/getTrainsSlice";
import { selectTrainsItems } from "../../shop/selectors";

const TrainSelection = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTrainsItems);
  const filters = useSelector((state) => state.filter || {});
  
  const trains = useMemo(() => items || [], [items]);

  useEffect(() => {
    if (trains.length > 0) {
      localStorage.setItem("trains", JSON.stringify(trains));
    }
  }, [trains]);

  useEffect(() => {
    if (trains.length === 0) {
      const storedTrains = localStorage.getItem("trains");
      if (storedTrains) {
        try {
          const parsedTrains = JSON.parse(storedTrains);
          if (parsedTrains.length > 0) {
            dispatch(setTrains(parsedTrains));
          }
        } catch (error) {
          console.error("Error loading trains from localStorage:", error);
        }
      }
    }
  }, [trains, dispatch]);

  const filteredTrains = useMemo(() => {
    if (!trains.length) return [];

    return trains.filter(train => {
      if (!train?.departure) return false;

      const minPrice = filters.price_from || 0;
      const maxPrice = filters.price_to || Infinity;
      
      const hasValidPrice = (train.departure.have_first_class && train.departure.price_info?.first?.bottom_price >= minPrice && train.departure.price_info.first.bottom_price <= maxPrice) ||
                          (train.departure.have_second_class && train.departure.price_info?.second?.bottom_price >= minPrice && train.departure.price_info.second.bottom_price <= maxPrice) ||
                          (train.departure.have_third_class && train.departure.price_info?.third?.bottom_price >= minPrice && train.departure.price_info.third.bottom_price <= maxPrice) ||
                          (train.departure.have_fourth_class && train.departure.price_info?.fourth?.bottom_price >= minPrice && train.departure.price_info.fourth.bottom_price <= maxPrice);

      const hasValidClass = (!filters.have_first_class || train.departure.have_first_class) &&
                          (!filters.have_second_class || train.departure.have_second_class) &&
                          (!filters.have_third_class || train.departure.have_third_class) &&
                          (!filters.have_fourth_class || train.departure.have_fourth_class);

      const hasValidOptions = (!filters.have_wifi || (train.departure.have_wifi || train.arrival?.have_wifi)) &&
                            (!filters.have_express || (train.departure.is_express || train.arrival?.is_express));

      let hasValidDepartureTime = true;
      let hasValidArrivalTime = true;
      
      if (train.departure.from?.datetime) {
        const departureDateTime = new Date(train.departure.from.datetime * 1000);
        const departureTime = departureDateTime.getHours() + departureDateTime.getMinutes() / 60;
        hasValidDepartureTime = !filters.start_departure_hour_from && !filters.start_departure_hour_to ? true :
                              (departureTime >= Number(filters.start_departure_hour_from || 0) && 
                               departureTime <= Number(filters.start_departure_hour_to || 24));
      }

      if (train.departure.to?.datetime) {
        const arrivalDateTime = new Date(train.departure.to.datetime * 1000);
        const arrivalTime = arrivalDateTime.getHours() + arrivalDateTime.getMinutes() / 60;
        hasValidArrivalTime = !filters.start_arrival_hour_from && !filters.start_arrival_hour_to ? true :
                            (arrivalTime >= Number(filters.start_arrival_hour_from || 0) && 
                             arrivalTime <= Number(filters.start_arrival_hour_to || 24));
      }

      return hasValidPrice && hasValidClass && hasValidOptions && hasValidDepartureTime && hasValidArrivalTime;
    });
  }, [trains, filters]);

  useEffect(() => {
    dispatch(setFilteredCount(filteredTrains.length));
  }, [filteredTrains, dispatch]);

  return (
    <>
      {filteredTrains.length > 0 ? (
        <>
          <FilterRoute />
          <div className="train-cards">
            {filteredTrains.map((el, index) => (
              <TrainCard 
                card={el} 
                key={el.departure?._id || `train-${index}`} 
              />
            ))}
          </div>
          <ChangePages />
        </>
      ) : (
        <p className="train-cards-error">
          Прямых рейсов по маршруту не найдено
        </p>
      )}
    </>
  );
};

export default TrainSelection;