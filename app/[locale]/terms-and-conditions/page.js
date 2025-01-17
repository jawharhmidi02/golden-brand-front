"use client";

import { useTranslations } from "next-intl";
import React from "react";

const page = () => {
  const tTermsAndConditions = useTranslations("termsAndConditions");

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
              {tTermsAndConditions("text1")}
            </span>{" "}
            {tTermsAndConditions("text2")}
          </span>
          <span>{tTermsAndConditions("text3")}</span>
          <span>{tTermsAndConditions("text4")}</span>
          <ul className="list-inside list-decimal marker:text-lg">
            <li className="text-lg font-semibold" id="privacy">
              {tTermsAndConditions("text5")}
            </li>
            <div className="mt-5">
              <span>
                {tTermsAndConditions("text6")}
                <span className="font-semibold text-[var(--theme)]">
                  www.goldenbrandqa.com
                </span>{" "}
                {tTermsAndConditions("text7")}
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text8")}
            </li>
            <ul className="mt-5 list-disc">
              <li className="ml-10">{tTermsAndConditions("text9")}</li>
            </ul>
            <div className="mt-5 text-lg font-semibold">
              <span>{tTermsAndConditions("text10")}</span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text11")}</span>
            </div>
            <div className="mt-10">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text12")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text13")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text14")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text15")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text16")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text17")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text18")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text19")}</span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text20")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text21")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text22")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                {tTermsAndConditions("text23")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text24")}</span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold text-neutral-700">
                {tTermsAndConditions("text25")}
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text26")}
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-5">{tTermsAndConditions("text27")}</li>
              <li className="ml-10 mt-5">{tTermsAndConditions("text28")}</li>
              <li className="ml-5 mt-5 text-lg font-semibold">
                {tTermsAndConditions("text29")}
              </li>
              <ul>
                <li className="ml-10 mt-4">{tTermsAndConditions("text30")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text31")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text32")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text33")}</li>
              </ul>
              <li className="ml-5 mt-5 text-lg font-semibold">
                {tTermsAndConditions("text34")}
              </li>
              <ul>
                <li className="ml-10 mt-4">{tTermsAndConditions("text35")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text36")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text37")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text38")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text39")}</li>
                <li className="ml-10 mt-4">{tTermsAndConditions("text40")}</li>
              </ul>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text41")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text42")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text43")}
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-5">{tTermsAndConditions("text44")}</li>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text45")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text46")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text47")}
            </li>
            <div className="mt-5">
              <span>
                {tTermsAndConditions("text48")}
                <span className="font-semibold text-[var(--theme)]">
                  sales@goldenbrandqa.com{" "}
                </span>
                {tTermsAndConditions("text49")}
              </span>
            </div>
            <div className="mt-5">
              <span>{tTermsAndConditions("text50")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text51")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text52")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text53")}
            </li>
            <div className="mt-5" id="delivery">
              <span>{tTermsAndConditions("text54")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text55")}
            </li>
            <div className="mt-5" id="payment">
              <span>{tTermsAndConditions("text56")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text57")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text58")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text59")}
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-4">{tTermsAndConditions("text60")}</li>
              <li className="ml-10 mt-4">{tTermsAndConditions("text61")}</li>
              <li className="ml-10 mt-4">{tTermsAndConditions("text62")}</li>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text63")}
            </li>
            <div className="mt-5" id="refund">
              <span>{tTermsAndConditions("text64")}</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              {tTermsAndConditions("text65")}
            </li>
            <div className="mt-5">
              <span>{tTermsAndConditions("text66")}</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
