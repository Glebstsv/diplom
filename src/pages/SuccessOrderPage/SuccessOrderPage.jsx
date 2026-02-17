import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import "./SuccessOrderPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { selectSelectedSeat } from "../../shop/getSeatsSlice";
import { totalSum } from "../../utils/selectionWagon";
import bannerImg from "../../assets/banners/banner3.png";

const SuccessOrderPage = () => {
  const { passanger } = useSelector((state) => state.passangers);
  const seatsDep = useSelector(selectSelectedSeat).departure;
  const seatsArr = useSelector(selectSelectedSeat).arrival;
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/");
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating === rating ? 0 : selectedRating);
  };

  const handleStarHover = (hoveredValue) => {
    setHoveredRating(hoveredValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <>
      <Header />
      <Banner name={"trains"} link={bannerImg} />
      <main className="success">
        <section className="success__section">
          <h2 className="success__title">Благодарим Вас за заказ!</h2>
          <div className="success__content">
            <div className="success__header">
              <p className="success__order-number">№Заказа 285АА</p>
              <div className="success__total">
                <p className="success__total-text">сумма</p>
                <p className="success__total-number">
                  {totalSum(seatsDep) + totalSum(seatsArr)}
                </p>
              </div>
            </div>
            
            <div className="success__info">
              <div className="success__info-item">
                <div className="success__info-image success__info-image--email"></div>
                <p className="success__info-text">
                  билеты будут отправлены<br /> на ваш <strong>e-mail</strong>
                </p>
              </div>
              <div className="success__info-item">
                <div className="success__info-image success__info-image--print"></div>
                <p className="success__info-text">
                  <strong>распечатайте</strong><br /> и сохраняйте билеты до даты поездки
                </p>
              </div>
              <div className="success__info-item">
                <div className="success__info-image success__info-image--ticket"></div>
                <p className="success__info-text">
                  <strong>предъявите</strong> распечатанные билеты при посадке
                </p>
              </div>
            </div>

            <div className="success__status">
              <h3 className="success__status-name">
                {passanger[0].name} {passanger[0].surname}!
              </h3>
              <p className="success__status-text">Ваш заказ успешно оформлен.</p>
              <p className="success__status-text">
                В ближайшее время с вами свяжется наш оператор для подтверждения.
              </p>
              <p className="success__status-text success__status-text--bold">
                Благодарим Вас за оказанное доверие и желаем приятного путешествия!
              </p>
            </div>

            <div className="success__footer">
              <div className="success__rating">
                <p className="success__rating-text">Оцените заказ</p>
                <div className="success__stars" onMouseLeave={handleMouseLeave}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`success__star ${
                        star <= (hoveredRating || rating) ? 'success__star--active' : ''
                      }`}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                    />
                  ))}
                </div>
              </div>
              <button className="success__return-button" onClick={handleClick}>
                Вернуться на главную
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SuccessOrderPage;
