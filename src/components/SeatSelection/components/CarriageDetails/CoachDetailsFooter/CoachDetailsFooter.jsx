import PropTypes from "prop-types";
import "./CoachDetailsFooter.css";

const CoachDetailsFooter = ({ totalPrice = 0 }) => {
  return (
    <div className="selection-seats-coach-details-footer">
      {totalPrice > 0 && (
        <p className="selection-seats-coach-details-footer__final-price">
          {totalPrice.toLocaleString()}
        </p>
      )}
    </div>
  );
};

CoachDetailsFooter.propTypes = {
  totalPrice: PropTypes.number
};

export default CoachDetailsFooter;