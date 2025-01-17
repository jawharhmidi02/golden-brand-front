"use client";

import { useState, useRef, useContext } from "react";

import { cn, escapeOutput, validateNumberInput } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { UserAuthContext } from "@/contexts/AuthContext";

import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useTranslations } from "next-intl";
import { dir } from "i18next";

const page = () => {
  const tCommon = useTranslations("common");
  const tSignUp = useTranslations("signUp");
  const { ChangeUrl } = useContext(UserAuthContext);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  const register = async () => {
    if (
      !emailRef.current.value.trim() ||
      !passwordRef.current.value ||
      !nameRef.current.value.trim() ||
      !phoneRef.current.value.trim() ||
      !addressRef.current.value.trim()
    ) {
      toast({
        title: tSignUp("toasts.emptyFields.title"),
        description: tSignUp("toasts.emptyFields.description"),
        variant: "destructive",
        duration: 2500,
      });
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: escapeOutput(emailRef.current.value.trim()),
            password: passwordRef.current.value,
            full_name: escapeOutput(nameRef.current.value.trim()),
            phone: escapeOutput(phoneRef.current.value.trim()),
            address: escapeOutput(addressRef.current.value.trim()),
          }),
        },
      );
      const data = await response.json();
      if (data.data === null) {
        if (data.message === "Email already exists") {
          toast({
            title: tSignUp("toasts.emailExists.title"),
            description: tSignUp("toasts.emailExists.description"),
            variant: "destructive",
            duration: 2500,
          });
          setLoading(false);
          return;
        }
        throw new Error(data.message);
      }
      toast({
        title: tSignUp("toasts.registerSuccess.title"),
        description: tSignUp("toasts.registerSuccess.description"),
        variant: "success",
        duration: 2500,
      });
      ChangeUrl("/sign-in");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: tSignUp("toasts.registerError.title"),
        description: tSignUp("toasts.registerError.description"),
        variant: "destructive",
        duration: 2500,
      });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div
      className="mx-auto mt-10 flex h-full w-full items-center justify-center"
      dir="ltr"
    >
      <div
        className={cn(
          "mx-4 grid w-full max-w-[580px] grid-cols-1 xsm:mx-10 min-[800px]:max-w-[1200px] min-[800px]:grid-cols-2",
        )}
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-white px-8 py-10 shadow-md drop-shadow-md min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none lg:py-14 xl:py-20">
          <div
            className={cn("flex flex-col items-center justify-center gap-5")}
          >
            <span className="font-lato text-xl font-semibold text-neutral-900">
              {tSignUp("title")}
            </span>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="fullName"
                className="font-lato text-sm font-bold"
              >
                {tSignUp("fullName")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="text"
                ref={nameRef}
                placeholder={tSignUp("fullNamePlaceholder")}
                id="fullName"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="phone"
                className="font-lato text-sm font-bold"
              >
                {tSignUp("phone")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="tel"
                ref={phoneRef}
                onChange={() => validateNumberInput(phoneRef)}
                placeholder={tSignUp("phonePlaceholder")}
                id="phone"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="address"
                className="font-lato text-sm font-bold"
              >
                {tSignUp("address")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="text"
                ref={addressRef}
                placeholder={tSignUp("addressPlaceholder")}
                id="address"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="email"
                className="font-lato text-sm font-bold"
              >
                {tSignUp("email")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="email"
                ref={emailRef}
                placeholder={tSignUp("emailPlaceholder")}
                id="email"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="password"
                className="font-lato text-sm font-bold"
              >
                {tSignUp("password")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="password"
                ref={passwordRef}
                placeholder={tSignUp("passwordPlaceholder")}
                id="password"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <button
              type="button"
              onClick={register}
              disabled={loading}
              className={cn(
                "w-full max-w-[400px] rounded-full border-2 border-[#ffffff] border-[var(--theme2)] bg-[var(--theme2)] py-3 font-lato text-[#ffffff] outline-none transition-colors duration-200 hover:bg-[var(--hover-theme2)] hover:text-[var(--theme2)]",
                loading && "hover:cursor-not-allowed",
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                </div>
              ) : (
                tSignUp("title")
              )}
            </button>
          </div>
        </div>
        <AccountDecoration
          welcomeText={tSignUp("welcomeAboard")}
          accountText={tSignUp("haveAccount")}
          signText={tSignUp("signInText")}
          url="./sign-in"
        />
      </div>
    </div>
  );
};

export default page;
