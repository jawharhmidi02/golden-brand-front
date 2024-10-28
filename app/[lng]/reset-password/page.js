"use client";
import React from "react";
import { cn } from "@/lib/utils";
import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="mx-auto w-full h-full mt-10 flex justify-center items-center">
      <div
        className={cn(
          "grid grid-cols-1 min-[800px]:grid-cols-2 w-full  min-[800px]:max-w-[1200px] mx-4 xsm:mx-10 max-w-[580px]"
        )}
      >
        <div className="flex flex-col px-8 py-10 lg:py-14 xl:py-20 bg-white rounded-t-3xl min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none shadow-md drop-shadow-md justify-center">
          <div
            className={cn(
              "flex flex-col gap-5 justify-center items-center opacity-0 animate-fadein",
            )}
          >
            <div className="flex w-full max-w-[400px] flex-row justify-between ">
              <div
                className="hover:cursor-pointer group"
                onClick={() => {
                  router.push('./sign-in')
                }}
              >
                <i className="fa-solid fa-arrow-left text-3xl text-neutral-900 group-hover:text-[var(--theme)] transition-colors duration-200"></i>
              </div>
              <span className="text-xl font-semibold font-lato self-center text-neutral-900">
                Password Recovery
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-[400px]">
              <label htmlFor="email" className="font-bold text-sm font-lato">
                {" "}
                EMAIL
              </label>
              <input
                type="email"
                placeholder="Example@domain.com"
                id="email"
                className="pl-4 py-3 rounded-full bg-[var(--secondary)] outline-[var(--theme)]"
              />
            </div>

            <button
              type="button"
              className="w-full font-lato text-[#ffffff] bg-[var(--theme)] outline-none rounded-full py-3 max-w-[400px] border-2 border-[#ffffff] hover:text-[var(--theme)] border-[var(--theme)] hover:bg-emerald-100 transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
        <AccountDecoration welcomeText="Welcome Back!" accountText="Don't have an account?" signText="Sign Up" url="./sign-up" />
      </div>
    </div>
  );
};

export default page;
