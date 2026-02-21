import "./CarriageType.css";

const CarriageType = ({ link, name, onSelect, id, isActive }) => {
  const getImageClass = () => {
    if (isActive) {
      return `carriage-type-img ${link}-active`;
    }
    return `carriage-type-img ${link}`;
  };

  return (
    <div className="carriage-type">
      <button 
        className={`carriage-type-button ${isActive ? 'active' : ''}`}
        onClick={() => onSelect(id)}
        id={id}
      >
        <div className={getImageClass()}></div>
        <p className={`carriage-type-subtitle ${isActive ? 'active' : ''}`}>{name}</p>
      </button>
    </div>
  );
};

export default CarriageType;