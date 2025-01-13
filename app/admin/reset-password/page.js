"use client";

import "./page.css";

import { useContext, useRef, useState } from "react";

import { cn, validateEmail } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AdminAuthContext } from "@/contexts/AuthContext";

import DashSignHeader from "@/components/DashSignHeader/DashSignHeader";

const page = () => {
  const { ChangeUrl } = useContext(AdminAuthContext);
  const emailInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (
      !emailInput.current.value.trim() ||
      !validateEmail(emailInput.current.value.trim())
    ) {
      toast({
        description: "Verify the email!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/recoverpass/${emailInput.current.value.trim()}`,
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
            title: "Failed",
            description: "Email Doesn't Exist!",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        throw new Error(responseData.message || "Error");
      }
      toast({
        title: "Done",
        description:
          "an Email has been sent successfully, please check your inbox!",
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: "Error",
        description:
          "Something wrong happened, please try again or contact us!",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="image flex min-h-[100dvh] flex-1 items-center justify-center bg-cover bg-center">
      <div className="mx-5 my-8 flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-purple-300 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <DashSignHeader />
        <div className="flex w-full max-w-[400px] flex-row items-center justify-between">
          <div
            className="group hover:cursor-pointer"
            onClick={() => {
              ChangeUrl("./sign-in");
            }}
          >
            <i className="fa-solid fa-arrow-left text-3xl text-[#ffffff] transition-colors duration-200 group-hover:text-purple-400"></i>
          </div>
          <div className="inline-block self-start bg-gradient-to-bl from-purple-300 to-purple-400 bg-clip-text pb-2 text-2xl font-semibold text-transparent sm:text-3xl">
            Password Recovery
          </div>
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
            className="outstl w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-purple-400"
          />
        </label>

        <button
          onClick={() => {
            handleSend();
          }}
          disabled={loading}
          type="button"
          className={cn(
            "mt-4 w-full rounded-3xl bg-purple-400 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-purple-500",
            {
              "cursor-not-allowed opacity-50": loading,
            },
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default page;
