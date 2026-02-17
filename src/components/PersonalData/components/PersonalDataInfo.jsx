import { useState } from "react";
import PassangerInput from "../../PassangerCard/components/PassangerInput";
import { useDispatch } from "react-redux";
import { addOrderPassanger } from "../../../shop/passangersSlice";

const PersonalDataInfo = ({ el }) => {
  const dispatch = useDispatch();

  const initialData = {
    id: el?.id,
    firstName: el?.name || "",
    lastName: el?.surname || "",
    patronymic: el?.father || "",
    phone: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialData);

  if (el && el.id && el.id !== formData.id) {
    const updated = {
      id: el.id,
      firstName: el.name || "",
      lastName: el.surname || "",
      patronymic: el.father || "",
      phone: "",
      email: "",
    };

    setFormData(updated);
    dispatch(addOrderPassanger(updated));
  }

  const formatPhoneNumber = (value) => {
    let numbers = value.replace(/[^\d+]/g, "");

    if (!numbers.startsWith("+")) {
      numbers = "+7" + numbers.replace(/^7?/, "");
    } else if (!numbers.startsWith("+7")) {
      numbers = "+7" + numbers.slice(1).replace(/^7?/, "");
    }

    numbers = numbers.slice(0, 12);

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)} (${numbers.slice(2)}`;
    if (numbers.length <= 8)
      return `${numbers.slice(0, 2)} (${numbers.slice(2, 5)}) ${numbers.slice(5)}`;
    if (numbers.length <= 10)
      return `${numbers.slice(0, 2)} (${numbers.slice(2, 5)}) ${numbers.slice(
        5,
        8
      )} ${numbers.slice(8)}`;

    return `${numbers.slice(0, 2)} (${numbers.slice(2, 5)}) ${numbers.slice(
      5,
      8
    )} ${numbers.slice(8, 10)} ${numbers.slice(10, 12)}`;
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;

    const formatted = value === "" ? "" : formatPhoneNumber(value);
    const updated = { ...formData, phone: formatted };

    setFormData(updated);
    dispatch(addOrderPassanger(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      handlePhoneChange(e);
      return;
    }

    const updated = { ...formData, [name]: value };
    setFormData(updated);
    dispatch(addOrderPassanger(updated));
  };

  if (!el) return null;

  return (
    <div className="personal__main">
      <div className="personal__info">
        <PassangerInput
          name={"Фамилия"}
          id={"lastName"}
          ph={"Фамилия"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input personal__input--margin-right"}
          value={formData.lastName}
          onChange={handleChange}
        />
        <PassangerInput
          name={"Имя"}
          id={"firstName"}
          ph={"Имя"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input personal__input--margin-right"}
          value={formData.firstName}
          onChange={handleChange}
        />
        <PassangerInput
          name={"Отчество"}
          id={"patronymic"}
          ph={"Отчество"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input"}
          value={formData.patronymic}
          onChange={handleChange}
        />
      </div>

      <div className="personal__phone">
        <PassangerInput
          name={"Контактный телефон"}
          id={"phone"}
          ph={"+7 (___) ___ __ __"}
          type={"text"}
          pClassName={"personal__field"}
          inputClassName={"personal__input--contact"}
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="personal__email">
        <PassangerInput
          name={"Email"}
          id={"email"}
          ph={"inbox@gmail.ru"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input--contact"}
          value={formData.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalDataInfo;
