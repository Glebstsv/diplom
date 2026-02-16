const Error = ({ text, success }) => {
  return (
    <div className={`passenger__error ${success ? 'passenger__error--success' : ''}`}>
      <div className={`passenger__error-icon ${success ? 'passenger__error-icon--success' : ''}`}></div>
      <p className="passenger__error-text">{text}</p>
    </div>
  );
};

export default Error;