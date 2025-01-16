import { forwardRef, useContext } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { UserAuthContext } from "@/contexts/AuthContext";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ShowLocation = () => {
  const tCommon = useTranslations("common");
  const { ChangeUrl } = useContext(UserAuthContext);

  return (
    <NavigationMenu className="p-0">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="first-background-primary first-family h-0 px-0 py-0 text-base font-normal hover:bg-inherit focus:bg-inherit">
            <i className="fa-solid fa-location-dot" />
            <span>&nbsp;{tCommon("contact.address")}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-99 md:min-w-[400px]">
            <ul className="z-99 grid gap-3 md:min-w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] lg:p-4">
              <li className="z-99 row-span-3">
                <NavigationMenuLink asChild>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.7392172843165!2d51.4903326!3d25.1106876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d300408befc3%3A0x11a6b59ca28fd1e0!2sGOLDEN%20BRAND%20STAINLESS%20STEEL!5e0!3m2!1sen!2stn!4v1734900740890!5m2!1sen!2stn"
                    className="h-full w-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </NavigationMenuLink>
              </li>
              <li className="z-99 row-span-3 my-3 flex flex-col gap-4">
                <div className="flex cursor-default flex-col gap-0">
                  <div className="text-center">
                    {tCommon("contact.workDays")}
                  </div>
                  <div>
                    <span className="text-center text-neutral-500">
                      7:00 - 17:00
                    </span>
                  </div>
                </div>
                <div className="flex cursor-default flex-col gap-0">
                  <div className="flex flex-row items-center justify-center text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-auto size-5 text-neutral-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +974 7748 0070
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-neutral-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <address className="-mt-0.5 flex-1 not-italic text-neutral-500">
                      {tCommon("contact.address")}
                    </address>
                  </div>
                </div>
                <div>
                  <button
                    className="w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--blue)] px-4 py-1 text-[#ffffff] transition-all duration-200 hover:border-[var(--blue)] hover:bg-[#ffffff] hover:text-[var(--blue)] active:scale-95"
                    type="button"
                    onClick={() => {
                      ChangeUrl("./contact");
                    }}
                  >
                    {tCommon("contact.contactUs")}
                  </button>
                </div>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default ShowLocation;
