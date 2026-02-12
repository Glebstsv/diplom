const AvailableSeat = ({ priceDep, priceArr }) => {
  return (
    <div className="train__available">
      <div className="train__available-wrapper">
        <div className="train__available-seat">
          <p className="train__seat-class"></p>
          <p className="train__price-value"></p>
          <span className="train__currency"></span>
        </div>
      </div>
    </div>
  );
};

export default AvailableSeat;
