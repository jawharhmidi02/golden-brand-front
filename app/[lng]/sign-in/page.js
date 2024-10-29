"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import './page.css';
import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [check, setCheck] = useState(false);
  return (
    <div className="mx-auto w-full h-full mt-10 flex justify-center items-center">
      <div
        className={cn(
          "grid grid-cols-1 min-[800px]:grid-cols-2 w-full h-[900px] min-[800px]:h-[500px] min-[800px]:max-w-[1200px] mx-4 xsm:mx-10 max-w-[580px]",
        )}
      >
        <div className="flex flex-col px-8 py-10 lg:py-14 xl:py-20 bg-white rounded-t-3xl min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none shadow-md drop-shadow-md justify-center">
          {/* Sign In */}
          <div
            className={cn(
              "flex flex-col gap-5 justify-center items-center",
            )}
          >
            <span className="text-xl font-semibold font-lato text-neutral-900">
              Sign In
            </span>
            <div className="flex flex-col gap-1 w-full max-w-[400px]">
              <label htmlFor="email" className="font-bold text-sm font-lato">
                {" "}
                EMAIL
              </label>
              <input
                type="email"
                placeholder="Example@domain.com"
                id="email"
                className="pl-4 py-3 rounded-full bg-[var(--secondary)] outline-[var(--theme2)]"
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
                className="pl-4 py-3 rounded-full bg-[var(--secondary)] outline-[var(--theme2)]"
              />
            </div>

            <button
              type="button"
              className="w-full font-lato text-[#ffffff] bg-[var(--theme2)] outline-none rounded-full py-3 max-w-[400px] border-2 border-[#ffffff] hover:text-[var(--theme2)] border-[var(--theme2)]  hover:bg-[var(--hover-theme2)] transition-colors duration-200"
            >
              Sign In
            </button>
            <div className="flex flex-col-reverse gap-2 min-[380px]:flex-row min-[380px]:gap-0 w-full justify-between max-w-[400px]">
              <div className="checkbox-wrapper-21">
                <label
                  className={cn(
                    "control control--checkbox",
                    check && "text-[var(--theme2)]"
                  )}
                >
                  Remember Me
                  <input
                    type="checkbox"
                    onChange={() => {
                      setCheck(!check);
                    }}
                  />
                  <div className="control__indicator"></div>
                </label>
              </div>

              <span
                className="font-lato font-semibold text-neutral-500 mt-[2px] hover:cursor-pointer hover:text-neutral-700 transition-colors duration-200"
                onClick={() => {
                  router.push('./reset-password');
                }}
              >
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
        <AccountDecoration welcomeText="Welcome Back!" accountText="Don't have an account?" signText="Sign Up" url="./sign-up" />
      </div>
    </div>
  );
};

export default page;
