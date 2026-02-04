import "./Popup.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPopup } from "../../shop/subscribeSlice";

const Popup = () => {
  const dispatch = useDispatch();
  const { open, status, text } = useSelector((state) => state.subscribe);
  const ref = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (open) {
      ref.current = setTimeout(() => dispatch(clearPopup()), 5 * 1000);
    }
    if (ref.current) {
      return clearTimeout(ref.current);
    }
  }, [open, dispatch]);

  const handleClose = () => {
    dispatch(clearPopup());
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <div className="popup__backdrop" onClick={handleBackdropClick}>
      <div className="popup" ref={popupRef}>
        <div
          className={`popup__header ${
            status === "success" ? "popup__header--success" : "popup__header--error"
          }`}
        />
        <p className="popup__message">{text}</p>
        <button 
          className="popup__button" 
          type="button" 
          onClick={handleClose}
          aria-label="Закрыть уведомление"
        >
          Понятно
        </button>
      </div>
    </div>
  );
};

export default Popup;