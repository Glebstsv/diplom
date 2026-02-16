import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../../shop/getFilterSlice";
import "./RangeInput.css";

const RangeInput = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter || {});
  const trains = useSelector((state) => state.trains?.items || []);

  const getMinMaxPrices = () => {
    if (!trains.length) return { min: 0, max: 10000 };

    let minPrice = Infinity;
    let maxPrice = 0;

    trains.forEach(train => {
      if (train?.departure) {
        const priceInfo = train.departure.price_info || {};
        
        if (train.departure.have_first_class && priceInfo.first?.bottom_price) {
          minPrice = Math.min(minPrice, priceInfo.first.bottom_price);
          maxPrice = Math.max(maxPrice, priceInfo.first.bottom_price);
        }
        if (train.departure.have_second_class && priceInfo.second?.bottom_price) {
          minPrice = Math.min(minPrice, priceInfo.second.bottom_price);
          maxPrice = Math.max(maxPrice, priceInfo.second.bottom_price);
        }
        if (train.departure.have_third_class && priceInfo.third?.bottom_price) {
          minPrice = Math.min(minPrice, priceInfo.third.bottom_price);
          maxPrice = Math.max(maxPrice, priceInfo.third.bottom_price);
        }
        if (train.departure.have_fourth_class && priceInfo.fourth?.bottom_price) {
          minPrice = Math.min(minPrice, priceInfo.fourth.bottom_price);
          maxPrice = Math.max(maxPrice, priceInfo.fourth.bottom_price);
        }
      }
    });

    if (minPrice === Infinity) minPrice = 0;
    if (maxPrice === 0) maxPrice = 10000;

    minPrice = Math.floor(minPrice / 100) * 100;
    maxPrice = Math.ceil(maxPrice / 100) * 100;

    return { min: minPrice, max: maxPrice };
  };

  const { min, max } = getMinMaxPrices();
  
  const [localValues, setLocalValues] = useState(() => ({ 
    min: filters?.price_from ?? min, 
    max: filters?.price_to ?? max 
  }));

  const prevFiltersRef = useRef({ price_from: filters?.price_from, price_to: filters?.price_to });

  useEffect(() => {
    if (
      filters?.price_from !== undefined && 
      filters?.price_to !== undefined &&
      (prevFiltersRef.current.price_from !== filters.price_from || 
       prevFiltersRef.current.price_to !== filters.price_to)
    ) {
      const animationId = requestAnimationFrame(() => {
        setLocalValues({
          min: filters.price_from,
          max: filters.price_to
        });
      });
      
      prevFiltersRef.current = {
        price_from: filters.price_from,
        price_to: filters.price_to
      };
      
      return () => cancelAnimationFrame(animationId);
    }
  }, [filters?.price_from, filters?.price_to]);

  const rangeRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const trackRef = useRef(null);

  const updateTrack = useCallback(() => {
    if (!rangeRef.current || !minThumbRef.current || !maxThumbRef.current || !trackRef.current) return;
    
    const minPercent = Math.max(0, Math.min(100, ((localValues.min - min) / (max - min)) * 100));
    const maxPercent = Math.max(0, Math.min(100, ((localValues.max - min) / (max - min)) * 100));
    
    trackRef.current.style.left = `${minPercent}%`;
    trackRef.current.style.width = `${maxPercent - minPercent}%`;
    
    minThumbRef.current.style.left = `${minPercent}%`;
    maxThumbRef.current.style.left = `${maxPercent}%`;
  }, [localValues.min, localValues.max, min, max]);

  const isDragging = useRef(false);
  const dragTimeout = useRef(null);

  const handleMinDrag = useCallback((e) => {
    if (!rangeRef.current) return;
    
    const rect = rangeRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newMin = Math.round(min + (percent / 100) * (max - min));
    
    if (newMin < localValues.max) {
      setLocalValues(prev => ({ ...prev, min: newMin }));
      
      if (dragTimeout.current) clearTimeout(dragTimeout.current);
      dragTimeout.current = setTimeout(() => {
        dispatch(setPriceRange({ from: newMin, to: localValues.max }));
      }, 100);
    }
  }, [min, max, localValues.max, dispatch]);

  const handleMaxDrag = useCallback((e) => {
    if (!rangeRef.current) return;
    
    const rect = rangeRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newMax = Math.round(min + (percent / 100) * (max - min));
    
    if (newMax > localValues.min) {
      setLocalValues(prev => ({ ...prev, max: newMax }));
      
      if (dragTimeout.current) clearTimeout(dragTimeout.current);
      dragTimeout.current = setTimeout(() => {
        dispatch(setPriceRange({ from: localValues.min, to: newMax }));
      }, 100);
    }
  }, [min, max, localValues.min, dispatch]);

  const handleMinMouseDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        handleMinDrag(e);
      }
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (dragTimeout.current) clearTimeout(dragTimeout.current);
      dispatch(setPriceRange({ from: localValues.min, to: localValues.max }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMinDrag, dispatch, localValues.min, localValues.max]);

  const handleMaxMouseDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        handleMaxDrag(e);
      }
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (dragTimeout.current) clearTimeout(dragTimeout.current);
      dispatch(setPriceRange({ from: localValues.min, to: localValues.max }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMaxDrag, dispatch, localValues.min, localValues.max]);

  useEffect(() => {
    const minThumb = minThumbRef.current;
    const maxThumb = maxThumbRef.current;

    if (minThumb && maxThumb) {
      minThumb.addEventListener('mousedown', handleMinMouseDown);
      maxThumb.addEventListener('mousedown', handleMaxMouseDown);
    }

    updateTrack();

    return () => {
      if (minThumb && maxThumb) {
        minThumb.removeEventListener('mousedown', handleMinMouseDown);
        maxThumb.removeEventListener('mousedown', handleMaxMouseDown);
      }
      if (dragTimeout.current) clearTimeout(dragTimeout.current);
    };
  }, [handleMinMouseDown, handleMaxMouseDown, updateTrack]);

  return (
    <div className="widget-filter__price-container">
      <div className="widget-filter__range-slider" ref={rangeRef}>
        <div className="widget-filter__range-track" ref={trackRef}></div>
        <div
          className="widget-filter__range-thumb"
          ref={minThumbRef}
        ></div>
        <div
          className="widget-filter__range-thumb"
          ref={maxThumbRef}
        ></div>
      </div>
      <div className="widget-filter__range-values">
        <div className="widget-filter__range-value-container">
          <span className="widget-filter__range-value-label">от</span>
          <span className="widget-filter__range-value widget-filter__range-value--start">
            {localValues.min}
          </span>
        </div>
        <div className="widget-filter__range-value-container">
          <span className="widget-filter__range-value-label">до</span>
          <span className="widget-filter__range-value widget-filter__range-value--end">
            {localValues.max}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;