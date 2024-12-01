import React from "react";
import './page.css';
import DashSignHeader from "@/components/DashSignHeader/DashSignHeader";

const page = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] image bg-cover bg-center items-center justify-center">
      <div className="px-10 mx-5 pb-10 pt-6 md:px-14 md:pb-16 md:pt-12 max-w-[500px] w-full flex flex-col gap-4 items-center rounded-xl border-2 border-purple-300 bg-gray-400 bg-opacity-20 bg-clip-padding backdrop-blur-sm backdrop-filter">
        <DashSignHeader/>
        <div className="text-4xl md:text-5xl self-start pb-2 font-semibold inline-block bg-gradient-to-tr from-purple-300 to-purple-400 bg-clip-text text-transparent ">Sign In</div>
        <label className="flex w-full flex-col gap-1.5 hover:cursor-text" htmlFor="email">
          <span className="tracking-wider text-[#ffffff]">EMAIL</span>
          <input id="email" type="text" placeholder="Example@domain.com" className="py-3 px-6 text-lg rounded-3xl w-full bg-[#ffffff] outline-purple-400" />
        </label>
        <label className="w-full flex flex-col gap-1.5 hover:cursor-text" htmlFor="password">
          <span className="tracking-wider text-[#ffffff]">PASSWORD</span>
          <input id="password" type="password" placeholder="Your Password" className="py-3 px-6 text-lg rounded-3xl w-full bg-[#ffffff] outline-purple-400" />
        </label>
        <button type="button" className="mt-4 py-3 bg-purple-400 transition-all duration-200 hover:bg-purple-500 text-white font-semibold text-2xl outline-none w-full rounded-3xl">Sign In</button>
      </div>
    </div>
  );
};

export default page;
