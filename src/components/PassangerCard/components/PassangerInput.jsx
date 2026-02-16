const PassangerInput = ({
  name,
  id,
  onChange,
  ph,
  type,
  labelClassName,
  titleClassName,
  inputClassName,
  value,
  maxLength, 
  pattern 
}) => {
  return (
    <label className={labelClassName}>
      <p className={titleClassName}>{name}</p>
      <input
        className={inputClassName}
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={ph}
        onChange={onChange}
        maxLength={maxLength} 
        pattern={pattern} 
        required
      />
    </label>
  );
};

export default PassangerInput;