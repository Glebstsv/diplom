const Seat = ({ seats, type }) => {
  const seat = seats.filter((el) => el.available === true);
  const top = seat.filter((el) => el.index % 2);
  const bottom = seat.filter((el) => el.index % 2 === 0);
  return (
    <div className="carriage-seats">
      <h3 className="seats-subtitle">
        Места: <strong>{seats.length}</strong>
      </h3>
      {type === "fourth" ? (
        ""
      ) : (
        <>
          <p className="seat-text top">
            Верхние <strong>{top.length}</strong>
          </p>
          <p className="seat-text bottom">
            Нижние <strong>{bottom.length}</strong>
          </p>
        </>
      )}
    </div>
  );
};

export default Seat;
