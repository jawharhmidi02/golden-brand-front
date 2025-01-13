import { usePathname } from "next/navigation";
import { useContext } from "react";

import Cookies from "js-cookie";

import { AdminAuthContext } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const DashMenuItem = ({ title, path, icon }) => {
  const { ChangeUrl, setLoadingPage } = useContext(AdminAuthContext);
  const pathname = usePathname();
  const lighter = title == "Logout";

  const logout = () => {
    Cookies.remove("admin_access_token");
    setLoadingPage(true);
    location.href = "/admin/sign-in";
  };

  return (
    <div
      onClick={() => {
        if (!lighter) {
          ChangeUrl(`/admin/dashboard${path}`);
        } else {
          logout();
        }
      }}
      className={cn(
        "w-full rounded-md bg-transparent px-3 py-2.5 font-semibold text-[var(--dash-theme3)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--dash-theme4)]",
        pathname === `/admin/dashboard${path}` &&
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
