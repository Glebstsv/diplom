import CarriageNumber from "./CarriageNumber";

const SeatCarriageNumber = ({ seat, direction }) => {
  return (
    <>
      <div className="seat-carriage-numbers">
        <div className="carriage-number">
          <p className="number-text carriage">Вагоны</p>
          {seat.map((el) => (
            <CarriageNumber el={el} key={el.coach._id} direction={direction} />
          ))}
        </div>
        <p className="carriage-numbering-text">
          Нумерация вагонов начинается с головы поезда
        </p>
      </div>
    </>
  );
};

export default SeatCarriageNumber;
