import { useEffect } from "react";
import "./LastTickets.css";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../../shop/getLastRoutes";
import Ticket from "./Ticket";

const LastTickets = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.lastRoutes || { items: [] });
  
  useEffect(() => {
    dispatch(getRoutes());
  }, [dispatch]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="last-tickets">
      {items.map((el, index) => (
        <Ticket 
          ticket={el} 
          key={el.departure?._id || `last-ticket-${index}`}
        />
      ))}
    </div>
  );
};

export default LastTickets;