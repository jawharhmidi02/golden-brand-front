"use client";

import "./page.css";

import { useState, useRef, useContext } from "react";

import Cookies from "js-cookie";

import { cn, escapeOutput } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { UserAuthContext } from "@/contexts/AuthContext";

import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useTranslations } from "next-intl";
import { dir } from "i18next";

const page = () => {
  const tCommon = useTranslations("common");
  const tSignIn = useTranslations("signIn");
  const { ChangeUrl, Link, setLoadingPage } = useContext(UserAuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const login = async () => {
    if (!emailRef.current?.value.trim() || !passwordRef.current?.value) {
      toast({
        title: tSignIn("toasts.emptyFields.title"),
        description: tSignIn("toasts.emptyFields.description"),
        variant: "destructive",
        duration: 2500,
      });
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: escapeOutput(emailRef.current?.value.trim()),
            password: escapeOutput(passwordRef.current?.value),
            rememberMe: check,
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        if (data.data === null) {
          toast({
            title: tSignIn("toasts.invalidCredentials.title"),
            description: tSignIn("toasts.invalidCredentials.description"),
            variant: "destructive",
            duration: 2500,
          });
          setLoading(false);
          return;
        }
        let expires = 3;
        if (check) {
          expires = 30;
        }
        Cookies.set("access_token", data.data.access_token, { expires });

        toast({
          title: tSignIn("toasts.loginSuccess.title"),
          description: tSignIn("toasts.loginSuccess.description"),
          variant: "success",
          duration: 2500,
        });
        setLoadingPage(true);
        document.location.href = "/";
        setLoading(false);
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: tSignIn("toasts.loginError.title"),
        description: tSignIn("toasts.loginError.description"),
        variant: "destructive",
        duration: 2500,
      });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-10 flex h-full w-full items-center justify-center">
      <div
        className={cn(
          "mx-4 grid h-[900px] w-full max-w-[580px] grid-cols-1 xsm:mx-10 min-[800px]:h-[500px] min-[800px]:max-w-[1200px] min-[800px]:grid-cols-2",
        )}
        dir="ltr"
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-white px-8 py-10 shadow-md drop-shadow-md min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none lg:py-14 xl:py-20">
          <div
            className={cn("flex flex-col items-center justify-center gap-5")}
          >
            <span className="font-lato text-xl font-semibold text-neutral-900">
              {tSignIn("title")}
            </span>
            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="email"
                className="font-lato text-sm font-bold"
              >
                {tSignIn("email")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="email"
                ref={emailRef}
                placeholder={tSignIn("emailPlaceholder")}
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
                {tSignIn("password")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="password"
                ref={passwordRef}
                placeholder={tSignIn("passwordPlaceholder")}
                id="password"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <button
              type="button"
              onClick={login}
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
                tSignIn("title")
              )}
            </button>

            <div className="flex w-full max-w-[400px] flex-col-reverse justify-between gap-2 min-[380px]:flex-row min-[380px]:gap-0">
              <div className="checkbox-wrapper-21">
                <label
                  className={cn(
                    "control control--checkbox",
                    check && "text-[var(--theme2)]",
                  )}
                >
                  {tSignIn("rememberMe")}
                  <input
                    type="checkbox"
                    disabled={loading}
                    onChange={() => setCheck((prev) => !prev)}
                  />
                  <div className="control__indicator"></div>
                </label>
              </div>

              <Link
                href="./reset-password"
                onClick={() => ChangeUrl("./reset-password")}
                className="mt-[2px] font-lato font-semibold text-neutral-500 transition-colors duration-200 hover:cursor-pointer hover:text-neutral-700"
              >
                {tSignIn("forgotPassword")}
              </Link>
            </div>
          </div>
        </div>
        <AccountDecoration
          welcomeText={tSignIn("welcomeBack")}
          accountText={tSignIn("noAccount")}
          signText={tSignIn("signUpText")}
          url="./sign-up"
        />
      </div>
    </div>
  );
};

export default page;
