"use client";

import { useState, useRef, useContext } from "react";
import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";

import { cn, escapeOutput, validateNumberInput } from "@/lib/utils";
import { UserAuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { dir } from "i18next";

import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";

const page = () => {
  const tCommon = useTranslations("common");
  const tSignUp = useTranslations("signUp");
  const tProfile = useTranslations("profile");
  const { ChangeUrl, Link } = useContext(UserAuthContext);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const addressRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const locale = tCommon("language.lng");
  const passwordRules = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    matches: password === confirmPassword && password !== "",
  };
  const ruleTexts = {
    en: {
      minLength: "At least 8 characters long",
      uppercase: "Contains uppercase letter",
      lowercase: "Contains lowercase letter",
      number: "Contains number",
      special: "Contains special character",
      match: "Passwords match",
    },
    ar: {
      minLength: "8 أحرف على الأقل",
      uppercase: "يحتوي على حرف كبير",
      lowercase: "يحتوي على حرف صغير",
      number: "يحتوي على رقم",
      special: "يحتوي على حرف خاص",
      match: "كلمات المرور متطابقة",
    },
  };

  const PasswordRule = ({ satisfied, text }) => (
    <div className="flex items-center gap-2">
      {satisfied ? (
        <Check className="h-4 w-4 text-[#059669]" />
      ) : (
        <X className="h-4 w-4 text-gray-400" />
      )}
      <span
        className={cn(
          "text-sm transition-colors",
          satisfied ? "text-[#059669]" : "text-gray-400",
        )}
      >
        {text}
      </span>
    </div>
  );

  const register = async () => {
    if (!Object.values(passwordRules).every((rule) => rule)) {
      toast({
        title: tProfile("toast.failedTitle"),
        description:
          locale === "ar"
            ? "يرجى التأكد من استيفاء جميع متطلبات كلمة المرور"
            : "Please ensure all password requirements are met",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (
      !emailRef.current.value.trim() ||
      !password ||
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
            password: escapeOutput(password),
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
    } catch (error) {
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

            {/* Previous input fields remain the same until password fields */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tSignUp("passwordPlaceholder")}
                id="password"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label
                dir={dir(tCommon("language.lng"))}
                htmlFor="confirmPassword"
                className="font-lato text-sm font-bold"
              >
                {tSignUp("confirmPassword")}
              </label>
              <input
                dir={dir(tCommon("language.lng"))}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={tSignUp("confirmPasswordPlaceholder")}
                id="confirmPassword"
                className="rounded-full bg-[var(--secondary)] p-3 outline-[var(--theme2)]"
              />
            </div>

            <div
              className="w-full max-w-[400px] rounded-lg border border-gray-200 p-4"
              dir={dir(locale)}
            >
              <PasswordRule
                satisfied={passwordRules.minLength}
                text={ruleTexts[locale].minLength}
              />
              <PasswordRule
                satisfied={passwordRules.hasUppercase}
                text={ruleTexts[locale].uppercase}
              />
              <PasswordRule
                satisfied={passwordRules.hasLowercase}
                text={ruleTexts[locale].lowercase}
              />
              <PasswordRule
                satisfied={passwordRules.hasNumber}
                text={ruleTexts[locale].number}
              />
              <PasswordRule
                satisfied={passwordRules.hasSpecialChar}
                text={ruleTexts[locale].special}
              />
              <PasswordRule
                satisfied={passwordRules.matches}
                text={ruleTexts[locale].match}
              />
            </div>

            <div>
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
              <p
                className="mt-2 w-full max-w-[400px] text-center text-sm text-gray-600"
                dir={dir(locale)}
              >
                {locale === "ar" ? (
                  <>
                    بالنقر على زر التسجيل، فإنك توافق على{" "}
                    <Link
                      href="/terms-and-conditions#privacy"
                      onClick={() => {
                        ChangeUrl("/terms-and-conditions#privacy");
                      }}
                      className="font-bold text-[var(--theme)] transition-colors duration-200 hover:cursor-pointer"
                    >
                      سياسة الخصوصية والشروط.
                    </Link>
                  </>
                ) : (
                  <>
                    By clicking the Sign Up button, you agree to our{" "}
                    <Link
                      href="/terms-and-conditions#privacy"
                      onClick={() => {
                        ChangeUrl("/terms-and-conditions#privacy");
                      }}
                      className="font-bold text-[var(--theme)] transition-colors duration-200 hover:cursor-pointer"
                    >
                      privacy policy & terms.
                    </Link>
                  </>
                )}
              </p>
            </div>
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
