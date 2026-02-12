import FilterTime from "../FilterTime/FilterTime";
import LastTickets from "../LastTickets/LastTickets";
import "./WidgetFilter.css";
import Checkbox from "./components/Checkbox";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { choiceDateFrom, choiceDateTo } from "../../shop/choiceSlice";
import CalendarForm from "../CalendarForm/CalendarForm";
import RangeInput from "../../components/RangeInput/RangeInput";
import widgetFilterIcon1 from "../../assets/widget/filter-1.png";
import widgetFilterIcon2 from "../../assets/widget/filter-2.png";
import widgetFilterIcon3 from "../../assets/widget/filter-3.png";
import widgetFilterIcon4 from "../../assets/widget/filter-4.png";
import widgetFilterIcon5 from "../../assets/widget/filter-5.png";
import widgetFilterIcon6 from "../../assets/widget/filter-6.png";

const WidgetFilter = () => {
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState({ direction: "", open: false });
  const { fromDate, toDate } = useSelector((state) => state.choice);
  const [dates, setDates] = useState({
    from: fromDate || "",
    to: toDate || ""
  });

  useEffect(() => {
    const animationId = requestAnimationFrame(() => {
      setDates({
        from: fromDate || "",
        to: toDate || ""
      });
    });
    return () => cancelAnimationFrame(animationId);
  }, [fromDate, toDate]);

  const handleCalendarClick = (e) => {
    const { id } = e.target;
    setCalendar((prev) => ({ 
      direction: id,
      open: !prev.open || prev.direction !== id 
    }));
  };

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setDates(prev => ({ ...prev, [id]: value }));
    
    if (id === 'from') {
      dispatch(choiceDateFrom(value));
    } else if (id === 'to') {
      dispatch(choiceDateTo(value));
    }
  };

  return (
    <aside className="widget-filter">
      <div className="widget-filter__container">
        <div className="widget-filter__dates">
          <div className="widget-filter__date widget-filter__date--from">
            <h3 className="widget-filter__date-title">Дата поездки</h3>
            <input
              type="date"
              className="widget-filter__date-input"
              id="from"
              placeholder="ДД/ММ/ГГ"
              onClick={handleCalendarClick}
              value={dates.from}
              onChange={handleDateChange}
            />
          </div>
          <div className="widget-filter__date widget-filter__date--to">
            <h3 className="widget-filter__date-title">Дата возвращения</h3>
            <input
              type="date"
              className="widget-filter__date-input"
              id="to"
              placeholder="ДД/ММ/ГГ"
              onClick={handleCalendarClick}
              value={dates.to}
              onChange={handleDateChange}
            />
          </div>
          {calendar.open && (
            <CalendarForm
              name={`main-page train ${calendar.direction}`}
              direction={calendar.direction}
            />
          )}
        </div>
        <div className="widget-filter__options">
          <Checkbox
            link={widgetFilterIcon1}
            alt={"купе"}
            name={"Купе"}
            id={"have_second_class"}
          />
          <Checkbox
            link={widgetFilterIcon2}
            alt={"плацкарт"}
            name={"Плацкарт"}
            id={"have_third_class"}
          />
          <Checkbox
            link={widgetFilterIcon3}
            alt={"сидячий"}
            name={"Сидячий"}
            id={"have_fourth_class"}
          />
          <Checkbox
            link={widgetFilterIcon4}
            alt={"люкс"}
            name={"Люкс"}
            id={"have_first_class"}
          />
          <Checkbox
            link={widgetFilterIcon5}
            alt={"wi-fi"}
            name={"Wi-Fi"}
            id={"have_wifi"}
          />
          <Checkbox
            link={widgetFilterIcon6}
            alt={"экспресс"}
            name={"Экспресс"}
            id={"have_express"}
          />
        </div>
        <div className="widget-filter__price">
          <h3 className="widget-filter__price-title">Cтоимость</h3>
          <div className="widget-filter__price-range">
            <div className="widget-filter__range-labels">
              <p>от</p>
              <p>до</p>
            </div>
            <RangeInput />
          </div>
        </div>
        <FilterTime title={"Туда"} route={"to"} />
        <FilterTime title={"Обратно"} route={"back"} />
      </div>
      <div className="widget-filter__last-tickets">
        <h3 className="widget-filter__last-tickets-title">Последние билеты</h3>
        <div className="widget-filter__tickets-list">
          <LastTickets />
        </div>
      </div>
    </aside>
  );
};

export default WidgetFilter;