import { useSelector } from "react-redux";
import "./ValidatePayment.css";
import { useNavigate } from "react-router-dom";

const ValidatePayment = () => {
  const { paymentMethod } = useSelector((state) => state.passangers);
  const navigate = useNavigate();
  
  const handleChangeClick = () => {
    navigate("/payment");
  };

  return (
    <div className="validate">
      <div className="validate__header">
        <h3 className="validate__title">Способ оплаты</h3>
      </div>
      <div className="validate__content">
        <div className="validate__payment-info">
          <p className="validate__payment-method">
            {paymentMethod === "online" ? "Онлайн" : "Наличные"}
          </p>
        </div>
        <div className="validate__actions">
          <button 
            className="validate__change-button"
            onClick={handleChangeClick}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidatePayment;
