import AvailableSeat from "./AvailableSeat";

const Seat = ({ priceDep, priceArr, name, seat }) => {
  const getMinPrice = () => {
    const prices = [
      priceDep?.price,
      priceDep?.top_price,
      priceDep?.bottom_price,
      priceDep?.side_price,
      priceArr?.price,
      priceArr?.top_price,
      priceArr?.bottom_price,
      priceArr?.side_price,
    ].filter((item) => typeof item === "number" && item > 0);

    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const minPrice = getMinPrice();

  return (
    <div className="train__seat">
      <p className="train__seat-class">{name}</p>
      <span className="train__seat-count">{seat}</span>
      <div className="train__price">
        <p className="train__price-text">от</p>
        <p className="train__price-value">{formatPrice(minPrice)}</p>
        <div className="train__currency"></div>
      </div>
      <AvailableSeat priceDep={priceDep} priceArr={priceArr} />
    </div>
  );
};

export default Seat;
