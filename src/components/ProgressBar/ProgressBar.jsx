import "./ProgressBar.css";

const ProgressBar = ({ step1, step2, step3, step4 }) => {
  return (
    <div className={`progress progress--trains ${step4 ? 'progress--current' : ''}`}>
      <div className="progress__edge"></div>
      
      <div className={`progress__step ${step1 ? 'progress--current' : ''}`}>
        <div className="progress__number">
          <p className="progress__digit">1</p>
        </div>
        <div className="progress__text">Билеты</div>
        <div className="progress__arrow">
          <div className={`progress__arrow-part progress__arrow-part--top ${step1 ? 'progress--current' : ''}`}></div>
          <div className={`progress__arrow-part progress__arrow-part--bottom ${step1 ? 'progress--current' : ''}`}></div>
        </div>
      </div>

      <div className={`progress__step progress__step--with-margin ${step2 ? 'progress--current' : ''}`}>
        <div className={`progress__arrow-out ${step2 ? 'progress--current' : ''}`}></div>
        <div className={`progress__number ${step2 ? 'progress--current' : ''}`}>
          <p className="progress__digit">2</p>
        </div>
        <div className="progress__text">Пассажиры</div>
        <div className="progress__arrow">
          <div className={`progress__arrow-part progress__arrow-part--top ${step2 ? 'progress--current' : ''}`}></div>
          <div className={`progress__arrow-part progress__arrow-part--bottom ${step2 ? 'progress--current' : ''}`}></div>
        </div>
      </div>

      <div className={`progress__step progress__step--with-margin ${step3 ? 'progress--current' : ''}`}>
        <div className={`progress__arrow-out ${step3 ? 'progress--current' : ''}`}></div>
        <div className={`progress__number ${step3 ? 'progress--current' : ''}`}>
          <p className="progress__digit">3</p>
        </div>
        <div className="progress__text">Оплата</div>
        <div className="progress__arrow">
          <div className={`progress__arrow-part progress__arrow-part--top ${step3 ? 'progress--current' : ''}`}></div>
          <div className={`progress__arrow-part progress__arrow-part--bottom ${step3 ? 'progress--current' : ''}`}></div>
        </div>
      </div>

      <div className={`progress__step progress__step--with-margin ${step4 ? 'progress--current' : ''}`}>
        <div className={`progress__arrow-out ${step4 ? 'progress--current' : ''}`}></div>
        <div className={`progress__number ${step4 ? 'progress--current' : ''}`}>
          <p className="progress__digit">4</p>
        </div>
        <div className="progress__text">Проверка</div>
      </div>

      <div className="progress__edge"></div>
    </div>
  );
};

export default ProgressBar;