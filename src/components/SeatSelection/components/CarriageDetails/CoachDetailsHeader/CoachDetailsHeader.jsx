import PropTypes from "prop-types";
import "./CoachDetailsHeader.css";

const CoachDetailsHeader = ({ coaches, onSelect, selectedCoachId }) => {
  return (
    <div className="selection-seats-coach-details-header">
      <p className="selection-seats-coach-details-header__title">Вагоны</p>
      <div className="selection-seats-coach-details-header__list">
        {coaches.map((coach) => (
          <button
            key={coach.coach._id}
            className="selection-seats-coach-details-header__item"
            data-active={selectedCoachId === coach.coach._id}
            onClick={() => onSelect(coach)}
          >
            {coach.coach.name}
          </button>
        ))}
      </div>
      <p className="selection-seats-coach-details-header__description">
        Нумерация вагонов начинается с головы поезда
      </p>
    </div>
  );
};

CoachDetailsHeader.propTypes = {
  coaches: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCoachId: PropTypes.string
};

export default CoachDetailsHeader;