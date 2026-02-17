import "./ValidatePage.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import SearchForm from "../../components/SearchForm/SearchForm";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import WidgetDetails from "../../components/WidgetDetails/WidgetDetails";
import Footer from "../../components/Footer/Footer";
import TrainCard from "../../components/TrainCard/TrainCard";
import ValidatePassangers from "../../components/ValidatePassangers/ValidatePassangers";
import ValidatePayment from "../../components/ValidatePayment/ValidatePayment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banners/banner2.png";

const ValidatePage = () => {
  const { train } = useSelector((state) => state.trainSeat);
  const navigate = useNavigate();
  
  const handleConfirmClick = () => {
    navigate("/success");
  };

  return (
    <div className="validate">
      <Header />
      <Banner name="trains" link={bannerImg}>
        <SearchForm name="trains" />
      </Banner>
      <ProgressBar
        name="trains"
        step1="current-step"
        step2="current-step"
        step3="current-step"
        step4="current-step"
      />
      <main className="validate__main">
        <WidgetDetails />
        <section className="validate__section">
          <div className="validate__forms">
            <div className="validate__form-header">
              <h3 className="validate__title">Поезд</h3>
            </div>
            <TrainCard
              card={train}
              key={train.departure?._id}
              order="order"
            />
            <ValidatePassangers />
            <ValidatePayment />
          </div>
          <div className="validate__confirm">
            <button 
              className="validate__confirm-button"
              onClick={handleConfirmClick}
            >
              Подтвердить
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ValidatePage;
