import "./CalendarForm.css";
import Calendar from "react-calendar";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { choiceDateFrom, choiceDateTo } from "../../shop/choiceSlice";
import { format, addMonths, parse } from "date-fns";
import { ru } from "date-fns/locale";

const CalendarForm = ({ name, direction }) => {
  const dispatch = useDispatch();
  
  const { fromDate, toDate } = useSelector((state) => state?.choice || { 
    fromDate: '', 
    toDate: '' 
  });
  
  const getCurrentDate = () => {
    try {
      if (direction === "from" && fromDate) {
        return parse(fromDate, "yyyy-MM-dd", new Date());
      }
      if (direction === "to" && toDate) {
        return parse(toDate, "yyyy-MM-dd", new Date());
      }
    } catch (e) {
      console.error("Ошибка парсинга даты:", e);
    }
    return new Date();
  };

  const [value, setValue] = useState(getCurrentDate);
  const minDate = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => addMonths(new Date(), 12), []);

  const handleDateChange = (newDate) => {
    if (!newDate) return;
    
    setValue(newDate);
    const formattedDate = format(newDate, "yyyy-MM-dd");
    
    if (direction === "from") {
      dispatch(choiceDateFrom(formattedDate));
    } else {
      dispatch(choiceDateTo(formattedDate));
    }
  };

  return (
    <div className={`calendar-form calendar-form--${name} calendar-form--${direction}`}>
      <Calendar
        className="calendar-form__calendar"
        onChange={handleDateChange}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        locale={ru}
        nextLabel="&#9658;"
        next2Label=""
        prevLabel="&#9668;"
        prev2Label=""
        formatMonthYear={(locale, date) => format(date, 'LLLL', { locale: ru })}
        formatShortWeekday={(locale, date) => format(date, 'EEEEEE', { locale: ru })}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            return isWeekend ? 'calendar-form__calendar--weekend' : '';
          }
          return '';
        }}
      />
    </div>
  );
};

export default CalendarForm;