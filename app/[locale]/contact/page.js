"use client";

import React, { useState, useEffect, useRef } from "react";

import { cn, validateEmail, validateNumberInput } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const page = () => {
  const [day, setDay] = useState(false);
  const [time, setTime] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(event.target);

      const name = formData.get("name")?.trim();
      const phone = formData.get("phone")?.trim();
      const email = formData.get("email")?.trim();
      const address = formData.get("address")?.trim();
      const topic = formData.get("topic")?.trim();
      const message = formData.get("message")?.trim();

      if (!name) {
        toast({
          title: "Error",
          description: "Name field is required",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      if (!phone) {
        toast({
          title: "Error",
          description: "Phone field is required",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      if (!email || !validateEmail(email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      if (!message) {
        toast({
          title: "Error",
          description: "Message field is required",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      event.target.reset();

      toast({
        title: "Success",
        description: "Your message has been sent successfully",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error.message === "Invalid email format"
          ? "Please enter a valid email address"
          : error.message === "Invalid phone number format"
            ? "Please enter a valid phone number"
            : "Failed to send message. Please try again later.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

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
              <span className="text-md font-lato font-medium">Doha, Qatar</span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col items-center justify-evenly gap-3 rounded-sm border-[1px] border-neutral-100 bg-white px-4 py-6 shadow-sm drop-shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-dashed border-[var(--theme)] p-7">
                  <i className="fa-regular fa-envelope text-3xl text-[var(--theme)]"></i>
                </div>
                <span className="font-raleway text-xl font-bold text-neutral-400">
                  SEND US AN EMAIL
                </span>
                <span className="text-md font-lato font-medium">
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
                <span className="text-md font-lato font-medium">
                  +974 7748 0070
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            method="post"
            role="form"
            className="php-email-form"
          >
            <div className="flex flex-col gap-4 rounded-sm border-[1px] border-neutral-100 bg-white p-4 shadow-sm drop-shadow-sm">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
                />
                <input
                  name="email"
                  type="email"
                  ref={emailRef}
                  placeholder="Email"
                  className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="phone"
                  type="tel"
                  ref={phoneRef}
                  onInput={() => validateNumberInput(phoneRef)}
                  placeholder="Phone"
                  className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
                />
                <input
                  name="address"
                  type="text"
                  placeholder="Address"
                  className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
                />
              </div>
              <input
                name="topic"
                type="text"
                placeholder="Topic"
                className="w-full border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
              />
              <textarea
                name="message"
                placeholder="Message"
                className="min-h-36 w-full border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme)]"
              ></textarea>
              <button
                className={cn(
                  "w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--theme)] px-10 py-2.5 text-xl text-[#ffffff] transition-all duration-200 hover:border-[var(--theme)] hover:bg-[#ffffff] hover:text-[var(--theme)] active:scale-95",
                  loading && "opacity-50 hover:cursor-not-allowed",
                )}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-20 lg:grid-cols-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.7392172843165!2d51.4903326!3d25.1106876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d300408befc3%3A0x11a6b59ca28fd1e0!2sGOLDEN%20BRAND%20STAINLESS%20STEEL!5e0!3m2!1sen!2stn!4v1734900740890!5m2!1sen!2stn"
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
                  From Saturday to Thursday
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
                  From 7:00 to 17:00
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
