"use client";
import { useState, useRef, useContext } from "react";
import { cn, escapeOutput } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { UserAuthContext } from "@/contexts/AuthContext";
import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useTranslations } from "next-intl";
import { dir } from "i18next";

const page = () => {
  const tCommon = useTranslations("common");
  const tForgotPassword = useTranslations("forgotPassword");
  const { ChangeUrl, Link } = useContext(UserAuthContext);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);

  const sendRecoverEmail = async () => {
    setLoading(true);
    if (!emailRef.current?.value.trim()) {
      toast({
        title: tForgotPassword("toasts.emptyFields.title"),
        description: tForgotPassword("toasts.emptyFields.description"),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/recoverpass/${escapeOutput(emailRef.current?.value.trim())}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const responseData = await response.json();

      if (responseData.statusCode !== 200) {
        if (responseData.message === "Email not found") {
          toast({
            title: tForgotPassword("toasts.emailNotFound.title"),
            description: tForgotPassword("toasts.emailNotFound.description"),
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        throw new Error(responseData.message || "Something went wrong");
      }
      toast({
        title: tForgotPassword("toasts.success.title"),
        description: tForgotPassword("toasts.success.description"),
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: tForgotPassword("toasts.error.title"),
        description: tForgotPassword("toasts.error.description"),
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-10 flex h-full w-full items-center justify-center">
      <div
        className={cn(
          "mx-4 grid w-full max-w-[580px] grid-cols-1 xsm:mx-10 min-[800px]:max-w-[1200px] min-[800px]:grid-cols-2",
        )}
        dir="ltr"
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-white px-8 py-10 shadow-md drop-shadow-md min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none lg:py-14 xl:py-20">
          <div
            className={cn("flex flex-col items-center justify-center gap-5")}
          >
            <div className="flex w-full max-w-[400px] flex-row justify-between">
              <Link
                className="group hover:cursor-pointer"
                onClick={() => {
                  ChangeUrl("/sign-in");
                }}
                href="/sign-in"
              >
                <i className="fa-solid fa-arrow-left text-3xl text-neutral-900 transition-colors duration-200 group-hover:text-[var(--theme2)]"></i>
              </Link>
              <span
                dir={dir(tCommon("language.lng"))}
                className="self-center font-lato text-xl font-semibold text-neutral-900"
              >
                {tForgotPassword("title")}
              </span>
            </div>
            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="email"
                className="font-lato text-sm font-bold"
              >
                {tForgotPassword("email")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="email"
                ref={emailRef}
                placeholder={tForgotPassword("emailPlaceholder")}
                id="email"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={sendRecoverEmail}
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
                tForgotPassword("sendButton")
              )}
            </button>
          </div>
        </div>
        <AccountDecoration
          welcomeText={tForgotPassword("welcomeBack")}
          accountText={tForgotPassword("noAccount")}
          signText={tForgotPassword("signUpText")}
          url="/sign-up"
        />
      </div>
    </div>
  );
};

export default page;
