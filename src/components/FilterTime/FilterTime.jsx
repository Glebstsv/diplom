import { useState } from "react";
import "./FilterTime.css";
import Time from "./Time";

const FilterTime = ({ route, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`filter-time ${route === 'back' ? 'filter-time--back' : ''}`}>
      <div className="filter-time__header">
        <div className={`filter-time__icon ${route === 'to' ? 'filter-time__icon--to' : 'filter-time__icon--back'}`}></div>
        <h3 className={`filter-time__title ${route === 'back' ? 'filter-time__title--back' : ''}`}>{title}</h3>
        <button 
          className={`filter-time__toggle ${isExpanded ? 'filter-time__toggle--expanded' : 'filter-time__toggle--collapsed'}`} 
          onClick={handleToggle}
        ></button>
      </div>
      <Time name="отбытия" route="leave" isExpanded={isExpanded} />
      <Time name="прибытия" route="arrival" isExpanded={isExpanded} />
    </div>
  );
};

export default FilterTime;