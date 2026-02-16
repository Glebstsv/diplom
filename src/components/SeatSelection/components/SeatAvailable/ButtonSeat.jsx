const ButtonSeat = ({
  item,
  getClassName,
  onClick,
  seat,
  id,
  divClassName,
  buttonClassName,
  bottomPrice,
  topPrice,
  sidePrice,
}) => {
  return (
    <>
      {divClassName ? (
        <div key={id} className={divClassName}>
          <button
            data-id={item[1]}
            data-price={topPrice}
            data-side={sidePrice}
            className={buttonClassName + getClassName(seat, item[1])}
            onClick={(event) => onClick(event)}
          >
            {item[1]}
          </button>
          <button
            data-id={item[0]}
            data-price={bottomPrice}
            data-side={sidePrice}
            className={buttonClassName + getClassName(seat, item[1])}
            onClick={(event) => onClick(event)}
          >
            {item[0]}
          </button>
        </div>
      ) : (
        <button
          data-id={item}
          className={buttonClassName + getClassName(seat, item)}
          onClick={(event) => onClick(event)}
          data-price={topPrice ? topPrice : bottomPrice}
        >
          {item}
        </button>
      )}
    </>
  );
};

export default ButtonSeat;
