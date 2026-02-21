import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSeat } from "../../../../shop/selectors";
import CoachDetailsHeader from "./CoachDetailsHeader/CoachDetailsHeader";
import CoachDetailsBody from "./CoachDetailsBody/CoachDetailsBody";
import CoachDetailsFooter from "./CoachDetailsFooter/CoachDetailsFooter";
import SelectionSeatsCoachDetailsScheme from "./CarriageScheme/CarriageScheme";
import { addSeat, removeSelectedSeat } from "../../../../shop/getSeatsSlice";
import "./CarriageDetails.css";

const CarriageDetails = ({ carriages, classType, direction }) => {
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableCoaches, setAvailableCoaches] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const dispatch = useDispatch();
  const selectedSeatFromStore = useSelector(selectSelectedSeat);

  useEffect(() => {
    if (carriages && Array.isArray(carriages)) {
      const filtered = carriages.filter(item => 
        item.coach?.class_type === classType
      );
      setAvailableCoaches(filtered);
    }
  }, [carriages, classType]);

  useEffect(() => {
    if (availableCoaches.length > 0 && !selectedCoach) {
      setSelectedCoach(availableCoaches[0]);
    }
  }, [availableCoaches, selectedCoach]);

  useEffect(() => {
    if (selectedCoach && selectedSeatFromStore) {
      const directionSeats = selectedSeatFromStore[direction] || [];
      const coachSeats = directionSeats.find(item => item.id === selectedCoach.coach?._id);
      if (coachSeats) {
        const seats = coachSeats.seats.map(s => ({ index: s.seat, price: s.price }));
        setSelectedSeats(seats);
      } else {
        setSelectedSeats([]);
      }
    }
  }, [selectedCoach, selectedSeatFromStore, direction]);

  useEffect(() => {
    const sum = selectedSeats.reduce((acc, seat) => acc + (Number(seat.price) || 0), 0);
    setTotalPrice(sum);
  }, [selectedSeats]);

  const handleCoachSelect = (coach) => {
    setSelectedCoach(coach);
    setSelectedSeats([]);
  };

  const handleSeatSelect = (seats) => {
    const oldSeatIndexes = selectedSeats.map(s => s.index);
    const newSeatIndexes = seats.map(s => s.index);
    
    const seatsToRemove = selectedSeats.filter(s => !newSeatIndexes.includes(s.index));
    seatsToRemove.forEach(seat => {
      dispatch(removeSelectedSeat({
        num: seat.index,
        direction,
        id: selectedCoach?.coach?._id
      }));
    });
    
    const seatsToAdd = seats.filter(s => !oldSeatIndexes.includes(s.index));
    seatsToAdd.forEach(seat => {
      dispatch(addSeat({
        type: classType,
        num: seat.index,
        id: selectedCoach?.coach?._id,
        price: seat.price,
        direction
      }));
    });
    
    setSelectedSeats(seats);
  };

  if (!classType) return null;
  
  if (availableCoaches.length === 0) {
    return (
      <div className="carriage-details">
        <p className="carriage-details__empty">
          Нет доступных вагонов данного типа
        </p>
      </div>
    );
  }

  return (
    <div className="selection-seats-coach-details">
      <CoachDetailsHeader
        coaches={availableCoaches}
        onSelect={handleCoachSelect}
        selectedCoachId={selectedCoach?.coach?._id}
      />
      
      {selectedCoach && (
        <>
          <CoachDetailsBody coach={selectedCoach} />
          <SelectionSeatsCoachDetailsScheme
            coach={selectedCoach}
            onChange={handleSeatSelect}
            values={selectedSeats}
          />
          <CoachDetailsFooter totalPrice={totalPrice} />
        </>
      )}
    </div>
  );
};

export default CarriageDetails;