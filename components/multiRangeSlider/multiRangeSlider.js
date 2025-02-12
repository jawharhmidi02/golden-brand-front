"use client";

import "./multiRangeSlider.css";

import { useCallback, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { dir } from "i18next";
import { cn } from "@/lib/utils";

const MultiRangeSlider = ({ changePrice, locale }) => {
  const tCommon = useTranslations("common");
  const searchParams = useSearchParams();
  const min = Number(searchParams.get("minPrice")) || 0;
  const max = Number(searchParams.get("maxPrice")) || 15000;
  const minRange = 0;
  const maxRange = 15000;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const isRTL = locale === "ar";
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - minRange) / (maxRange - minRange)) * 100),
    [minRange, maxRange],
  );

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
    changePrice(value, maxVal);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
    changePrice(minVal, value);
  };

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
    minValRef.current = min;
    maxValRef.current = max;
  }, [min, max]);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      if (isRTL) {
        range.current.style.right = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      } else {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal, getPercent, isRTL]);

  return (
    <div
      className={`relative mx-auto w-full max-w-md px-4 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="container">
        <div className="slider">
          <div className="slider__track" />
          <input
            type="range"
            min={minRange}
            max={maxRange}
            value={minVal}
            onChange={handleMinChange}
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
          />
          <input
            type="range"
            min={minRange}
            max={maxRange}
            value={maxVal}
            onChange={handleMaxChange}
            className="thumb thumb--right"
          />
          <div ref={range} className="slider__range" />
          <div
            className={cn(
              "slider__value-container mt-6 flex justify-between text-lg font-medium text-[var(--blue)]",
            )}
          >
            <div>{`${minVal} ${tCommon("currency")}`}</div>
            <div>{`${maxVal} ${tCommon("currency")}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
