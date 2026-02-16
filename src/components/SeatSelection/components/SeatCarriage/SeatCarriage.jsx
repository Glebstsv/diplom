import Amount from "./Amount";
import Num from "./Num";
import Seat from "./Seat";
import Services from "./Services";

const SeatCarriage = ({ carriage, type }) => {
  const { coach, seats } = carriage;
  return (
    <div className="seat-carriage-description">
      <Num coach={coach} />
      <Seat seats={seats} type={type} />
      <Amount coach={coach} />
      <Services coach={coach} />
    </div>
  );
};

export default SeatCarriage;
