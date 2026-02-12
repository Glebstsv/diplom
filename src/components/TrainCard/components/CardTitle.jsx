import trainIcon from "../../../assets/train-card/train.png";

const CardTitle = ({ depTrain, depFrom, depTo, arrTrain, arrTo }) => {
  if (!depTrain || !depFrom || !depTo) {
    return null;
  }

  return (
    <div className="train__header">
      <img src={trainIcon} className="train__icon" alt="Поезд" />
      <span className="train__name">{depTrain}</span>
      <div className="train__route">
        <span className="train__city">
          {depFrom}
          <div className="train__arrow"></div>
        </span>
        <span className="train__city">
          {depTo}
          {arrTrain && <div className="train__arrow"></div>}
        </span>
        {arrTrain && arrTo && (
          <>
            <span className="train__city">{arrTo}</span>
            <span className="train__city">{arrTrain}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CardTitle;
