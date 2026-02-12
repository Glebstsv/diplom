import filterIcon1 from "../../assets/widget/filter-5.png";
import filterIcon2 from "../../assets/widget/filter-7.png";
import filterIcon3 from "../../assets/widget/filter-6.png";

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket">
      <div className="ticket__header">
        <div className="ticket__content">
          <h4 className="ticket__title">{ticket.departure.from.city.name}</h4>
          <p className="ticket__subtitle">
            {ticket.departure.from.railway_station_name} вокзал
          </p>
        </div>
        <div className="ticket__content ticket__content--right">
          <h4 className="ticket__title">{ticket.departure.to.city.name}</h4>
          <p className="ticket__subtitle">
            {ticket.departure.to.railway_station_name} вокзал
          </p>
        </div>
      </div>
      <div className="ticket__body">
        <div className="ticket__features">
          {ticket.departure.have_wifi && (
            <img src={filterIcon1} alt="wifi" className="ticket__feature" />
          )}
          {ticket.departure.have_air_conditioning && (
            <img src={filterIcon2} alt="air" className="ticket__feature" />
          )}
          {ticket.departure.is_express && (
            <img src={filterIcon3} alt="express" className="ticket__feature" />
          )}
        </div>
        <div className="ticket__price">
          <p className="ticket__price-label">от</p>
          <h4 className="ticket__price-value">{ticket.departure.min_price}</h4>
          <div className="ticket__price-currency"></div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;