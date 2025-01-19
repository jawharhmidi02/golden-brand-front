"use client";

import { toast } from "@/hooks/use-toast";
import {
  cn,
  validateEmail,
  validateNumberInput,
  cities,
  formattedDate,
  unescapeOutput,
  escapeOutput,
} from "@/lib/utils";
import {
  useRef,
  useState,
  useTransition,
  useEffect,
  Suspense,
  useContext,
} from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { UserAuthContext } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import { dir } from "i18next";
import { Check, X } from "lucide-react";

const ProfilePage = () => {
  const tCommon = useTranslations("common");
  const tProfile = useTranslations("profile");
  const locale = tCommon("language.lng");
  const { setLoadingPage, userData, ChangeUrl, setUserData } =
    useContext(UserAuthContext);
  const searchParams = useSearchParams();
  const menu = parseInt(searchParams.get("menu")) || 1;
  const [isEditing, setIsEditing] = useState(false);
  const [shownPasswordRules, setShownPasswordRules] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

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

  const savePassword = async () => {
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

    const body = {
      password: escapeOutput(passwordRef.current.value),
    };

    try {
      setLoadingPage(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.message === "User updated successfully") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: escapeOutput(emailRef.current.value.trim()),
              password: passwordRef.current.value,
            }),
          },
        );

        if (res.ok) {
          const dataRes = await res.json();

          const expires = 30;

          if (dataRes.data !== null) {
            Cookies.set("access_token", dataRes.data?.access_token, {
              expires,
            });
            toast({
              title: tProfile("toast.successTitle"),
              description: tProfile("toast.passwordChangeSuccess"),
              variant: "success",
              duration: 2000,
            });
            setShownPasswordRules(false);
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            setConfirmPassword("");
            setPassword("");
          }
        }
      }
      setLoadingPage(false);
    } catch (error) {
      console.error(error);
      toast({
        title: tProfile("toast.failedTitle"),
        description: tProfile("toast.errorOccurred"),
        variant: "destructive",
        duration: 2000,
      });
      setLoadingPage(false);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      let errorTest = false;

      if (!firstNameRef.current.value.trim()) {
        toast({
          title: tProfile("toast.failedTitle"),
          description: tProfile("toast.firstNameRequired"),
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (!lastNameRef.current.value.trim()) {
        toast({
          title: tProfile("toast.failedTitle"),
          description: tProfile("toast.lastNameRequired"),
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (
        !emailRef.current.value.trim() ||
        !validateEmail(emailRef.current.value.trim())
      ) {
        toast({
          title: tProfile("toast.failedTitle"),
          description: tProfile("toast.emailInvalid"),
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (!phoneRef.current.value.trim()) {
        toast({
          title: tProfile("toast.failedTitle"),
          description: tProfile("toast.phoneRequired"),
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (!addressRef.current.value.trim()) {
        toast({
          title: tProfile("toast.failedTitle"),
          description: tProfile("toast.addressRequired"),
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }

      if (errorTest) {
        firstNameRef.current.value = userData.full_name?.split(" ")[0];
        lastNameRef.current.value = userData.full_name?.split(" ")[1] || "";
        emailRef.current.value = userData.email;
        phoneRef.current.value = userData.phone;
        addressRef.current.value = userData.address;
        setIsEditing(false);
        return;
      }

      const body = {
        full_name: escapeOutput(
          `${firstNameRef.current.value.trim()} ${lastNameRef.current.value.trim()}`,
        ),
        email: escapeOutput(emailRef.current.value.trim()),
        phone: escapeOutput(phoneRef.current.value.trim()),
        address: escapeOutput(addressRef.current.value.trim()),
      };

      try {
        setLoadingPage(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`,
          {
            method: "PUT",
            headers: {
              access_token: Cookies.get("access_token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );
        const data = await response.json();
        if (data.data == null) {
          if (data.message === "Email already exists") {
            toast({
              title: tProfile("toast.failedTitle"),
              description: tProfile("toast.emailTaken"),
              variant: "destructive",
              duration: 2500,
            });
            emailRef.current.value = userData.email;
            return;
          }
          throw new Error(data.message);
        }
        if (data.message === "User updated successfully") {
          toast({
            title: tProfile("toast.successTitle"),
            description: tProfile("toast.updateSuccess"),
            variant: "success",
            duration: 2000,
          });
          setUserData(data.data);
        }
        setLoadingPage(false);
      } catch (error) {
        console.error(error);
        toast({
          title: tProfile("toast.failedTitle"),
          description: tProfile("toast.errorOccurred"),
          variant: "destructive",
          duration: 2000,
        });
        setLoadingPage(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const parseButton = (state) => {
    if (state === "Waiting to get Accepted...")
      return (
        <span className="py-1.5 font-semibold text-blue-500">
          {tProfile(`state.waiting`)}
        </span>
      );
    if (state === "Accepted")
      return (
        <span className="py-1.5 font-semibold text-green-500">
          {tProfile(`state.${state}`)}
        </span>
      );
    if (state === "Cancelled")
      return (
        <span className="py-1.5 font-semibold text-red-500">
          {tProfile(`state.${state}`)}
        </span>
      );
  };

  return (
    <div className="mx-auto mt-20 flex w-full items-center justify-center">
      <div className="flex w-full max-w-[600px] flex-col rounded-lg bg-white shadow-lg min-[600px]:mx-4">
        <div className="flex items-center justify-center gap-6 border-b-2 border-[var(--theme4)]">
          <div
            onClick={() => ChangeUrl("/profile?menu=1")}
            className={cn(
              "border-b-4 border-neutral-300 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 1 && "border-[var(--theme)] hover:border-[var(--theme)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-700">
              {tProfile("menu.profile")}
            </span>
          </div>
          <div
            onClick={() => ChangeUrl("/profile?menu=2")}
            className={cn(
              "border-b-4 border-neutral-300 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 2 && "border-[var(--theme)] hover:border-[var(--theme)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-700">
              {tProfile("menu.orders")}
            </span>
          </div>
        </div>

        {/* PROFILE */}

        {menu === 1 && (
          <div className="flex w-full flex-col items-center gap-4 px-4 py-6 min-[600px]:px-8">
            <div className="flex w-full flex-col gap-2">
              <div className="mb-4 text-2xl font-semibold text-neutral-700">
                {tProfile("yourPersonalInfo")}
              </div>
              <div className="flex w-full flex-col gap-2 min-[550px]:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">
                    {tProfile("FirstName")}
                  </div>
                  <input
                    defaultValue={unescapeOutput(
                      userData.full_name?.split(" ")[0],
                    )}
                    ref={firstNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder={tProfile("FirstName")}
                    className={cn(
                      "w-full border-[1px] border-transparent bg-[var(--theme4)!important] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                      !isEditing
                        ? "hover:cursor-default"
                        : "border-[var(--theme)] outline-[var(--theme)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">{tProfile("LastName")}</div>
                  <input
                    defaultValue={unescapeOutput(
                      userData.full_name?.split(" ").length > 1
                        ? userData.full_name?.split(" ")[1]
                        : "",
                    )}
                    ref={lastNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder={tProfile("LastName")}
                    className={cn(
                      "w-full border-[1px] border-transparent bg-[var(--theme4)!important] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                      !isEditing
                        ? "hover:cursor-default"
                        : "border-[var(--theme)] outline-[var(--theme)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-neutral-400">{tProfile("Email")}</div>
                <input
                  defaultValue={unescapeOutput(userData.email)}
                  ref={emailRef}
                  readOnly={!isEditing}
                  type="email"
                  placeholder={tProfile("Email")}
                  className={cn(
                    "w-full border-[1px] border-transparent bg-[var(--theme4)!important] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "border-[var(--theme)] outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-neutral-400">{tProfile("Phone")}</div>
                <input
                  ref={phoneRef}
                  defaultValue={unescapeOutput(userData.phone)}
                  readOnly={!isEditing}
                  type="tel"
                  placeholder={tProfile("Phone")}
                  className={cn(
                    "w-full border-[1px] border-transparent bg-[var(--theme4)!important] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "border-[var(--theme)] outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                  onChange={() => validateNumberInput(phoneRef)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-neutral-400">{tProfile("address")}</div>
                <input
                  ref={addressRef}
                  defaultValue={unescapeOutput(userData.address)}
                  readOnly={!isEditing}
                  type="text"
                  placeholder={tProfile("address")}
                  className={cn(
                    "w-full border-[1px] border-transparent bg-[var(--theme4)!important] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "border-[var(--theme)] outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                />
              </div>

              <button
                onClick={() => handleEdit()}
                type="button"
                className={cn(
                  "mt-4 w-full max-w-[227px] self-start border-[1px] py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent",
                  isEditing
                    ? "border-emerald-500 bg-emerald-500 hover:text-emerald-500"
                    : "border-blue-500 bg-blue-500 hover:text-blue-500",
                )}
              >
                {isEditing ? tProfile("save") : tProfile("editData")}
              </button>
              <div className="mb-4 mt-4 self-start text-2xl font-semibold text-neutral-700">
                {tProfile("password.title")}
              </div>
              <div className="flex w-full flex-col gap-2 min-[550px]:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">
                    {tProfile("password.newPassword")}
                  </div>
                  <input
                    placeholder={tProfile("password.newPassword")}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    onFocus={() => setShownPasswordRules(true)}
                    ref={passwordRef}
                    className="w-full border-[1px] border-[var(--theme)] bg-[var(--theme4)!important] px-3 py-2 text-lg placeholder-neutral-300 outline-[var(--theme)]"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">
                    {tProfile("password.confirmPassword")}
                  </div>
                  <input
                    placeholder={tProfile("password.confirmPassword")}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ref={confirmPasswordRef}
                    type="password"
                    onFocus={() => setShownPasswordRules(true)}
                    className="w-full border-[1px] border-[var(--theme)] bg-[var(--theme4)!important] px-3 py-2 text-lg placeholder-neutral-300 outline-[var(--theme)]"
                  />
                </div>
              </div>
              {shownPasswordRules && (
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
              )}

              <button
                onClick={() => savePassword()}
                type="button"
                className="mt-4 w-full max-w-[227px] self-start border-[1px] border-[var(--theme)] bg-[var(--theme)] py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--theme)]"
              >
                {tProfile("password.savePassword")}
              </button>
            </div>
          </div>
        )}

        {/* ORDERS */}

        {menu === 2 && (
          <div className="flex w-full flex-col items-center gap-6 px-4 py-6 min-[600px]:px-8">
            <div className="w-full text-2xl font-semibold text-neutral-700">
              {tProfile("orders.YourOrders")}
            </div>
            {userData.orders?.length > 0 ? (
              <div className="flex w-full flex-col gap-6">
                {userData.orders?.map((order) => (
                  <div
                    key={order.id}
                    className="w-full rounded-lg bg-[var(--theme4)!important] p-6 shadow-lg"
                  >
                    <div className="mb-4 flex flex-col">
                      <div className="text-lg font-semibold text-neutral-700">
                        {tProfile("orders.OrderID")}: {order.id}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {tProfile("orders.State")}: {parseButton(order.state)}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {tProfile("orders.CreatedAt")}:
                        {order.created_At &&
                          formattedDate(
                            order.created_At,
                            tCommon("language.lng"),
                          )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="mb-2 text-lg font-semibold text-neutral-700">
                        {tProfile("orders.ClientData")}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {tProfile("orders.FullName")}: {order.first_name}{" "}
                        {order.last_name}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {tProfile("Phone")}: {order.phone}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {tProfile("Email")}: {order.email}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {tProfile("address")}: {order.address}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {tProfile("orders.OrderType")}: {order.type}
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-2 text-lg font-semibold text-neutral-700">
                        {tProfile("orders.Products")}
                      </div>
                      <ul className="flex flex-col gap-4">
                        {order.order_Products.map((orderProduct) => (
                          <li
                            key={orderProduct.id}
                            onClick={() =>
                              ChangeUrl(
                                `/products/${orderProduct.ProductsVariant.product.id}`,
                              )
                            }
                            className="flex w-full items-start justify-between rounded-lg bg-white p-4 shadow transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                          >
                            <div className="flex flex-col">
                              <div className="text-neutral-800">
                                {orderProduct.ProductsVariant.product.name}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {tCommon("quantity")}: {orderProduct.quantity}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {tCommon("price")}: {orderProduct.price}{" "}
                                {tCommon("currency")}
                              </div>
                            </div>
                            <div className="h-16 w-16">
                              <img
                                src={orderProduct.ProductsVariant.product.img}
                                alt={orderProduct.ProductsVariant.product.name}
                                className="h-full w-full rounded-lg object-cover"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center text-lg text-neutral-500">
                {tProfile("orders.empty")}
              </div>
            )}
          </div>
        )}
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
      <ProfilePage />
    </Suspense>
  );
};

export default Page;
