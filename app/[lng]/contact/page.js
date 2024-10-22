"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const page = () => {
  const [day, setDay] = useState(false);
  const [time, setTime] = useState(false);

  useEffect(() => {
    document.title = "GoldenBrand: Contact";
  }, []);
  return (
    <div className="mx-auto w-full mt-20 flex justify-center items-center">
      <div className="flex flex-col max-w-[1300px] w-full gap-20 mx-5 sm:mx-10 xl:mx-28">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
            <div className="flex flex-col gap-3 flex-grow-[3] py-6 justify-evenly items-center bg-white border-[1px] border-neutral-100 rounded-sm shadow-sm drop-shadow-sm">
              <div className="flex justify-center items-center w-12 h-12 p-7 border-dashed border-[1px] border-[var(--blue)] rounded-full ">
                <i className="fa-regular fa-map text-3xl text-[var(--blue)]"></i>
              </div>
              <span className="font-bold text-xl text-neutral-400 font-raleway">
                SERVICE AREA
              </span>
              <span className="text-sm font-lato">Doha, Qatar</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              <div className="flex flex-col gap-3 px-4 py-6 justify-evenly items-center bg-white border-[1px] border-neutral-100 rounded-sm shadow-sm drop-shadow-sm">
                <div className="flex justify-center items-center w-12 h-12 p-7 border-dashed border-[1px] border-[var(--blue)] rounded-full ">
                  <i className="fa-regular fa-envelope text-3xl text-[var(--blue)]"></i>
                </div>
                <span className="font-bold text-xl text-neutral-400 font-raleway">
                  SEND US AN EMAIL
                </span>
                <span className="text-sm font-lato">
                  info@goldendesign.online
                </span>
              </div>

              <div className="flex flex-col gap-3 px-4 py-6 justify-evenly items-center bg-white border-[1px] border-neutral-100 rounded-sm shadow-sm drop-shadow-sm">
                <div className="flex justify-center items-center w-12 h-12 p-7 border-dashed border-[1px] border-[var(--blue)] rounded-full ">
                  <i className="fa-solid fa-phone text-3xl text-[var(--blue)]"></i>
                </div>
                <span className="font-bold text-xl text-neutral-400 font-raleway">
                  CALL US
                </span>
                <span className="text-sm font-lato">+974 7748 0070</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4 bg-white border-[1px]  border-neutral-100 rounded-sm shadow-sm  drop-shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border-[1px] px-3 py-2 border-neutral-300  outline-[var(--blue)]"
              ></input>
              <input
                type="email"
                placeholder="Email"
                className="border-[1px] px-3 py-2 border-neutral-300  outline-[var(--blue)]"
              ></input>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Telephone"
                className="border-[1px] px-3 py-2 border-neutral-300  outline-[var(--blue)]"
              ></input>
              <input
                type="text"
                placeholder="Address"
                className="border-[1px] px-3 py-2 border-neutral-300  outline-[var(--blue)]"
              ></input>
            </div>
            <input
              type="text"
              placeholder="Topic"
              className="border-[1px] px-3 py-2 border-neutral-300 w-full outline-[var(--blue)]"
            ></input>
            <textarea
              placeholder="Message"
              className="border-[1px] px-3 py-2 border-neutral-300 w-full min-h-36 outline-[var(--blue)]"
            ></textarea>
            <button
              className="rounded-sm px-10 py-2.5 w-fit text-xl self-center border-2 border-[#ffffff] text-[#ffffff] bg-[var(--blue)] active:scale-95 hover:border-[var(--blue)] hover:bg-[#ffffff] hover:text-[var(--blue)] transition-all duration-200"
              type="button"
            >
              Send Message
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20  mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58613.59643240183!2d10.523509372413544!3d33.34624482660369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1729389385885!5m2!1sen!2stn"
            className="border-0 w-full h-[450px]"
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
                  "flex justify-center rounded-sm bg-[#ffffff] items-center px-3 py-2 w-16 h-16 shadow-sm drop-shadow-sm border-neutral-100 border-[1px] transition-all duration-200",
                  day && "bg-[var(--blue)]"
                )}
              >
                <i
                  className={cn(
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
                  "flex justify-center rounded-sm bg-[#ffffff] items-center w-16 h-16 px-3 py-2 shadow-sm drop-shadow-sm border-neutral-100 border-[1px] transition-all duration-200",
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
    </div>
  );
};

export default page;
