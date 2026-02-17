const PassangerCard = ({
  age,
  surname,
  name,
  father,
  gender,
  date,
  series,
  number,
  birthNumber,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Дата отсутствует';
    
    if (dateString.includes('/')) {
      return dateString;
    }
    
    try {
      return dateString;
    } catch {
      return `Ошибка формата: ${dateString}`;
    }
  };

  return (
    <div className="passenger-card">
      <div className="passenger-card__type">
        <div className="passenger-card__icon"></div>
        <p className="passenger-card__age">{age}</p>
      </div>
      <div className="passenger-card__info">
        <p className="passenger-card__name">
          {surname} {name} {father}
        </p>
        <p className="passenger-card__detail">
          Пол {gender === "female" ? "женский" : "мужской"}
        </p>
        <p className="passenger-card__detail">
          Дата рождения {formatDate(date)}
        </p>
        <p className="passenger-card__detail">
          {age === "Взрослый" && `Паспорт РФ ${series} ${number}`}
          {age === "Детский" && `Свидетельство о рождении ${birthNumber}`}
        </p>
      </div>
    </div>
  );
};

export default PassangerCard;