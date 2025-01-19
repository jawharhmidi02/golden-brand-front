"use client";

import "./page.css";

import { useContext, useRef, useState } from "react";
import Cookies from "js-cookie";

import { cn, escapeOutput, validateEmail } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AdminAuthContext } from "@/contexts/AuthContext";

import DashSignHeader from "@/components/DashSignHeader/DashSignHeader";

const page = () => {
  const { ChangeUrl, setLoadingPage } = useContext(AdminAuthContext);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (
      emailInput.current.value.trim() === "" ||
      !validateEmail(emailInput.current.value.trim())
    ) {
      toast({
        description: "Verify the email!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (passwordInput.current.value === "") {
      toast({
        description: "Verify the password!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: escapeOutput(emailInput.current.value.trim()),
            password: passwordInput.current.value,
            rememberMe: check,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data === null) {
          toast({
            title: "Failed",
            description: "Invalid Credentials, Please verify your Data!",
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

        Cookies.set("admin_access_token", data.data.admin_access_token, {
          expires,
        });

        toast({
          title: "Success",
          description: "You Signed in successfully, Welcome Back!",
          variant: "success",
          duration: 2500,
        });
        setLoadingPage(true);
        document.location.href = "/admin/dashboard";
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);

      toast({
        title: "Error",
        description: "Something happened, please try again or contact us!",
        variant: "destructive",
        duration: 2500,
      });

      console.error(error);
    }
    setLoading(false);

    // write backend logic here
  };

  return (
    <div className="image flex min-h-[100dvh] flex-1 items-center justify-center bg-cover bg-center">
      <div className="mx-5 my-8 flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-purple-300 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <DashSignHeader />
        <div className="inline-block self-start bg-gradient-to-tr from-purple-300 to-purple-400 bg-clip-text pb-2 text-4xl font-semibold text-transparent md:text-5xl">
          Sign In
        </div>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="email"
        >
          <span className="text-[15px] text-[#ffffff]">EMAIL</span>
          <input
            ref={emailInput}
            id="email"
            disabled={loading}
            type="text"
            placeholder="Example@domain.com"
            className="outstl w-full rounded-3xl border-0 bg-[#ffffff] px-6 py-3 text-lg outline-purple-400"
          />
        </label>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="password"
        >
          <span className="text-[15px] text-[#ffffff]">PASSWORD</span>
          <input
            ref={passwordInput}
            disabled={loading}
            id="password"
            type="password"
            placeholder="Your Password"
            className="outstl w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-purple-400"
          />
        </label>
        <button
          onClick={() => handleSignIn()}
          disabled={loading}
          type="button"
          className={cn(
            "mt-4 w-full rounded-3xl bg-purple-400 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-purple-500",
            loading && "hover:cursor-not-allowed",
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : (
            "Sign In"
          )}
        </button>
        <div className="mt-2 flex w-full max-w-[400px] flex-col-reverse justify-between gap-2 min-[380px]:flex-row min-[380px]:gap-0">
          <div className="checkbox-wrapper-21">
            <label
              className={cn(
                "control control--checkbox font-medium text-[#ffffff] transition-all duration-200 hover:text-purple-200",
                check && "text-purple-400 hover:text-purple-400",
              )}
            >
              Remember Me
              <input
                type="checkbox"
                disabled={loading}
                onChange={() => {
                  setCheck((prev) => !prev);
                }}
              />
              <div className="control__indicator"></div>
            </label>
          </div>

          <span
            className="mt-[2px] font-medium text-purple-200 transition-colors duration-200 hover:cursor-pointer hover:text-purple-400"
            onClick={() => {
              if (!loading) {
                ChangeUrl("./reset-password");
              }
            }}
          >
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
