import { useEffect } from 'react'; 
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./PassangersPage.css";
import WidgetDetails from "../../components/WidgetDetails/WidgetDetails";
import PassangerCard from "../../components/PassangerCard/PassangerCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banners/banner2.png";
import { addPassanger, removePassanger, setPassangersInitialized } from "../../shop/passangersSlice";

const PassangersPage = () => {
  const passengersInStore = useSelector((state) => state.passangers.passanger);
  const isInitialized = useSelector((state) => state.passangers.isInitialized); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(() => {
        if (passengersInStore.length === 0 && !isInitialized) {
            dispatch(addPassanger({ type: "adult" }));
            dispatch(setPassangersInitialized());
        }
    }, [dispatch, isInitialized, passengersInStore.length]);

  const handleNextClick = () => {
        if (passengersInStore.length > 0) {
            navigate("/payment");
        } else {
            alert("Пожалуйста, добавьте хотя бы одного пассажира.");
        }
  };

    const handleDeletePassenger = (id) => {
        if (passengersInStore.length > 1) {
            dispatch(removePassanger(id));
        } else {
            alert("Нельзя удалить последнего пассажира.");
        }
    };

    const handleAddPassengerClick = () => {
        dispatch(addPassanger({ type: "adult" }));
    };

  return (
    <div className="passengers">
      <Header />
      <Banner name="pass" link={bannerImg}>
        <SearchForm name="trains" />
      </Banner>
      <ProgressBar
        name="trains"
        step1="current-step"
        step2="current-step"
      />
      <main className="passengers__main">
        <WidgetDetails />
        <section className="passengers__section">
          {passengersInStore.map((passenger, index) => (
              <PassangerCard
                  key={passenger.id}
                  count={index + 1}
                  show={true}
                  passengerData={passenger}
                  onClose={() => handleDeletePassenger(passenger.id)} 
              />
          ))}         
          <div className="passengers__add">
            <button className="passengers__add-button" onClick={handleAddPassengerClick}>
              Добавить пассажира
            </button>
          </div>
          
          <div className="passengers__next">
            <button 
            className={`passengers__next-button ${passengersInStore.length ? 'passengers__next-button--active' : ''}`}
            onClick={handleNextClick}
            disabled={!passengersInStore.length}
            >
              Далее
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PassangersPage;