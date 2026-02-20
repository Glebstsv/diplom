import "./Banner.css";

const Banner = ({ name, link, children }) => {
  return (
    <div
      className={`banner banner--${name}`}
      style={name !== "home" ? { backgroundImage: `url(${link})` } : {}}
    >
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
