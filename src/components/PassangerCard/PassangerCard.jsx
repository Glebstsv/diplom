import { useEffect, useState, useId, useRef } from "react";
import Select from "react-select";
import Header from "./components/Header";
import PassangerInput from "./components/PassangerInput";
import "./PassangerCard.css";
import PassangerDocs from "./components/PassangerDocs";
import {
  validateBirthNumber,
  validatePassportNumber,
  validatePassportSeries,
} from "../../utils/validators";
import { useDispatch } from "react-redux";
import { addPassanger } from "../../shop/passangersSlice";

const PassangerCard = ({ show, count, onClose, passengerData }) => {
  const options = [
    { value: "Взрослый", label: "Взрослый" },
    { value: "Детский", label: "Детский" },
  ];
  
  const uniqueId = useId();
  
  const [passanger, setPassanger] = useState({
    id: passengerData?.id || `passenger-${uniqueId}-${count}`,
    age: "Взрослый",
    name: "",
    surname: "",
    father: "",
    gender: "",
    check: false,
    series: "",
    number: "",
    birthNumber: "",
    birthday: "",
  });
  
  const [validationResult, setValidationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  
  const dispatch = useDispatch();
  const prevPassangerRef = useRef(passanger);

  useEffect(() => {
    if (JSON.stringify(prevPassangerRef.current) !== JSON.stringify(passanger)) {
      dispatch(addPassanger(passanger));
      prevPassangerRef.current = passanger;
    }
  }, [passanger, dispatch]);

  const onChangeAge = (e) => {
    setPassanger((prevState) => ({
      ...prevState,
      age: e.value,
    }));
  };

  const onClickGender = (e) => {
    setPassanger((prevState) => ({
      ...prevState,
      gender: e.target.id === "male" ? "male" : "female",
    }));
  };

  const onClickCheckbox = (e) => {
    setPassanger((prevState) => ({
      ...prevState,
      check: e.target.checked,
    }));
  };

  const handleBirthdayChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    
    let formattedValue = '';
    
    if (value.length > 0) {
      formattedValue = value.slice(0, 2);
      
      if (value.length > 2) {
        formattedValue += '/' + value.slice(2, 4);
      }
      
      if (value.length > 4) {
        formattedValue += '/' + value.slice(4, 8);
      }
    }
    
    setPassanger((prevState) => ({
      ...prevState,
      birthday: formattedValue,
    }));
  };

  const onChangeInput = (e) => {
    const { value, id } = e.target;
    let newValue = value;

    if (id === 'series' || id === 'number') {
      newValue = value.replace(/\D/g, '');
    }

    setPassanger((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const validateName = (name) => {
    return name.length >= 2 && /^[А-ЯЁа-яё]+$/.test(name);
  };

  const validateBirthday = (date) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(date)) return false;
    
    const [day, month, year] = date.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const now = new Date();
    
    return birthDate < now && birthDate.getFullYear() > 1900;
  };

  const checkEmptyFields = (passanger) => {
    const requiredFields = ['name', 'surname', 'father', 'gender', 'birthday'];
    return requiredFields.every(field => passanger[field] && passanger[field].trim() !== '');
  };

  const validateFields = () => {
    if (!checkEmptyFields(passanger)) {
      return {
        isValid: false,
        message: "Заполните все обязательные поля"
      };
    }

    if (!validateName(passanger.name) || !validateName(passanger.surname) || !validateName(passanger.father)) {
      return {
        isValid: false,
        message: "ФИО должны содержать только русские буквы"
      };
    }

    if (!validateBirthday(passanger.birthday)) {
      return {
        isValid: false,
        message: "Неверный формат даты рождения (ДД/ММ/ГГГГ)"
      };
    }

    if (passanger.age === "Взрослый") {
      if (!validatePassportSeries(passanger.series)) {
        return {
          isValid: false,
          message: "Серия паспорта должна содержать 4 цифры"
        };
      }
      if (!validatePassportNumber(passanger.number)) {
        return {
          isValid: false,
          message: "Номер паспорта должен содержать 6 цифр"
        };
      }
    } else {
      if (!validateBirthNumber(passanger.birthNumber)) {
        return {
          isValid: false,
          message: "Неверный формат свидетельства о рождении (например, I-АБ 123456)"
        };
      }
    }

    return {
      isValid: true,
      message: "Готово"
    };
  };

  const onClickButton = () => {
    const result = validateFields();
    setValidationResult(result.isValid);
    setErrorMessage(result.message);
  };

  return (
    <div className="passenger">
      <Header count={count} onClickDelete={onClose} />
      {show && (
        <div className="passenger__content">
          <div className="passenger__main">
            <div className="passenger__age-select">
              <Select
                className="passenger__age-control"
                options={options}
                defaultValue={options.find(option => option.value === passanger.age)} 
                isSearchable={false}
                onChange={onChangeAge}
              />
            </div>
            <div className="passenger__names">
              <PassangerInput
                id="surname"
                name="Фамилия"
                onChange={onChangeInput}
                value={passanger.surname}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__input-label"
                inputClassName="passenger__input"
              />
              <PassangerInput
                id="name"
                name="Имя"
                onChange={onChangeInput}
                value={passanger.name}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__input-label"
                inputClassName="passenger__input"
              />
              <PassangerInput
                id="father"
                name="Отчество"
                onChange={onChangeInput}
                value={passanger.father}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__input-label"
                inputClassName="passenger__input passenger__input--last"
              />
            </div>
            <div className="passenger__birth">
              <div className="passenger__gender">
                <p className="passenger__input-label">Пол</p>
                <div className="passenger__gender-select">
                  <button
                    className={`passenger__gender-button passenger__gender-button--left ${
                      passanger.gender === "male" ? "passenger__gender-button--active" : ""
                    }`}
                    id="male"
                    onClick={onClickGender}
                  >
                    м
                  </button>
                  <button
                    className={`passenger__gender-button ${
                      passanger.gender === "female" ? "passenger__gender-button--active" : ""
                    }`}
                    id="female"
                    onClick={onClickGender}
                  >
                    ж
                  </button>
                </div>
              </div>
              <div className="passenger__birth-date">
                <label className="passenger__input-wrapper">
                  <p className="passenger__input-label">Дата рождения</p>
                  <input
                    className="passenger__birth-input"
                    type="text"
                    id="birthday"
                    name="birthday"
                    value={passanger.birthday}
                    placeholder="ДД/ММ/ГГГГ"
                    onChange={handleBirthdayChange}
                    maxLength={10}
                    required
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="passenger__mobility">
            <input
              type="checkbox"
              className="passenger__checkbox"
              id="mobility"
              onChange={onClickCheckbox}
              checked={passanger.check}
            />
            <label htmlFor="mobility" className="passenger__checkbox-text">
              ограниченная подвижность
            </label>
          </div>
          {passanger.age === "Взрослый" && (
            <PassangerDocs 
              type="adult" 
              onChangeInput={onChangeInput}
              series={passanger.series}
              number={passanger.number}
            />
          )}
          {passanger.age === "Детский" && (
            <PassangerDocs 
              type="child" 
              onChangeInput={onChangeInput}
              birthNumber={passanger.birthNumber}
            />
          )}
          
          {validationResult !== null && (
            <div className={`passenger__validation-block ${validationResult ? 'passenger__validation-block--success' : ''}`}>
              <div className="passenger__validation-content">
                <div className={`passenger__error-icon ${validationResult ? 'passenger__error-icon--success' : ''}`}></div>
                <p className="passenger__error-text">{errorMessage}</p>
              </div>
              <button className="passenger__submit" onClick={onClickButton}>
                Следующий пассажир
              </button>
            </div>
          )}
          
          {validationResult === null && (
            <div className="passenger__button-only">
              <button className="passenger__submit passenger__submit--centered" onClick={onClickButton}>
                Следующий пассажир
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PassangerCard;