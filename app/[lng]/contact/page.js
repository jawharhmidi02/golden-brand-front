"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const page = () => {
  const [day, setDay] = useState(false);
  const [time, setTime] = useState(false);
  const Go_Top = useRef(null);

  const handleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const check = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      Go_Top.current.classList.add("showGoTop");
    } else {
      Go_Top.current.classList.remove("showGoTop");
    }
  };

  useEffect(() => {
    document.title = "GoldenBrand: Product";
    window.onscroll = function () {
      check();
    };
  }, []);
  return (
    <div className="flex flex-col mx-auto w-[1200px] gap-20 mt-2">
      <div
        className="gotop"
        ref={Go_Top}
        onClick={() => {
          handleScroll();
        }}
      >
        <i className="fa-solid fa-chevron-up text-neutral-800"></i>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-5 justify-center">
          <div className="flex flex-col gap-3 flex-grow-[3] py-6 justify-evenly items-center bg-white border-1 border-neutral-100 rounded-sm shadow-sm drop-shadow-sm">
            <div className="flex justify-center items-center w-12 h-12 p-7 border-dashed border-1 border-[var(--blue)] rounded-full ">
              <i className="fa-regular fa-map text-3xl text-[var(--blue)]"></i>
            </div>
            <span className="font-bold text-xl text-neutral-400 font-raleway">
              SERVICE AREA
            </span>
            <span className="text-sm font-lato">Doha, Qatar</span>
          </div>

          <div className="flex flex-col gap-3 px-14 py-6 justify-evenly items-center bg-white border-1 border-neutral-100 rounded-sm shadow-sm drop-shadow-sm">
            <div className="flex justify-center items-center w-12 h-12 p-7 border-dashed border-1 border-[var(--blue)] rounded-full ">
              <i className="fa-regular fa-envelope text-3xl text-[var(--blue)]"></i>
            </div>
            <span className="font-bold text-xl text-neutral-400 font-raleway">
              SEND US AN EMAIL
            </span>
            <span className="text-sm font-lato">info@goldendesign.online</span>
          </div>

          <div className="flex flex-col gap-3 px-14 py-6 justify-evenly items-center bg-white border-1 border-neutral-100 rounded-sm shadow-sm drop-shadow-sm">
            <div className="flex justify-center items-center w-12 h-12 p-7 border-dashed border-1 border-[var(--blue)] rounded-full ">
              <i className="fa-solid fa-phone text-3xl text-[var(--blue)]"></i>
            </div>
            <span className="font-bold text-xl text-neutral-400 font-raleway">
              CALL US
            </span>
            <span className="text-sm font-lato">+974 7748 0070</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 bg-white border-1  border-neutral-100 rounded-sm shadow-sm drop-shadow-sm">
          <div className="flex flex-row  gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border-1 px-3 py-2 border-neutral-300 w-6/12 outline-[var(--blue)]"
            ></input>
            <input
              type="email"
              placeholder="Email"
              className="border-1 px-3 py-2 border-neutral-300 w-6/12 outline-[var(--blue)]"
            ></input>
          </div>
          <div className="flex flex-row gap-4">
            <input
              type="tel"
              placeholder="Telephone"
              className="border-1 px-3 py-2 border-neutral-300 w-6/12 outline-[var(--blue)]"
            ></input>
            <input
              type="text"
              placeholder="Address"
              className="border-1 px-3 py-2 border-neutral-300 w-6/12 outline-[var(--blue)]"
            ></input>
          </div>
          <input
            type="text"
            placeholder="Topic"
            className="border-1 px-3 py-2 border-neutral-300 w-full outline-[var(--blue)]"
          ></input>
          <textarea
            placeholder="Message"
            className="border-1 px-3 py-2 border-neutral-300 w-full outline-[var(--blue)]"
          ></textarea>
          <button
            className="rounded-sm px-10 py-2.5 w-fit text-xl self-center border-2 border-[#ffffff] text-[#ffffff] bg-[var(--blue)] active:scale-95 hover:border-[var(--blue)] hover:bg-[#ffffff] hover:text-[var(--blue)] transition-all duration-200"
            type="button"
          >
            Send Message
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58613.59643240183!2d10.523509372413544!3d33.34624482660369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1729389385885!5m2!1sen!2stn"
          width="600"
          height="450"
          className="border-0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="flex flex-col gap-10 justify-center">
          <div
            onMouseOver={() => {
              setDay(true);
            }}
            onMouseOut={() => {
              setDay(false);
            }}
            className="flex flex-row gap-4 hover:cursor-pointer"
          >
            <div
              className={cn(
                "flex justify-center rounded-sm bg-[#ffffff] items-center px-3 py-2 shadow-sm drop-shadow-sm border-neutral-100 border-1 transition-all duration-200",
                day && "bg-[var(--blue)]"
              )}
            >
              <i
                class={cn(
                  "fa-solid fa-calendar-days text-3xl text-[var(--blue)] transition-all duration-200",
                  day && "text-white"
                )}
              ></i>
            </div>
            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  "font-bold text-xl transition-colors duration-200",
                  day && "text-[var(--blue)]"
                )}
              >
                From Monday to Saturday
              </span>
              <span className="text-neutral-600">
                We are available all week to meet your needs.
              </span>
            </div>
          </div>

          <div
            onMouseOver={() => {
              setTime(true);
            }}
            onMouseOut={() => {
              setTime(false);
            }}
            className="flex flex-row gap-4 hover:cursor-pointer"
          >
            <div
              className={cn(
                "flex justify-center rounded-sm bg-[#ffffff] items-center px-3 py-2 shadow-sm drop-shadow-sm border-neutral-100 border-1 transition-all duration-200",
                time && "bg-[var(--blue)]"
              )}
            >
              <i
                className={cn(
                  "fa-regular fa-clock text-3xl text-[var(--blue)] transition-all duration-200",
                  time && "text-white"
                )}
              ></i>
            </div>
            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  "font-bold text-xl transition-colors duration-200",
                  time && "text-[var(--blue)]"
                )}
              >
                From 7:30 to 19:00
              </span>
              <span className="text-neutral-600">
                Our store is open extended hours to fit your schedule.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
