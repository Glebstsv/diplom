import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFilterOptions } from "../../../shop/getFilterSlice";
import Checkbox from "./Checkbox";
import filter1 from "../../../assets/widget/filter-1.png";
import filter2 from "../../../assets/widget/filter-2.png";
import filter3 from "../../../assets/widget/filter-3.png";
import filter4 from "../../../assets/widget/filter-4.png";
import filter5 from "../../../assets/widget/filter-5.png";
import filter6 from "../../../assets/widget/filter-6.png";

const Checkboxes = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_first_class: false,
    have_wifi: false,
    have_express: false,
  });

  useEffect(() => {
    dispatch(addFilterOptions(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (id) => {
    setFilters(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="widget-filter__options">
      <Checkbox
        link={filter1}
        alt={"купе"}
        name={"Купе"}
        id={"have_second_class"}
        onChange={handleFilterChange}
        checked={filters.have_second_class}
      />
      <Checkbox
        link={filter2}
        alt={"плацкарт"}
        name={"Плацкарт"}
        id={"have_third_class"}
        onChange={handleFilterChange}
        checked={filters.have_third_class}
      />
      <Checkbox
        link={filter3}
        alt={"сидячий"}
        name={"Сидячий"}
        id={"have_fourth_class"}
        onChange={handleFilterChange}
        checked={filters.have_fourth_class}
      />
      <Checkbox
        link={filter4}
        alt={"люкс"}
        name={"Люкс"}
        id={"have_first_class"}
        onChange={handleFilterChange}
        checked={filters.have_first_class}
      />
      <Checkbox
        link={filter5}
        alt={"wifi"}
        name={"Wi-Fi"}
        id={"have_wifi"}
        onChange={handleFilterChange}
        checked={filters.have_wifi}
      />
      <Checkbox
        link={filter6}
        alt={"экспресс"}
        name={"Экспресс"}
        id={"have_express"}
        onChange={handleFilterChange}
        checked={filters.have_express}
      />
    </div>
  );
};

export default Checkboxes;
