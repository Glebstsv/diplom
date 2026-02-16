import { useState } from "react";

const TicketTypeCard = ({ type, placeholder, description, onChange }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div 
      className={`age-inputs ${type} ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <input
        className={`age-input ${type}`}
        type="number"
        placeholder={placeholder}
        data-type={type}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />
      <p className={`input-desc ${type}`}>{description}</p>
    </div>
  );
};

export default TicketTypeCard;