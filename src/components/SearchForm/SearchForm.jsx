import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchForm.css";
import { clearCity, getCity } from "../../shop/getCitySlice";
import { choiceCityFrom, choiceCityTo, choiceDateFrom, choiceDateTo } from "../../shop/choiceSlice";
import CalendarForm from "../CalendarForm/CalendarForm";
import { getTrains } from "../../shop/getTrainsSlice";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ name }) => {
  const [show, setShow] = useState({ from: false, to: false });
  const [calendar, setCalendar] = useState({ direction: "", open: false });
  const [searchResultsFrom, setSearchResultsFrom] = useState([]);
  const [searchResultsTo, setSearchResultsTo] = useState([]);
  const calendarRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fromDate, toDate, fromCity, toCity } = useSelector((state) => state.choice || {});
  const filters = useSelector((state) => state.filters || {});

  const [city, setCity] = useState(() => ({ 
    from: fromCity?.name || "", 
    to: toCity?.name || "" 
  }));

  const [dates, setDates] = useState(() => ({
    there: fromDate || "",
    back: toDate || ""
  }));

  useEffect(() => {
    const updateDates = () => {
      if (fromDate !== dates.there || toDate !== dates.back) {
        setDates({
          there: fromDate || "",
          back: toDate || ""
        });
      }
    };

    const animationId = requestAnimationFrame(updateDates);
    
    return () => cancelAnimationFrame(animationId);
  }, [fromDate, toDate, dates.there, dates.back]);

  useEffect(() => {
    let timeoutId;
    let isMounted = true;
    
    const executeSearch = async () => {
      if (city.from.trim() === "") {
        requestAnimationFrame(() => {
          if (isMounted) {
            setSearchResultsFrom([]);
          }
        });
      } else {
        try {
          const response = await dispatch(getCity(city.from));
          requestAnimationFrame(() => {
            if (isMounted && response.payload) {
              setSearchResultsFrom(response.payload);
            }
          });
        } catch (error) {
          console.error("Error searching cities:", error);
        }
      }
    };
    
    timeoutId = setTimeout(executeSearch, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [city.from, dispatch]);

  useEffect(() => {
    let timeoutId;
    let isMounted = true;
    
    const executeSearch = async () => {
      if (city.to.trim() === "") {
        requestAnimationFrame(() => {
          if (isMounted) {
            setSearchResultsTo([]);
          }
        });
      } else {
        try {
          const response = await dispatch(getCity(city.to));
          requestAnimationFrame(() => {
            if (isMounted && response.payload) {
              setSearchResultsTo(response.payload);
            }
          });
        } catch (error) {
          console.error("Error searching cities:", error);
        }
      }
    };
    
    timeoutId = setTimeout(executeSearch, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [city.to, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendar.open && calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendar(prev => ({ ...prev, open: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendar.open]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCity((prev) => ({ ...prev, [id]: value }));
    if (value.trim().length > 0) {
      setShow(prev => ({ ...prev, [id]: true }));
    } else {
      setShow(prev => ({ ...prev, [id]: false }));
      requestAnimationFrame(() => {
        if (id === 'from') {
          setSearchResultsFrom([]);
        } else {
          setSearchResultsTo([]);
        }
      });
    }
  };

  const handleInputClick = (e) => {
    const { id } = e.target;
    dispatch(clearCity());
    
    if (city[id].trim().length > 0) {
      setShow(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleCitySelect = (selectedCity, inputId) => {
    if (inputId === "from") {
      dispatch(choiceCityFrom(selectedCity));
      setCity((prev) => ({ ...prev, from: selectedCity.name }));
      requestAnimationFrame(() => setSearchResultsFrom([]));
    }
    if (inputId === "to") {
      dispatch(choiceCityTo(selectedCity));
      setCity((prev) => ({ ...prev, to: selectedCity.name }));
      requestAnimationFrame(() => setSearchResultsTo([]));
    }
    setShow(prev => ({ ...prev, [inputId]: false }));
  };

  const handleCalendarOpen = (e) => {
    const { id } = e.target;
    setCalendar((prev) => ({
      direction: id,
      open: !prev.open || prev.direction !== id
    }));
  };

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setDates(prev => ({ ...prev, [id]: value }));
    
    if (id === 'there') {
      dispatch(choiceDateFrom(value));
    } else if (id === 'back') {
      dispatch(choiceDateTo(value));
    }
  };

  const handleSearchClick = () => {
    if (fromCity && toCity) {
      localStorage.removeItem("trains");
      localStorage.removeItem("itemsPerPage");
      dispatch(getTrains({ 
        choice: { fromCity, toCity, fromDate, toDate }, 
        filters 
      }));
      navigate("/trains");
    }
  };

  const handleSwapCities = () => {
    setCity(prev => ({
      from: prev.to,
      to: prev.from
    }));

    const tempFromCity = fromCity;
    dispatch(choiceCityFrom(toCity));
    dispatch(choiceCityTo(tempFromCity));

    requestAnimationFrame(() => {
      setSearchResultsFrom([]);
      setSearchResultsTo([]);
    });
    setShow({ from: false, to: false }); 
  };

  return (
    <div className={`search-form search-form--${name}`}>
      <div className="search-form__container">
        <div className="search-form__block search-form__block--route">
          <h2 className="search-form__title search-form__title--route">Направление</h2>
          <div className="search-form__input-container search-form__input-container--route">
            <div className="search-form__route-wrapper">
              <input
                value={city.from}
                id="from"
                type="text"
                placeholder="Откуда"
                className="search-form__input search-form__input--route search-form__input--from"
                onChange={handleInputChange}
                onClick={handleInputClick}
              />
              {show.from && searchResultsFrom.length > 0 && (
                <div className="search-form__city-list search-form__city-list--from">
                  <div className="search-form__city-items">
                    {searchResultsFrom.map((el) => (
                      <p key={el._id} onClick={() => handleCitySelect(el, "from")}>
                        {el.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="search-form__route-icon" onClick={handleSwapCities}></div>
            <div className="search-form__route-wrapper">
              <input
                value={city.to}
                id="to"
                type="text"
                placeholder="Куда"
                className="search-form__input search-form__input--route search-form__input--to"
                onChange={handleInputChange}
                onClick={handleInputClick}
              />
              {show.to && searchResultsTo.length > 0 && (
                <div className="search-form__city-list search-form__city-list--to">
                  <div className="search-form__city-items">
                    {searchResultsTo.map((el) => (
                      <p key={el._id} onClick={() => handleCitySelect(el, "to")}>
                        {el.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="search-form__block search-form__block--date">
          <h2 className="search-form__title search-form__title--date">Дата</h2>
          <div className="search-form__input-container search-form__input-container--date">
            <div className="search-form__date-wrapper">
              <input
                type="date"
                id="there"
                placeholder="ДД/ММ/ГГ"
                className="search-form__input search-form__input--date search-form__input--there"
                onClick={handleCalendarOpen}
                value={dates.there}
                onChange={handleDateChange}
              />
              {calendar.open && calendar.direction === 'there' && (
                <div ref={calendarRef} className="search-form__calendar">
                  <CalendarForm
                    name={name}
                    direction="from"
                  />
                </div>
              )}
            </div>
            <div className="search-form__date-wrapper">
              <input
                type="date"
                id="back"
                placeholder="ДД/ММ/ГГ"
                className="search-form__input search-form__input--date search-form__input--back"
                onClick={handleCalendarOpen}
                value={dates.back}
                onChange={handleDateChange}
              />
              {calendar.open && calendar.direction === 'back' && (
                <div ref={calendarRef} className="search-form__calendar">
                  <CalendarForm
                    name={name}
                    direction="to"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="search-form__block search-form__block--controls">
          <div className="search-form__controls">
            <button 
              className="search-form__button"
              onClick={handleSearchClick}
            >
              Найти билеты
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;