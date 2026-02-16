import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import SeatSelection from "../../components/SeatSelection/SeatSelection";
import Footer from "../../components/Footer/Footer";
import WidgetFilter from "../../components/WidgetFilter/WidgetFilter";
import { setSeats } from "../../shop/getTrainSeatSlice";
import "./SeatSelectionPage.css";
import bannerImg from "../../assets/banners/banner2.png";

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [seatsLoaded, setSeatsLoaded] = useState(false);
  
  const loadedRef = useRef({
    departure: false,
    arrival: false
  });
  
  const train = JSON.parse(localStorage.getItem("train"));

  useEffect(() => {
    const loadAllSeats = async () => {
      if (!train) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Загружаем места для отправления
      if (!loadedRef.current.departure && train.departure?._id) {
        try {
          const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/${train.departure._id}/seats`);
          const data = await response.json();
          dispatch(setSeats({ data, direction: 'departure' }));
          loadedRef.current.departure = true;
        } catch (err) {
          console.error('Ошибка загрузки для departure:', err);
        }
      }
      
      // Загружаем места для прибытия (если есть)
      if (train.arrival && !loadedRef.current.arrival && train.arrival?._id) {
        try {
          const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/${train.arrival._id}/seats`);
          const data = await response.json();
          dispatch(setSeats({ data, direction: 'arrival' }));
          loadedRef.current.arrival = true;
        } catch (err) {
          console.error('Ошибка загрузки для arrival:', err);
        }
      }
      
      setLoading(false);
      setSeatsLoaded(true);
    };

    loadAllSeats();
  }, [train, dispatch]); // Зависимости остаются

  const handleNextClick = () => {
    navigate("/passangers");
  };

  if (!train) {
    return (
      <>
        <Header />
        <Banner name={"trains"} link={bannerImg}>
          <SearchForm name={"trains"} />
        </Banner>
        <main className="seat-selection">
          <WidgetFilter />
          <section className="seat-selection__content">
            <div className="seat-selection-page__error">
              <h2>Данные о поезде не найдены</h2>
              <p>Вернитесь на страницу выбора поезда и попробуйте снова.</p>
              <button onClick={() => navigate("/trains")}>
                Вернуться к выбору поезда
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const route = train.arrival ? "there-back" : "there";

  return (
    <>
      <Header />
      <Banner name={"trains"} link={bannerImg}>
        <SearchForm name={"trains"} />
      </Banner>
      <ProgressBar name={"trains"} step1={"current-step"} />
      <main className="seat-selection">
        <WidgetFilter />
        <section className="seat-selection__content">
          <h3 className="seat-selection__title">Выбор мест</h3>
          {loading ? (
            <div className="loading">Загрузка мест...</div>
          ) : (
            <>
              <SeatSelection 
                train={train} 
                route={route} 
                direction="departure" 
              />
              {train.arrival && (
                <SeatSelection 
                  train={train} 
                  route={route} 
                  direction="arrival" 
                />
              )}
            </>
          )}
          <button 
            className="seat-selection__button" 
            onClick={handleNextClick}
            disabled={!seatsLoaded}
          >
            Далее
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SeatSelectionPage;