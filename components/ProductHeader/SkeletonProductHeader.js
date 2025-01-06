"use client";
import React, { useContext } from "react";
import { Skeleton } from "../ui/skeleton";
import { UserAuthContext } from "@/contexts/AuthContext";

const SkeletonProductHeader = () => {
  const { ChangeUrl } = useContext(UserAuthContext);
  return (
    <div className="flex flex-row gap-2 text-center">
      <div
        onClick={() => ChangeUrl("/")}
        className="self-center font-lato text-lg font-semibold text-neutral-400 transition-all duration-300 hover:cursor-pointer hover:text-neutral-500"
      >
        Home
      </div>
      <i className="fa-solid fa-chevron-right self-center text-neutral-400"></i>
      <div className="self-center font-lato text-lg font-semibold text-neutral-400 transition-all duration-300 hover:cursor-pointer hover:text-neutral-500">
        <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
      </div>
      <i className="fa-solid fa-chevron-right hidden self-center text-neutral-400 sm:block"></i>
      <div className="hidden self-center font-lato text-lg font-semibold text-neutral-800 sm:block">
        <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
      </div>
    </div>
  );
};

export default SkeletonProductHeader;
