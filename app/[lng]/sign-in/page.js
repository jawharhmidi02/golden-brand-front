"use client";

import "./page.css";

import { useEffect, useTransition, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import Cookies from "js-cookie"

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const login = async () => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
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
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data");
        console.log(data);

        if (data.data === null) {
          toast({
            title: "Not Found",
            description: "Invalid credentials, Check your Details!",
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
          title: "Success",
          description: "You have successfully logged in.",
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
      console.log(error);

      setLoading(false);

      toast({
        title: "Error",
        description: "An error occurred while logging in.",
        variant: "destructive",
        duration: 2500,
      });

      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="mx-auto mt-10 flex h-full w-full items-center justify-center">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}
      <div
        className={cn(
          "mx-4 grid h-[900px] w-full max-w-[580px] grid-cols-1 xsm:mx-10 min-[800px]:h-[500px] min-[800px]:max-w-[1200px] min-[800px]:grid-cols-2",
        )}
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-white px-8 py-10 shadow-md drop-shadow-md min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none lg:py-14 xl:py-20">
          {/* Sign In */}
          <div
            className={cn("flex flex-col items-center justify-center gap-5")}
          >
            <span className="font-lato text-xl font-semibold text-neutral-900">
              Sign In
            </span>
            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="email" className="font-lato text-sm font-bold">
                {" "}
                EMAIL
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="Example@domain.com"
                id="email"
                className="rounded-full bg-[var(--secondary)] py-3 pl-4 outline-[var(--theme2)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="password" className="font-lato text-sm font-bold">
                {" "}
                PASSWORD
              </label>
              <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                id="password"
                className="rounded-full bg-[var(--secondary)] py-3 pl-4 outline-[var(--theme2)]"
              />
            </div>

            {/* <button
              type="button"
              className="w-full max-w-[400px] rounded-full border-2 border-[#ffffff] border-[var(--theme2)] bg-[var(--theme2)] py-3 font-lato text-[#ffffff] outline-none transition-colors duration-200 hover:bg-[var(--hover-theme2)] hover:text-[var(--theme2)]"
            >
              Sign In
            </button> */}
            <button
              type="button"
              onClick={() => {
                login();
              }}
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
                "Sign In"
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
                  Remember Me
                  <input
                    type="checkbox"
                    onChange={() => {
                      setCheck(!check);
                    }}
                  />
                  <div className="control__indicator"></div>
                </label>
              </div>

              <span
                className="mt-[2px] font-lato font-semibold text-neutral-500 transition-colors duration-200 hover:cursor-pointer hover:text-neutral-700"
                onClick={() => {
                  ChangeUrl("./reset-password");
                }}
              >
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
        <AccountDecoration
          welcomeText="Welcome Back!"
          accountText="Don't have an account?"
          signText="Sign Up"
          url="./sign-up"
          ChangeUrl={(url) => {
            ChangeUrl(url);
          }}
        />
      </div>
    </div>
  );
};

export default page;
