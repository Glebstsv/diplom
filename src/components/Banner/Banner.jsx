import "./Banner.css";

const Banner = ({ name, link, children }) => {
  return (
    <div className={`banner banner--${name}`}>
      <img src={link} alt="" className="banner__image" />
      {name === "home" && (
        <h2 className="banner__title">
          Вся жизнь - <strong>путешествие!</strong>
        </h2>
      )}
      {children}
    </div>
  );
};

export default Banner;