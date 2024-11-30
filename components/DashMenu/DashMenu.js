"use client";
import React, { useState } from "react";
import DashMenuItem from "../DashMenuItem/DashMenuItem";

const DashMenu = ({ closeButton, ChangeUrl }) => {
  const [menuState, setMenuState] = useState(1);
  const dashMenuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: "fa-solid fa-gear",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: "fa-regular fa-user",
    },
    {
      title: "Products",
      path: "/products",
      icon: "fa-solid fa-layer-group",
    },
    {
      title: "Categories",
      path: "/",
      icon: "fa-solid fa-sliders",
    },
    {
      title: "Logout",
      path: "/sign-in",
      icon: "fa-solid fa-arrow-right-from-bracket",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {dashMenuItems.map((item, index) => (
        <DashMenuItem
          key={index}
          title={item.title}
          path={item.path}
          icon={item.icon}
          index={index}
          menuState={menuState}
          setMenuState={setMenuState}
          closeButton={closeButton}
          ChangeUrl={(url) => {
            ChangeUrl(url);
          }}
        />
      ))}
    </div>
  );
};

export default DashMenu;
