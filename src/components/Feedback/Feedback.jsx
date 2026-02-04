import "./Feedback.css";
import { useState, useCallback, useEffect, useRef } from "react";
import feedback1 from "../../assets/users-feedback/feedback1.png";
import feedback2 from "../../assets/users-feedback/feedback2.png";

const reviews = [
  {
    id: 1,
    image: feedback1,
    name: "Екатерина Вальнова",
    text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые."
  },
  {
    id: 2,
    image: feedback2,
    name: "Евгений Стрыкало",
    text: "СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке."
  }
];

const Feedback = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = 5;

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(currentSlide * sliderRef.current.offsetWidth);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    const newSlide = Math.round((scrollLeft - walk) / sliderRef.current.offsetWidth);
    
    if (newSlide >= 0 && newSlide < totalSlides) {
      setCurrentSlide(newSlide);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      setCurrentSlide(nextSlide);
    }, 6000); // интервал перелистывания

    return () => clearInterval(interval);
  }, [currentSlide, totalSlides]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    slider.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      slider.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const renderSlide = (slideIndex) => (
    <div className="feedback__slide" key={slideIndex}>
      <div className="feedback__item feedback__item--first">
        <img 
          src={reviews[0].image} 
          alt={reviews[0].name} 
          className="review__image"
          loading="lazy"
          draggable="false"
        />
        <div className="review__content">
          <h3 className="review__title">{reviews[0].name}</h3>
          <p className="review__text">{reviews[0].text}</p>
        </div>
          </div>
      <div className="feedback__item feedback__item--last">
        <img 
          src={reviews[1].image} 
          alt={reviews[1].name} 
          className="review__image"
          loading="lazy"
          draggable="false"
        />
        <div className="review__content">
          <h3 className="review__title">{reviews[1].name}</h3>
          <p className="review__text">{reviews[1].text}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="feedback" id="feedback">
      <div className="feedback__container">
        <h2 className="feedback__title">Отзывы</h2>
        <div className="feedback__content">
          <div 
            ref={sliderRef}
            className="feedback__slider" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {[...Array(totalSlides)].map((_, index) => renderSlide(index))}
          </div>
        </div>
        <div className="feedback__pagination">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`feedback__pagination-btn ${currentSlide === index ? 'feedback__pagination-btn--active' : ''}`}
              onClick={() => handleSlideChange(index)}
              disabled={currentSlide === index}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
