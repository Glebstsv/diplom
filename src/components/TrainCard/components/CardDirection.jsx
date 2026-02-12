import { msConversion, toHHMMSS } from "../../../utils/timeFormatter";

const CardDirection = ({
  depTime,
  depFrom,
  depFromStation,
  duration,
  arrTime,
  arrTo,
  arrToStation,
  route,
}) => {
  return (
    <div className="train__path">
      <div className="train__path-from">
        <div className="train__time">{toHHMMSS(depTime)}</div>
        <div className="train__path-details">
          <h5 className="train__city">{depFrom}</h5>
          <p className="train__station">{depFromStation} вокзал</p>
        </div>
      </div>
      <div className="train__duration-wrapper">
        <p className="train__duration">{msConversion(duration)}</p>
        <div className={`train__direction-arrow train__direction-arrow--${route}`}></div>
      </div>
      <div className="train__path-to">
        <div className="train__time">{toHHMMSS(arrTime)}</div>
        <div className="train__path-details">
          <h5 className="train__city">{arrTo}</h5>
          <p className="train__station">{arrToStation} вокзал</p>
        </div>
      </div>
    </div>
  );
};

export default CardDirection;
