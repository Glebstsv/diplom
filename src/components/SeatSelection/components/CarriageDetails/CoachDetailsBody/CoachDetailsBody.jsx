import PropTypes from "prop-types";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import "./CoachDetailsBody.css";

const CoachDetailsBody = ({ coach }) => {
  const [activeServices, setActiveServices] = useState({
    wifi: false,
    linens: false,
    nutrition: false
  });

  if (!coach) return null;

  const { coach: coachInfo } = coach;
  const availableSeats = coach.seats?.filter(s => s.available).length || 0;

  const topSeats = coach.seats?.filter(s => s.index % 2 === 0 && s.available).length || 0;
  const bottomSeats = coach.seats?.filter(s => s.index % 2 === 1 && s.available).length || 0;

  const toggleService = (service) => {
    setActiveServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  return (
    <div className="selection-seats-coach-details-body">
      <div className="selection-seats-coach-details-body__number">
        {coachInfo.name}
      </div>
      
      <div className="selection-seats-coach-details-body__places selection-seats-coach-details-body-places">
        <p className="selection-seats-coach-details-body-places__title">
          Места&nbsp;&nbsp;<span>{availableSeats}</span>
        </p>
        <p className="selection-seats-coach-details-body-places__item">
          Верхние&nbsp;&nbsp;<span>{topSeats}</span>
        </p>
        <p className="selection-seats-coach-details-body-places__item">
          Нижние&nbsp;&nbsp;<span>{bottomSeats}</span>
        </p>
      </div>

      <div className="selection-seats-coach-details-body__price selection-seats-coach-details-body-price">
        <p className="selection-seats-coach-details-body-price__title">Стоимость</p>
        {coachInfo.top_price && (
          <p className="selection-seats-coach-details-body-price__item">
            {coachInfo.top_price}
          </p>
        )}
        {coachInfo.bottom_price && (
          <p className="selection-seats-coach-details-body-price__item">
            {coachInfo.bottom_price}
          </p>
        )}
        {coachInfo.side_price && (
          <p className="selection-seats-coach-details-body-price__item">
            {coachInfo.side_price}
          </p>
        )}
      </div>

      <div className="selection-seats-coach-details-body__services selection-seats-coach-details-body-services">
        <div className="selection-seats-coach-details-body-services__header">
          <p className="selection-seats-coach-details-body-services__title">Обслуживание</p>
          <p className="selection-seats-coach-details-body-services__subtitle">фпк</p>
        </div>
        <div className="additional-options-in-carriages selection-seats-coach-details-body-services__items">
          <ul className="additional-options-in-carriages__list">
            {/* Кондиционер */}
            <li className="additional-options-in-carriages__item">
              <button 
                className={`additional-options-in-carriages__btn ${coachInfo.have_air_conditioning ? 'serve' : 'serve disabled'}`}
                data-tooltip-id="tooltip-air"
                data-tooltip-content="кондиционер"
                disabled={!coachInfo.have_air_conditioning}
              >
                <span className="additional-options-in-carriages__icon serve-icon"></span>
              </button>
            </li>
            
            {/* WiFi */}
            <li className="additional-options-in-carriages__item">
              <button 
                className={`additional-options-in-carriages__btn serve2 ${activeServices.wifi ? 'active' : ''} ${!coachInfo.have_wifi ? 'disabled' : ''}`}
                data-tooltip-id="tooltip-wifi"
                data-tooltip-content={`Wi-Fi, стоимость ${coachInfo.wifi_price || 0} ₽`}
                onClick={() => toggleService('wifi')}
                disabled={!coachInfo.have_wifi}
              >
                <span className="additional-options-in-carriages__icon serve2-icon"></span>
              </button>
            </li>
            
            {/* Белье */}
            <li className="additional-options-in-carriages__item">
              <button 
                className={`additional-options-in-carriages__btn serve3 ${activeServices.linens ? 'active' : ''} ${!coachInfo.is_linens_included ? 'disabled' : ''}`}
                data-tooltip-id="tooltip-linens"
                data-tooltip-content={`белье, стоимость ${coachInfo.linens_price || 0} ₽`}
                onClick={() => toggleService('linens')}
                disabled={!coachInfo.is_linens_included}
              >
                <span className="additional-options-in-carriages__icon serve3-icon"></span>
              </button>
            </li>
            
            {/* Питание */}
            <li className="additional-options-in-carriages__item">
              <button 
                className={`additional-options-in-carriages__btn serve4 ${activeServices.nutrition ? 'active' : ''}`}
                data-tooltip-id="tooltip-nutrition"
                data-tooltip-content="питание"
                onClick={() => toggleService('nutrition')}
              >
                <span className="additional-options-in-carriages__icon serve4-icon"></span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Тултипы */}
      <Tooltip id="tooltip-air" place="bottom" className="additional-options-in-carriages-tooltip" />
      <Tooltip id="tooltip-wifi" place="bottom" className="additional-options-in-carriages-tooltip" />
      <Tooltip id="tooltip-linens" place="bottom" className="additional-options-in-carriages-tooltip" />
      <Tooltip id="tooltip-nutrition" place="bottom" className="additional-options-in-carriages-tooltip" />
    </div>
  );
};

CoachDetailsBody.propTypes = {
  coach: PropTypes.object
};

export default CoachDetailsBody;