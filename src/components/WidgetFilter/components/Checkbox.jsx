import { useDispatch, useSelector } from "react-redux";
import { setFilterOption } from "../../../shop/getFilterSlice";
import { useState } from "react";

const Checkbox = ({ link, alt, name, id, onChange, checked }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters) || {};
  const [localChecked, setLocalChecked] = useState(false);
  
  const isChecked = checked !== undefined 
    ? checked 
    : filters[id] !== undefined 
      ? filters[id] 
      : localChecked;

  const handleClick = () => {
    if (onChange) {
      onChange(id);
    } else {
      setLocalChecked(!isChecked);
      dispatch(setFilterOption({ id, value: !isChecked }));
    }
  };

  return (
    <div className="widget-filter__checkbox">
      <img src={link} alt={alt} className="widget-filter__checkbox-icon" />
      <h3 className="widget-filter__checkbox-label">{name}</h3>
      <div 
        className={`widget-filter__checkbox-element ${isChecked ? 'widget-filter__checkbox-element--active' : 'widget-filter__checkbox-element--inactive'}`} 
        onClick={handleClick} 
        id={id}
      >
        <input type="checkbox" className="widget-filter__checkbox-input" checked={isChecked} readOnly />
      </div>
    </div>
  );
};

export default Checkbox;
