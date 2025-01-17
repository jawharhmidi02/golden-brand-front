"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "@/lib/utils";
import { useTranslations } from "next-intl";

import Cookies from "js-cookie";

import { toast } from "@/hooks/use-toast";
import { UserAuthContext } from "@/contexts/AuthContext";

import Footer from "@/components/Footer/Footer";
import FastLinks from "@/components/FastLinks/FastLinks";
import TopHeader from "@/components/topHeader/TopHeader";

export default function ClientLayout({ children }) {
  const tClientLayout = useTranslations("clientLayout");
  const router = useRouter();
  const pathname = usePathname();
  const [isUserSigned, setIsUserSigned] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [userData, setUserData] = useState({});
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState({});

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  const checkUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
        {
          method: "GET",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setUserData(data.data);
      setIsUserSigned(true);
      setLoadingUser(false);

      localStorage.setItem("cart", JSON.stringify(data.data.cart || {}));
      setItems(data.data.cart || {});
    } catch (error) {
      setIsUserSigned(false);
      setLoadingUser(false);
    }
  };

  const ChangePath = () => {
    if (isUserSigned) {
      if (pathname.includes("sign") || pathname.includes("reset")) {
        toast({
          title: tClientLayout("alerts.alreadySignedIn"),
          description: tClientLayout("alerts.redirectingToProfile"),
          variant: "warning",
          duration: 5000,
        });
        ChangeUrl("/profile");
        return;
      }
    } else {
      if (pathname.includes("profile")) {
        toast({
          title: tClientLayout("alerts.notSignedIn"),
          description: tClientLayout("alerts.pleaseSignIn"),
          variant: "warning",
          duration: 5000,
        });
        ChangeUrl("/sign-in");
        return;
      }
    }
  };

  const updateCart = async () => {
    setItems(JSON.parse(localStorage.getItem("cart") || "{}"));

    if (isUserSigned) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userData.id}`, {
          method: "PUT",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: JSON.parse(localStorage.getItem("cart")) || {},
          }),
        });
      } catch (error) {
        console.error("Error saving cart to database:", error);
      }
    }
  };

  useEffect(() => {
    if (!loadingUser) {
      ChangePath();
    }
  }, [loadingUser]);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    checkUser();
  }, []);

  if (loadingUser) {
    return (
      <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
        <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
      </div>
    );
  } else {
    if (isUserSigned) {
      if (pathname.includes("sign") || pathname.includes("reset")) {
        return (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        );
      }
    } else {
      if (pathname.includes("profile")) {
        return (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        );
      }
    }
  }

  return (
    <UserAuthContext.Provider
      value={{
        isUserSigned,
        loadingUser,
        setIsUserSigned,
        userData,
        setUserData,
        ChangeUrl,
        router,
        pathname,
        loadingPage,
        setLoadingPage,
        checkUser,
        items,
        setItems,
        updateCart,
      }}
    >
      <div>
        {loadingPage && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        )}
        <TopHeader />
        {children}
        <Footer />
        <FastLinks />
      </div>
    </UserAuthContext.Provider>
  );
}
