"use client";

import { Suspense, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { UserAuthContext } from "@/contexts/AuthContext";
import { cn, formattedDate } from "@/lib/utils";
import { useTranslations } from "next-intl";

const SuccessPage = () => {
  const tCommon = useTranslations("common");
  const tTransaction = useTranslations("transaction");
  const { ChangeUrl } = useContext(UserAuthContext);
  const searchParam = useSearchParams();

  return (
    <div className="mt-24 flex min-h-[60dvh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 text-center shadow-lg">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-green-600">
          {tTransaction("successMessage")}
        </h1>

        <p className="mb-4 text-neutral-600">{tTransaction("description")}</p>

        <div
          className={cn(
            "mb-4 rounded-lg bg-neutral-100 p-4",
            tCommon("language.lng") === "en" ? "text-left" : "text-right",
          )}
        >
          <p className="font-medium text-neutral-700">
            {tTransaction("orderDetails")}:
          </p>
          <p className="text-sm text-neutral-600">
            {tTransaction("orderID")}: {searchParam.get("productId")}
          </p>
          <p className="text-sm text-neutral-600">
            {tTransaction("orderDate")}:{" "}
            {formattedDate(
              searchParam.get("productDate"),
              tCommon("language.lng"),
            )}
          </p>
        </div>

        <button
          onClick={() => {
            ChangeUrl("/");
          }}
          className="mt-4 w-full rounded-lg bg-[var(--theme)] px-4 py-2 text-lg font-semibold text-white transition-all hover:bg-[var(--theme3)]"
        >
          {tTransaction("returnToHomepage")}
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      }
    >
      <SuccessPage />
    </Suspense>
  );
};

export default Page;
