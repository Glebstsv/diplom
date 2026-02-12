import RangeTimeInput from "../../components/RangeTimeInput/RangeTimeInput";

const Time = ({ name, route, isExpanded }) => {
  const getTimeType = () => {
    if (route === 'leave') {
      return name === 'отбытия' ? 'start_departure_hour' : 'start_arrival_hour';
    } else {
      return name === 'отбытия' ? 'end_departure_hour' : 'end_arrival_hour';
    }
  };

  const bodyClassName = `filter-time__body ${
    route === 'arrival' ? 'filter-time__body--arrival' : ''
  } ${!isExpanded ? 'filter-time__body--hidden' : ''}`;

  return (
    <div className={bodyClassName}>
      <h4 className={`filter-time__subtitle ${
        route === 'arrival' ? 'filter-time__subtitle--arrival' : ''
      }`}>
        Время {name}
      </h4>
      <div className="filter-time__range">
        <div className="filter-time__range-input">
          <RangeTimeInput type={getTimeType()} />
        </div>
      </div>
    </div>
  );
};

export default Time;