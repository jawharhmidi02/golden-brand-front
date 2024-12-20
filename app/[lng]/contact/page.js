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
    <div className="mx-auto mt-6 flex w-full items-center justify-center">
      <div className="mx-5 flex w-full max-w-[1300px] flex-col gap-20 sm:mx-10 xl:mx-28">
        <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
          <div className="flex w-full flex-row items-center justify-center gap-3">
            <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
            <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
              Contact
            </span>
            <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          </div>
          <span className="text-center font-lato text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
            Reach Out
          </span>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="flex flex-grow-[3] flex-col items-center justify-evenly gap-3 rounded-sm border-[1px] border-neutral-100 bg-white py-6 shadow-sm drop-shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-dashed border-[var(--theme)] p-7">
                <i className="fa-regular fa-map text-3xl text-[var(--theme)]"></i>
              </div>
              <span className="font-raleway text-xl font-bold text-neutral-400">
                SERVICE AREA
              </span>
              <span className="font-lato text-sm">Doha, Qatar</span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col items-center justify-evenly gap-3 rounded-sm border-[1px] border-neutral-100 bg-white px-4 py-6 shadow-sm drop-shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-dashed border-[var(--theme)] p-7">
                  <i className="fa-regular fa-envelope text-3xl text-[var(--theme)]"></i>
                </div>
                <span className="font-raleway text-xl font-bold text-neutral-400">
                  SEND US AN EMAIL
                </span>
                <span className="font-lato text-sm">
                  sales@goldenbrandqa.com
                </span>
              </div>

              <div className="flex flex-col items-center justify-evenly gap-3 rounded-sm border-[1px] border-neutral-100 bg-white px-4 py-6 shadow-sm drop-shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-dashed border-[var(--theme)] p-7">
                  <i className="fa-solid fa-phone text-3xl text-[var(--theme)]"></i>
                </div>
                <span className="font-raleway text-xl font-bold text-neutral-400">
                  CALL US
                </span>
                <span className="font-lato text-sm">+974 7748 0070</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-sm border-[1px] border-neutral-100 bg-white p-4 shadow-sm drop-shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
              ></input>
              <input
                type="email"
                placeholder="Email"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
              ></input>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="tel"
                placeholder="Telephone"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
              ></input>
              <input
                type="text"
                placeholder="Address"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
              ></input>
            </div>
            <input
              type="text"
              placeholder="Topic"
              className="w-full border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
            ></input>
            <textarea
              placeholder="Message"
              className="min-h-36 w-full border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
            ></textarea>
            <button
              className="w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--theme)] px-10 py-2.5 text-xl text-[#ffffff] transition-all duration-200 hover:border-[var(--theme)] hover:bg-[#ffffff] hover:text-[var(--theme)] active:scale-95"
              type="button"
            >
              Send Message
            </button>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-20 lg:grid-cols-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58613.59643240183!2d10.523509372413544!3d33.34624482660369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1729389385885!5m2!1sen!2stn"
            className="h-[450px] w-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="flex flex-col justify-center gap-10">
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
                  "flex h-16 w-16 items-center justify-center rounded-sm border-[1px] border-neutral-100 bg-[#ffffff] px-3 py-2 shadow-sm drop-shadow-sm transition-all duration-200",
                  day && "bg-[var(--theme)]",
                )}
              >
                <i
                  className={cn(
                    "fa-solid fa-calendar-days text-3xl text-[var(--theme)] transition-all duration-200",
                    day && "text-white",
                  )}
                ></i>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    "text-xl font-bold transition-colors duration-200",
                    day && "text-[var(--theme)]",
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
                  "flex h-16 w-16 items-center justify-center rounded-sm border-[1px] border-neutral-100 bg-[#ffffff] px-3 py-2 shadow-sm drop-shadow-sm transition-all duration-200",
                  time && "bg-[var(--theme)]",
                )}
              >
                <i
                  className={cn(
                    "fa-regular fa-clock text-3xl text-[var(--theme)] transition-all duration-200",
                    time && "text-white",
                  )}
                ></i>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    "text-xl font-bold transition-colors duration-200",
                    time && "text-[var(--theme)]",
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
