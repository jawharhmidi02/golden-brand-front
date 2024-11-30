"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const ShowLocation = ({ ChangeUrl }) => {
  return (
    <NavigationMenu className="p-0">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="first-background-primary first-family h-0 px-0 py-0 text-base font-normal hover:bg-inherit focus:bg-inherit">
            <i className="fa-solid fa-location-dot"></i>&nbsp;Show Location
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-99 md:min-w-[400px]">
            <ul className="z-99 grid gap-3 md:min-w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] lg:p-4">
              <li className="z-99 row-span-3">
                <NavigationMenuLink asChild>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58613.59643240183!2d10.523509372413544!3d33.34624482660369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1729389385885!5m2!1sen!2stn"
                    // width="600"
                    // height="450"

                    className="h-full w-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </NavigationMenuLink>
              </li>
              <li className="z-99 row-span-3 my-3 flex flex-col gap-4">
                <div className="flex cursor-default flex-col gap-0">
                  <div className="text-center">Saturday-Thursday</div>
                  <div>
                    <span className="text-center text-neutral-500">
                      8:00AM - 6:00PM
                    </span>
                  </div>
                </div>
                <div className="flex cursor-default flex-col gap-0">
                  {/* <div>
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="flex-1 text-neutral-500">
                      {" "}
                      info@goldendesign.online{" "}
                    </span>
                  </div> */}
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
                    +97477480070
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
                      Doha, Qatar
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
                    Contact Us
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

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
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
  },
);
ListItem.displayName = "ListItem";
export default ShowLocation;
