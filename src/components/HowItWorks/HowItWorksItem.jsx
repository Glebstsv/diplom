const HowItWorksItem = ({ link, text }) => {
  return (
    <div className="how-it-works__item">
      <img src={link} alt="" className="how-it-works__item-image" />
      <p className="how-it-works__item-text">{text}</p>
    </div>
  );
};

export default HowItWorksItem;