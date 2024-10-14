"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import "./multiRangeSlider.css";
import { useSearchParams } from "next/navigation";

const MultiRangeSlider = ({ changePrice }) => {
  const useParams = useSearchParams();
  const min = useParams.get("minPrice") || 0;
  const max = useParams.get("maxPrice") || 50000;
  const minRange = 0;
  const maxRange = 50000;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert value to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minRange) / (maxRange - minRange)) * 100),
    [minRange, maxRange]
  );

  // Update slider with values from search params
  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
    minValRef.current = min;
    maxValRef.current = max;
  }, [min, max]);

  // Update the range style
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Handle min input change
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
    changePrice(value, maxVal);
  };

  // Handle max input change
  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
    changePrice(minVal, value);
  };

  return (
    <div className="container">
      <input
        type="range"
        min={minRange}
        max={maxRange}
        value={minVal}
        onChange={handleMinChange}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={minRange}
        max={maxRange}
        value={maxVal}
        onChange={handleMaxChange}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="font-medium text-lg text-[var(--blue)] slider__left-value">{`${minVal} QR`}</div>
        <div className="font-medium text-lg text-[var(--blue)] slider__right-value">{`${maxVal} QR`}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;

"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";
import { useSearchParams } from "next/navigation";

const MultiRangeSlider = ({ changePrice }) => {
  const useParams = useSearchParams();
  const min = useParams.get("minPrice") || 0;
  const max = useParams.get("maxPrice") || 50000;
  const minRange = 0;
  const maxRange = 50000;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minRange) / (maxRange - minRange)) * 100),
    [minRange, maxRange]
  );
  
  useEffect(() => {
    setMaxVal(max);
    setMinVal(min);
  }, [min, max]);
  // Set width of the range to decrease from the left side

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = ${minPercent}%;
      range.current.style.width = ${maxPercent - minPercent}%;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = ${maxPercent - minPercent}%;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="container">
      <input
        type="range"
        min={minRange}
        max={maxRange}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
          changePrice(value, maxVal);
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={minRange}
        max={maxRange}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
          changePrice(minVal, value);
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="font-medium text-lg text-[var(--blue)] slider__left-value">{${minVal}QR}</div>
        <div className="font-medium text-lg text-[var(--blue)] slider__right-value">{${maxVal}QR}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default MultiRangeSlider;