import "./Banner.css";

const Banner = ({ name, link, children }) => {
  return (
    <div className={`banner banner--${name}`}>
      <img src={link} alt="" className="banner__image" />
      <div className="banner__overlay"></div>

      {name === "home" && <div className="banner__footer-line"></div>}

      <div className="banner__content">
        {name === "home" && (
          <h2 className="banner__title">
            Вся жизнь - <strong>путешествие!</strong>
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Banner;
