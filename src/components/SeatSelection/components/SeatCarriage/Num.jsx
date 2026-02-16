const Num = ({ coach }) => {
  return (
    <div className="carriage-number select-carriage">
      <h2 className="carriage-num">{coach.name.replace(/\D/g, "")}</h2>
      <p className="carriage-num-text">вагон</p>
    </div>
  );
};

export default Num;
