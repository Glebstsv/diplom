const Amount = ({ coach }) => {
  return (
    <div className="carriage-amounts">
      <h3 className="amount-subtitle">Стоимость</h3>
      <div className="amount-text">
        <p className="amount-num top">{coach.top_price}</p>
        <div className="amount-currency"></div>
      </div>
      <div className="amount-text">
        <p className="amount-num bottom">{coach.bottom_price}</p>
        <div className="amount-currency"></div>
      </div>
    </div>
  );
};

export default Amount;
