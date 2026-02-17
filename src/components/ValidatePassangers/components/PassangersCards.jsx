import PassangerCard from "./PassangerCard";

const PassangersCards = ({ passangers }) => {
  console.log('Данные пассажиров в PassangersCards:', passangers);
  
  return (
    <div className="validate__passengers">
      {passangers.map((el, index) => {
        return (
          <PassangerCard
            key={index}
            age={el.age}
            surname={el.surname}
            name={el.name}
            father={el.father}
            gender={el.gender}
            date={el.birthday}
            series={el.series}
            number={el.number}
            birthNumber={el.birthNumber}
          />
        );
      })}
    </div>
  );
};

export default PassangersCards;
