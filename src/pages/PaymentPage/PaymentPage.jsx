import Banner from "../../components/Banner/Banner";
import SearchForm from "../../components/SearchForm/SearchForm";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Header from "../../components/Header/Header";
import "./PaymentPage.css";
import Footer from "../../components/Footer/Footer";
import WidgetDetails from "../../components/WidgetDetails/WidgetDetails";
import PersonalData from "../../components/PersonalData/PersonalData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banners/banner2.png";
import { useState } from "react";

const PaymentPage = () => {
  const { orderPassanger } = useSelector((state) => state.passangers);
  const { paymentMethod } = useSelector((state) => state.passangers);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validatePassengerData = (passenger) => {
    const isValid = (
      passenger.firstName &&
      passenger.lastName &&
      passenger.patronymic &&
      passenger.phone &&  
      passenger.email
    );
    return isValid;
  };

  const handleBuyClick = () => {
    setError("");
    
    if (!orderPassanger || orderPassanger.length === 0) {
      setError("Добавьте данные пассажиров");
      return;
    }

    if (!paymentMethod) {
      setError("Выберите способ оплаты");
      return;
    }

    const isAllPassengersValid = orderPassanger.every(validatePassengerData);
    if (!isAllPassengersValid) {
      setError("Заполните все обязательные поля данных пассажиров");
      return;
    }

    navigate("/validate");
  };
  
  return (
    <div className="payment">
      <Header />
      <Banner name="trains" link={bannerImg}>
        <SearchForm name="trains" />
      </Banner>
      <ProgressBar
        name="trains"
        step1="current-step"
        step2="current-step"
        step3="current-step"
      />
      <main className="payment__main">
        <WidgetDetails />
        <section className="payment__section">
          <PersonalData />
          <div className="payment__buy">
            {error && <div className="payment__error">{error}</div>}
            <button 
              className={`payment__button ${error ? 'payment__button--error' : ''}`} 
              onClick={handleBuyClick}
            >
              Купить билеты
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
