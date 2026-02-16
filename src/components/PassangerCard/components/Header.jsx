const Header = ({ count, onClickDelete }) => {
  return (
    <div className="passenger__header">
      <div className="passenger__toggle"></div>
      <h3 className="passenger__title">Пассажир {count}</h3>
      <div className="passenger__close" onClick={onClickDelete}></div>
    </div>
  );
};

export default Header;