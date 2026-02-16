import { useNavigate } from "react-router-dom";

const SeatHeader = ({ route }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/trains");
  };
  return (
    <div className={`seat-header ${route}`}>
      <div className={`seat-header-direction ${route}`}></div>
      <button className="seat-header-button" onClick={onClick}>
        Выбрать другой поезд
      </button>
    </div>
  );
};

export default SeatHeader;
