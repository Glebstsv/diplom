import { useDispatch, useSelector } from "react-redux";
import "./PersonalData.css";
import PersonalDataInfo from "./components/PersonalDataInfo";
import { useEffect, useState } from "react";
import { addPaymentMethod } from "../../shop/passangersSlice";

const PersonalData = () => {
  const { passanger } = useSelector((state) => state.passangers);
  const [method, setMethod] = useState("");
  const dispatch = useDispatch();

  const onClick = (e) => {
    setMethod(e.target.id);
  };

  useEffect(() => {
    if (method !== "") {
      dispatch(addPaymentMethod(method));
    }
  }, [method, dispatch]);

  return (
    <div className="personal">
      <div className="personal__header">
        <h3 className="personal__title">Персональные данные</h3>
      </div>
      {passanger.map((el, index) => (
        <PersonalDataInfo el={el} key={`passenger-${index}`} />
      ))}
      <div className="personal__footer">
        <div className="personal__payment-header">
          <h3 className="personal__payment-title">Способ оплаты</h3>
        </div>
        <div className="personal__payment">
          <div className="personal__payment-method">
            <div className="personal__checkbox-wrapper">
              <input
                type="checkbox"
                className="personal__checkbox"
                id="online"
                onClick={onClick}
                checked={method === "online"}
              />
              <label htmlFor="online" className="personal__checkbox-text">
                Онлайн
              </label>
            </div>
            <div className="personal__payment-options">
              <p className="personal__payment-variant personal__payment-variant--card">Банковской картой</p>
              <p className="personal__payment-variant">PayPal</p>
              <p className="personal__payment-variant">Visa QIWI Wallet</p>
            </div>
          </div>
          <div className="personal__payment-method personal__payment-method--cash">
            <div className="personal__checkbox-wrapper">
              <input
                type="checkbox"
                className="personal__checkbox"
                id="cash"
                onClick={onClick}
                checked={method === "cash"}
              />
              <label htmlFor="cash" className="personal__checkbox-text">
                Наличными
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;