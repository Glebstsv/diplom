import CarriageType from "./CarriageType";
import "./SeatCarriageType.css";

const SeatCarriageType = ({ seat, onSelect, selectedType }) => {
  return (
    <div className="seat-carriage-type">
      <h3 className="carriage-type-title">Тип вагона</h3>
      <div className="carriage-types">
        {seat?.first && (
          <CarriageType
            link="lux"
            name="Люкс"
            onSelect={onSelect}
            id="first"
            isActive={selectedType === 'first'}
          />
        )}
        {seat?.second && (
          <CarriageType
            link="coupe"
            name="Купе"
            onSelect={onSelect}
            id="second"
            isActive={selectedType === 'second'}
          />
        )}
        {seat?.third && (
          <CarriageType
            link="reserved"
            name="Плацкарт"
            onSelect={onSelect}
            id="third"
            isActive={selectedType === 'third'}
          />
        )}
        {seat?.fourth && (
          <CarriageType
            link="seat"
            name="Сидячий"
            onSelect={onSelect}
            id="fourth"
            isActive={selectedType === 'fourth'}
          />
        )}
      </div>
    </div>
  );
};

export default SeatCarriageType;