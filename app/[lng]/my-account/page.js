"use client";

import React, { useState } from "react";
import "./page.css";
import { cn } from "@/lib/utils";

const page = () => {
  const [check, setCheck] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [signText, setSignText] = useState("Sign Up");
  const [accountText, setAccountText] = useState("Don't have an account ?");
  const [welcomeText, setWelcomeText] = useState("Welcome Aboard!");
  const [animationState, setAnimationState] = useState(false);
  const [forgetAnimation, setForgetAnimation] = useState(false);
  const [heightState, setHeightState] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);

  const handlePageTransition = () => {
    if (forgetPass) {
      setTimeout(() => {
        setForgetPass(!forgetPass);
      }, 400);
      setForgetAnimation(!forgetAnimation);
    } else {
      setAnimationState(!animationState);
    }
    if (signIn) {
      setTimeout(() => {
        setSignIn(!signIn);
      }, 400);
      setSignText("Sign In");
      setAccountText("Already have an account ?");
      setWelcomeText("Welcome Back  !");
    } else {
      setSignIn(!signIn);
      setSignText("Sign Up");
      setAccountText("Don't have an account ?");
      setWelcomeText("Welcome Aboard!");
    }
    setHeightState(!heightState);
  };
  return (
    <div className="mx-auto w-full h-full mt-10 flex justify-center items-center">
      <div
        className={cn(
          "grid grid-cols-1 min-[800px]:grid-cols-2 w-full h-[900px] min-[800px]:h-[500px] min-[800px]:max-w-[1200px] mx-4 xsm:mx-10 max-w-[580px] transition-all duration-700",
          heightState && "h-[1200px] min-[800px]:h-[650px]"
        )}
      >
        <div className="flex flex-col px-8 py-10 lg:py-14 xl:py-20 bg-white rounded-t-3xl min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none shadow-md drop-shadow-md justify-center">
          {/* Sign In */}
          <div
            className={cn(
              "flex flex-col gap-5 justify-center items-center opacity-0",
              !signIn ? "hidden" : "animate-fadein",
              forgetPass ? "hidden" : "animate-fadein",
              animationState ? "animate-fadeout" : ""
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

              <span
                className="font-lato font-semibold text-neutral-500 mt-[2px] hover:cursor-pointer hover:text-neutral-700 transition-colors duration-200"
                onClick={() => {
                  setTimeout(() => {
                    setForgetPass(!forgetPass);
                  }, 300);
                  setAnimationState(!animationState);
                  setForgetAnimation(!forgetAnimation);
                }}
              >
                Forgot Password?
              </span>
            </div>
          </div>

          {/* PASSWORD RECOVERY  */}

          <div
            className={cn(
              "flex flex-col gap-5 justify-center items-center opacity-0",
              !forgetPass ? "hidden" : "animate-fadein",
              !forgetAnimation ? "animate-fadeout" : ""
            )}
          >
            <div className="flex w-full max-w-[400px] flex-row justify-between ">
              <div
                className="hover:cursor-pointer group"
                onClick={() => {
                  setTimeout(() => {
                    setForgetPass(!forgetPass);
                  }, 300);
                  setForgetAnimation(!forgetAnimation);
                  setAnimationState(!animationState);
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

          {/* SIGN UP */}

          <div
            className={cn(
              "flex flex-col gap-5 justify-center items-center opacity-0",
              signIn ? "hidden" : "animate-fadein",
              !animationState ? "animate-fadeout" : ""
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

        <div className="flex flex-col gap-5 justify-center items-center bg-[var(--theme)] px-8 py-24 min-[400px]:px-14 rounded-b-3xl min-[800px]:rounded-r-3xl min-[800px]:rounded-bl-none drop-shadow-md shadow-md">
          <span className="text-white font-lato text-3xl font-bold">
            {welcomeText}
          </span>
          <span className="text-neutral-50 font-lato text-sm">
            {accountText}
          </span>
          <button
            type="button"
            onClick={() => handlePageTransition()}
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
