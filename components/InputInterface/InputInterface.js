import React from "react";

const InputInterface = () => {
  return (
    <div className="flex py-1 pr-3 flex-row min-w-full border-2 border-neutral-200 rounded-xl">
      <div className="flex min-w-10 justify-center items-center">
        <i className="fa-solid fa-magnifying-glass text-neutral-300"></i>
      </div>
      <input
        placeholder="Search: Work table, Bowl sink, Cabinet..."
        type="text"
        className="focus:outline-none  min-h-full flex-1"
      ></input>
      <button className="text-neutral-100 bg-[var(--blue)] font-raleway text-lg rounded-lg py-1 px-2.5 transition-all duration-300 hover:scale-95">
        Search
      </button>
    </div>
  );
};

export default InputInterface;
