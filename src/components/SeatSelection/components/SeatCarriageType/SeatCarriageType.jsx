import CarriageType from "./CarriageType";

const SeatCarriageType = ({ seat, onClick }) => {
  return (
    <div className="seat-carriage-type">
      <h3 className="carriage-type-title">Тип вагона</h3>
      <div className="carriage-types">
        {seat?.first && (
          <CarriageType
            link={"lux"}
            name={"Люкс"}
            onClick={onClick}
            id={"first"}
          />
        )}
        {seat?.second && (
          <CarriageType
            link={"coupe"}
            name={"Купе"}
            onClick={onClick}
            id={"second"}
          />
        )}
        {seat?.third && (
          <CarriageType
            link={"res"}
            name={"Плацкарт"}
            onClick={onClick}
            id={"third"}
          />
        )}
        {seat?.fourth && (
          <CarriageType
            link={"sed"}
            name={"Сидячий"}
            onClick={onClick}
            id={"fourth"}
          />
        )}
      </div>
    </div>
  );
};

export default SeatCarriageType;