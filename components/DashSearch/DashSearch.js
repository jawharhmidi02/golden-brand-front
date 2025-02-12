"use client";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

const DashSearch = ({ placeholder, search, setSearchQuery = null }) => {
  const [searchState, setSearchState] = useState(false);
  const searchRef = useRef(null);
  return (
    <div
      className={cn(
        "flex w-full flex-row rounded-lg bg-[var(--dash-theme2)] hover:bg-[#2c2d33]",
        searchState && "bg-[#2b2b36]",
      )}
    >
      <label
        htmlFor="search"
        onClick={() => {
          setSearchState(true);
        }}
        onBlur={() => {
          setSearchState(false);
        }}
        className={cn(
          "flex w-full flex-row gap-3 rounded-l-lg px-2.5 py-3 hover:cursor-text",
        )}
      >
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-magnifying-glass text-neutral-400 opacity-50"></i>
        </div>
        <input
          id="search"
          type="text"
          className="w-full bg-transparent text-[17px] font-semibold text-neutral-200 placeholder-neutral-400 placeholder-opacity-50 outline-none"
          ref={searchRef}
          placeholder={placeholder}
        />
      </label>
      <button
        onClick={() => {
          if (search) search(searchRef.current?.value);
          if (setSearchQuery) setSearchQuery(searchRef.current?.value);
        }}
        type="button"
        className="my-2.5 mr-2.5 rounded-lg bg-[var(--dash-theme5)] px-3 py-1.5 text-center text-lg font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme6)] active:scale-95"
      >
        Search
      </button>
    </div>
  );
};

export default DashSearch;
