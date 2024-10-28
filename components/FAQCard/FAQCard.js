"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const FAQCard = ({ item }) => {
  const [cardOpen, setCardOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-row gap-5 shadow-lg drop-shadow-md bg-[#ffffff] rounded-lg px-5 md:px-10 py-5 transition-all duration-700",
        cardOpen && ""
      )}
    >
      <div>
        <i
          onClick={() => {
            setCardOpen(!cardOpen);
            setTimeout(() => {
              setAnswerOpen(!answerOpen);
            }, 200);
          }}
          className={cn(
            "fa-solid  text-4xl hover:cursor-pointer transition-colors duration-200 ",
            cardOpen ? "fa-minus text-[var(--theme)]" : "fa-plus text-neutral-800"
          )}
        ></i>
      </div>
      <div className={cn("flex flex-col gap-0 transition-all duration-1000", cardOpen && "gap-5")}>
        <span className="font-semibold font-lato break-all text-lg mt-1 text-neutral-800">
          {item.question}
        </span>
        {/* <div className={cn("")}> */}
          <span
            style={{transitionDuration: "500ms"}}
            className={cn(
              "font-lato text-lg text-neutral-800 h-0 opacity-0 break-all transition-all",
              answerOpen ? "animate-textfadein block" : "animate-textfadeout",
              cardOpen && "h-[200px]"
            )}
          >
            {item.answer}
          </span>
        {/* </div> */}
      </div>
    </div>
  );
};

export default FAQCard;
