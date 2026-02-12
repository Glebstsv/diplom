import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FilterRoute.css";
import Select from "react-select";
import { setSortType } from "../../shop/getTrainsSlice";
import { selectTrainsItems, selectFilteredCount } from "../../shop/selectors";

const FilterRoute = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTrainsItems);
  const filteredCount = useSelector(selectFilteredCount);
  const [selectedOption, setSelectedOption] = useState({ value: "date", label: "времени" });
  
  const [activeButton, setActiveButton] = useState(() => {
    try {
      const savedItemsPerPage = localStorage.getItem("itemsPerPage");
      return savedItemsPerPage ? JSON.parse(savedItemsPerPage) : 5;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return 5;
    }
  });

  const options = useMemo(() => [
    { value: "date", label: "времени" },
    { value: "duration", label: "длительности" },
    { value: "price", label: "стоимости" },
  ], []);

  const handleButtonClick = useCallback((id) => {
    setActiveButton(id);
    localStorage.setItem("itemsPerPage", JSON.stringify(id));
    window.dispatchEvent(new Event('storage'));
  }, []);

  const handleSortChange = useCallback((option) => {
    setSelectedOption(option);
    dispatch(setSortType(option.value));
  }, [dispatch]);

  const sortTrains = useCallback((trainsToSort, sortType) => {
    if (!Array.isArray(trainsToSort) || trainsToSort.length === 0) {
      return [];
    }
    
    const sortedTrains = [...trainsToSort];
    
    switch (sortType) {
      case "date":
        return sortedTrains.sort((a, b) => {
          const timeA = a?.departure?.from?.datetime || 0;
          const timeB = b?.departure?.from?.datetime || 0;
          return timeA - timeB;
        });
      
      case "duration":
        return sortedTrains.sort((a, b) => {
          const durationA = a?.departure?.duration || 0;
          const durationB = b?.departure?.duration || 0;
          return durationA - durationB;
        });
      
      case "price":
        return sortedTrains.sort((a, b) => {
          const getMinPrice = (train) => {
            const prices = [];
            if (train?.departure?.price_info) {
              Object.values(train.departure.price_info).forEach(price => {
                if (price && price.price) {
                  prices.push(price.price);
                }
              });
            }
            return prices.length ? Math.min(...prices) : 0;
          };

          const priceA = getMinPrice(a);
          const priceB = getMinPrice(b);
          return priceA - priceB;
        });
      
      default:
        return sortedTrains;
    }
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      const sortedTrains = sortTrains(items, selectedOption.value);
      localStorage.setItem("trains", JSON.stringify(sortedTrains));
      window.dispatchEvent(new Event('storage'));
    }
  }, [items, selectedOption.value, sortTrains]);

  return (
    <div className="filter-route">
      <div className="filter-route__found">
        <p className="filter-route__text">найдено:</p>
        <span className="filter-route__count">{filteredCount}</span>
      </div>
      
      <div className="filter-route__sort">
        <p className="filter-route__text">сортировать по:</p>
        <Select
          className="filter-route__select"
          options={options}
          value={selectedOption}
          isSearchable={false}
          onChange={handleSortChange}
          classNamePrefix="filter-route__select"
          placeholder="времени"
        />
      </div>

      <div className="filter-route__show">
        <p className="filter-route__text">показывать по: </p>
        <div className="filter-route__buttons">
          {[5, 10, 20].map((id) => (
            <button
              key={id}
              className={`filter-route__button ${activeButton === id ? 'filter-route__button--active' : ''}`}
              onClick={() => handleButtonClick(id)}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterRoute;