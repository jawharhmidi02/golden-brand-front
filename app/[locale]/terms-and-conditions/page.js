import { useTranslations } from "next-intl";
import React from "react";

const page = () => {
  const tTermsAndConditions = useTranslations("termsAndConditions");
  console.log(tTermsAndConditions("title"));

  return (
    <div className="mx-auto mt-6 flex h-full w-full items-center justify-center">
      {/* Title */}

      <div className="mx-10 flex w-full flex-col items-center justify-center gap-10 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
          <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl">
            {tTermsAndConditions("title")}
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
        </div>
        <div className="flex w-full max-w-[1300px] flex-col justify-center gap-6 font-lato text-neutral-600">
          <span className="text-center">
            <span className="text-lg font-semibold">
              {tTermsAndConditions("text-1")}
            </span>{" "}
            {tTermsAndConditions("text-2")}
          </span>
          <span>{tTermsAndConditions("text-3")}</span>
          <span>{tTermsAndConditions("text-4")}</span>
          <ul className="list-inside list-decimal marker:text-lg">
            <li className="text-lg font-semibold" id="privacy">
              {tTermsAndConditions("text-5")}
            </li>
            <div className="mt-5">
              <span>
                {tTermsAndConditions("text-6")}
                <span className="font-semibold text-[var(--theme)]">
                  www.goldenbrandqa.com
                </span>{" "}
                {tTermsAndConditions("text-7")}
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-8")}
            </li>
            <ul className="mt-5 list-disc">
              <li className="ml-10">{tTermsAndConditions("text-9")}</li>
            </ul>
            <div className="mt-5 text-lg font-semibold">
              <span>{tTermsAndConditions("text-10")}</span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-11")}</span>
            </div>
            <div className="mt-10">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text-12")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-13")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text-14")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-15")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text-16")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-17")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text-18")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-19")}</span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-20")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text-21")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-22")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text-23")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-24")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold text-neutral-700">
                {tTermsAndConditions("text-25")}
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-26")}
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-5">{tTermsAndConditions("text-27")}</li>
              <li className="ml-10 mt-5">{tTermsAndConditions("text-28")}</li>
              <li className="ml-5 mt-5 text-lg font-semibold">
                {tTermsAndConditions("text-29")}
              </li>
              <ul>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-30")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-31")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-32")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-33")}</li>
              </ul>
              <li className="ml-5 mt-5 text-lg font-semibold">
                {tTermsAndConditions("text-34")}
              </li>
              <ul>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-35")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-36")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-37")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-38")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-39")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text-40")}</li>
              </ul>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-41")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-42")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-43")}
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-5">{tTermsAndConditions("text-44")}</li>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-45")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-46")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-47")}
            </li>
            <div className="mt-5">
              <span>
                {tTermsAndConditions("text-48")}
                <span className="font-semibold text-[var(--theme)]">
                  sales@goldenbrandqa.com{" "}
                </span>
                {tTermsAndConditions("text-49")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-50")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-51")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-52")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-53")}
            </li>
            <div className="mt-5" id="delivery">
              <span>{tTermsAndConditions("text-54")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-55")}
            </li>
            <div className="mt-5" id="payment">
              <span>{tTermsAndConditions("text-56")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-57")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-58")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-59")}
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-4">{tTermsAndConditions("text-60")}</li>
              <li className="ml-10 mt-4">{tTermsAndConditions("text-61")}</li>
              <li className="ml-10 mt-4">{tTermsAndConditions("text-62")}</li>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-63")}
            </li>
            <div className="mt-5" id="refund">
              <span>{tTermsAndConditions("text-64")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text-65")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text-66")}</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
