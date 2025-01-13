import DashMenuItem from "../DashMenuItem/DashMenuItem";

const DashMenu = () => {
  const dashMenuItems = [
    // {
    //   title: "Dashboard",
    //   path: "",
    //   icon: "fa-solid fa-gear",
    // },
    {
      title: "Orders",
      path: "",
      icon: "fa-solid fa-shopping-cart",
    },
    {
      title: "Products",
      path: "/products",
      icon: "fa-solid fa-layer-group",
    },
    {
      title: "Categories",
      path: "/categories",
      icon: "fa-solid fa-sliders",
    },
    {
      title: "Users",
      path: "/users",
      icon: "fa-solid fa-users",
    },
    {
      title: "Profile",
      path: "/account",
      icon: "fa-regular fa-user",
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
        />
      ))}
    </div>
  );
};

export default DashMenu;
