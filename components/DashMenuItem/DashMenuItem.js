import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const DashMenuItem = ({
  index,
  title,
  path,
  icon,
  menuState,
  setMenuState,
  closeButton
}) => {
  const router = useRouter();
  const lighter = title == "Logout";
  const menuTransition = (index, path) => {
    setMenuState(index);
    setTimeout(() => {closeButton?.current?.click()}, 400)
    router.push(`/admin${path}`);
  };
  return (
    <div
      onClick={() => {
        if (!lighter) {
          menuTransition(index, path);
        }
      }}
      className={cn(
        "w-full rounded-md bg-transparent px-3 py-2.5 font-semibold text-[var(--dash-theme3)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--dash-theme4)]",
        menuState == index &&
          "bg-[var(--dash-theme5)] text-[var(--dash-theme)] hover:bg-[var(--dash-theme6)]",
        lighter && "text-[#82828c] hover:bg-[#21222d]",
      )}
    >
      <div className="flex flex-row items-center gap-1.5">
        <div className="flex size-[20px] items-center justify-center">
          <i className={cn("text-[17px]", icon)}></i>
        </div>

        <div className="text-lg">{title}</div>
      </div>
    </div>
  );
};

export default DashMenuItem;
