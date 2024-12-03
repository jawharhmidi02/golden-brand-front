import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonProductCard = () => {
  return (
    <div className="flex flex-col justify-start gap-2 text-wrap rounded-md border-2 border-neutral-200 p-[35px] shadow-sm drop-shadow-sm transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer hover:bg-neutral-100">
      <Skeleton className="w-max-[400px] h-[260px] w-[260px] rounded-sm bg-neutral-200" />
      <div className="flex flex-col text-center">
        <span className="mb-3 mt-2 font-lato text-xl font-extrabold text-[var(--fifth-color-primary)]">
          <Skeleton className="my-2 h-[22px] w-[260px] rounded-sm bg-neutral-300" />
          <Skeleton className="my-2 h-[22px] w-[260px] rounded-sm bg-neutral-300" />
        </span>
        <span className="font-lato text-lg font-semibold text-neutral-600">
          <Skeleton className="mx-auto h-[30px] w-[100px] rounded-sm bg-neutral-300" />
        </span>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
