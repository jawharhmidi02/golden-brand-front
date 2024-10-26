"use client";

import React, { useState } from "react";
import "./page.css";
import { cn } from "@/lib/utils";

const page = () => {
  const [check, setCheck] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [signText, setSignText] = useState("Sign Up");
  const [accountText, setAccountText] = useState("Don't have an account ?");
  const [welcomeText, setWelcomeText] = useState("Welcome Aboard !");
  return (
    <div className="mx-auto w-full mt-10 flex justify-center items-center">
      <div className="grid grid-cols-1 min-[800px]:grid-cols-2 w-full min-[800px]:max-w-[1200px] mx-4 xsm:mx-10 max-w-[580px]">
        <div className="flex flex-col px-8 py-10 lg:py-14 xl:py-20 bg-white rounded-t-3xl min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none shadow-md drop-shadow-md">

          {/* Sign In */}
          <div className={cn("flex flex-col gap-5 justify-center items-center opacity-0", !signIn ? "hidden" : "animate-fadein")}>
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
              Sign In
            </button>
            <div className="flex flex-col-reverse gap-2 min-[380px]:flex-row min-[380px]:gap-0 w-full justify-between max-w-[400px]">
              <div className="checkbox-wrapper-21">
                <label
                  className={cn(
                    "control control--checkbox",
                    check && "text-[var(--theme)]"
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

              <span className="font-lato font-semibold text-neutral-500 mt-[2px]">
                Forgot Password?
              </span>
            </div>
          </div>



              {/* SIGN UP */}

          <div className={cn("flex flex-col gap-5 justify-center items-center opacity-0", signIn ? "hidden" : "animate-fadein")}>
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
            <div
              className={cn(
                "flex flex-col-reverse gap-2 min-[380px]:flex-row min-[380px]:gap-0 w-full justify-between max-w-[400px]",
                !signIn && "hidden"
              )}
            >
              <div className="checkbox-wrapper-21">
                <label
                  className={cn(
                    "control control--checkbox",
                    check && "text-[var(--theme)]"
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

              <span className="font-lato font-semibold text-neutral-500 mt-[2px]">
                Forgot Password?
              </span>
            </div>
          </div>


        </div>

        <div className="flex flex-col gap-5 justify-center items-center bg-[var(--theme)] px-12 py-24 rounded-b-3xl min-[800px]:rounded-r-3xl min-[800px]:rounded-bl-none drop-shadow-md shadow-md">
          <span className="text-white font-lato text-3xl font-bold">
            {welcomeText}
          </span>
          <span className="text-neutral-50 font-lato text-sm">
            {accountText}
          </span>
          <button
            type="button"
            onClick={() => {
              setSignIn(!signIn);
              if (signText == "Sign Up") {
                setSignText("Sign In");
                setAccountText("Already have an account ?");
                setWelcomeText("Welcome Back !");
              } else {
                setSignText("Sign Up");
                setAccountText("Don't have an account ?");
                setWelcomeText("Welcome Aboard !");
              }
            }}
            className="outline-none  font-lato text-lg px-5 py-2.5  rounded-full bg-emerald-50 text-[var(--theme)] border-2 border-emerald-50 transition-all duration-200 hover:scale-[1.05] hover:text-white hover:bg-[var(--theme)] "
          >
            {signText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

{
  /* <div class="checkbox-wrapper-21">
  <label class="control control--checkbox">
    Checkbox
    <input type="checkbox" />
    <div class="control__indicator"></div>
  </label>
</div>

<style>
  .checkbox-wrapper-21 .control {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    font-size: 18px;
  }
  .checkbox-wrapper-21 .control input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  .checkbox-wrapper-21 .control__indicator {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background: #e6e6e6;
  }
  .checkbox-wrapper-21 .control:hover input ~ .control__indicator,
  .checkbox-wrapper-21 .control input:focus ~ .control__indicator {
    background: #ccc;
  }
  .checkbox-wrapper-21 .control input:checked ~ .control__indicator {
    background: #2aa1c0;
  }
  .checkbox-wrapper-21 .control:hover input:not([disabled]):checked ~ .control__indicator,
  .checkbox-wrapper-21 .control input:checked:focus ~ .control__indicator {
    background: #0e647d;
  }
  .checkbox-wrapper-21 .control input:disabled ~ .control__indicator {
    background: #e6e6e6;
    opacity: 0.6;
    pointer-events: none;
  }
  .checkbox-wrapper-21 .control__indicator:after {
    content: '';
    position: absolute;
    display: none;
  }
  .checkbox-wrapper-21 .control input:checked ~ .control__indicator:after {
    display: block;
  }
  .checkbox-wrapper-21 .control--checkbox .control__indicator:after {
    left: 8px;
    top: 4px;
    width: 3px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  .checkbox-wrapper-21 .control--checkbox input:disabled ~ .control__indicator:after {
    border-color: #7b7b7b;
  }
</style> */
}
