const CarriageType = ({ name, link, onClick, id }) => {
  return (
    <div className="carriage-type">
      <button 
        className="carriage-type-button" 
        onClick={onClick}
        id={id}
      >
        <div className={`carriage-type-img ${link}`}></div>
        <p className="carriage-type-subtitle">{name}</p>
      </button>
    </div>
  );
};

export default CarriageType;