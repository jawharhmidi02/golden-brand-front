import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import React from "react";
import { cn } from "@/lib/utils";

const page = () => {
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
              "flex flex-col gap-5 justify-center items-center opacity-0 animate-fadein"
            )}
          >
            <span className="text-xl font-semibold font-lato text-neutral-900">
              Sign Up
            </span>

            <div className="flex flex-col gap-1 w-full max-w-[400px]">
              <label htmlFor="fullName" className="font-bold text-sm font-lato">
                {" "}
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="Full Name"
                id="fullName"
                className="pl-4 py-3 rounded-full bg-[var(--secondary)] outline-[var(--theme)]"
              />
            </div>

            <div className="flex flex-col gap-1 w-full max-w-[400px]">
              <label htmlFor="phone" className="font-bold text-sm font-lato">
                {" "}
                PHONE
              </label>
              <input
                type="tel"
                placeholder="+974 12 345 678"
                id="phone"
                className="pl-4 py-3 rounded-full bg-[var(--secondary)] outline-[var(--theme)]"
              />
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

            <div className="flex flex-col gap-1 w-full max-w-[400px]">
              <label htmlFor="password" className="font-bold text-sm font-lato">
                {" "}
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="pl-4 py-3 rounded-full bg-[var(--secondary)] outline-[var(--theme)]"
              />
            </div>

            <button
              type="button"
              className="w-full font-lato text-[#ffffff] bg-[var(--theme)] outline-none rounded-full py-3 max-w-[400px] border-2 border-[#ffffff] hover:text-[var(--theme)] border-[var(--theme)] hover:bg-emerald-100 transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
        <AccountDecoration
          welcomeText="Welcome Aboard!"
          accountText="Already have an account?"
          signText="Sign In"
          url="./sign-in"
        />
      </div>
    </div>
  );
};

export default page;
