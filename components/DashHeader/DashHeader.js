import { AdminAuthContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";

const DashHeader = () => {
  const { ChangeUrl } = useContext(AdminAuthContext);

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <img
        src="/images/dash-icon.png"
        alt="mini-logo"
        className="size-[70px] transition-all duration-300 hover:scale-105 hover:cursor-pointer"
        onClick={() => ChangeUrl("/")}
      />
      <div className="flex flex-col">
        <div className="inline-block bg-gradient-to-br from-amber-300 to-amber-600 bg-clip-text text-lg font-bold tracking-wider text-transparent">
          Golden B.
        </div>
        <div className="text-sm font-semibold tracking-widest text-[var(--dash-theme5)]">
          Management
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
