"use client";

import { useContext, useRef, useState } from "react";
import Cookies from "js-cookie";
import { cn, validateEmail } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AdminAuthContext } from "@/contexts/AuthContext";

const page = () => {
  const { adminData, setAdminData } = useContext(AdminAuthContext);
  const [loadingUser, setLoadingUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const emailRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const currentPasswordEmailRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const saveEmail = async () => {
    if (
      !emailRef.current.value.trim() ||
      !validateEmail(emailRef.current.value)
    ) {
      toast({
        title: "Error",
        description: "Please enter a valid email",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (!currentPasswordEmailRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    toast({
      title: "Loading",
      description: "Please wait a moment",
    });
    try {
      setLoadingUser(true);
      const body = {
        email: emailRef.current.value.trim(),
        current_password: currentPasswordEmailRef.current.value.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${adminData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.data == null) {
        if (data.message === "Email already exists") {
          toast({
            title: "Error",
            description: "This email is already in use",
            variant: "destructive",
            duration: 2500,
          });
          emailRef.current.value = brand.name;
          return;
        }
        if (data.message === "Invalid password") {
          toast({
            title: "Error",
            description: "Invalid password",
            variant: "destructive",
            duration: 2500,
          });
          setLoadingUser(false);
          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "Success",
        description: "Email changed successfully",
        variant: "success",
        duration: 2000,
      });
      setAdminData(data.data);
      setLoadingUser(false);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "Error",
        description: "An error occurred while changing the email",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const savePassword = async () => {
    if (!currentPasswordRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (!newPasswordRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (!confirmNewPasswordRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please confirm your new password",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (
      newPasswordRef.current.value.trim() !==
      confirmNewPasswordRef.current.value.trim()
    ) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    toast({
      title: "Loading",
      description: "Please wait a moment",
    });
    try {
      setLoadingUser(true);
      const body = {
        password: newPasswordRef.current.value.trim(),
        current_password: currentPasswordRef.current.value.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${adminData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.data == null) {
        if (data.message === "Invalid password") {
          toast({
            title: "Error",
            description: "Invalid password",
            variant: "destructive",
            duration: 2500,
          });
          setLoadingUser(false);
          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "Success",
        description: "Password changed successfully",
        variant: "success",
        duration: 2000,
      });
      currentPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmNewPasswordRef.current.value = "";
      setLoadingUser(false);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "Error",
        description: "An error occurred while changing the password",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const forgetPassword = async () => {
    toast({
      title: "Loading",
      description: "Please wait a moment",
    });
    try {
      setLoadingUser(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/recoverpass/${adminData.email}`,
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
            title: "Error",
            description: "Email not found",
            variant: "destructive",
          });
          setLoadingUser(false);
          return;
        }
        throw new Error(responseData.message || "An error occurred");
      }
      toast({
        title: "Success",
        description: "Email sent successfully! Check your inbox!",
        variant: "success",
      });
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "Error",
        description: "An error occurred. Please try again",
        variant: "destructive",
      });
    }
    setLoadingUser(false);
  };

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pt-8 lg:pt-10">
      {loadingUser && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        Account Settings
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Email Address
          </div>
          <input
            defaultValue={adminData.email}
            ref={emailRef}
            disabled={!isEditing}
            type="email"
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="Email Address"
          />
        </div>
        {isEditing && (
          <div className="flex w-full flex-col gap-2">
            <div className="text-lg font-medium text-[var(--dash-theme5)]">
              Current Password
            </div>
            <input
              ref={currentPasswordEmailRef}
              disabled={!isEditing}
              type="password"
              className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
              placeholder="Current Password"
            />
          </div>
        )}

        <button
          onClick={() => {
            if (isEditing) saveEmail();
            if (!isEditing) setIsEditing(true);
          }}
          disabled={loadingUser}
          type="button"
          className={cn(
            "w-[120px] border-2 bg-emerald-700 py-2.5 text-lg font-semibold text-white transition-all duration-200 hover:bg-emerald-500",
            isEditing && !loadingUser
              ? "border-emerald-500 bg-emerald-500 hover:bg-transparent hover:text-emerald-500"
              : "border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500",
          )}
        >
          {loadingUser ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : isEditing ? (
            "Save"
          ) : (
            "Edit"
          )}
        </button>

        <div className="flex w-full flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Current Password
          </div>
          <input
            ref={currentPasswordRef}
            type="password"
            className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="Current Password"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            New Password
          </div>
          <input
            ref={newPasswordRef}
            type="password"
            className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="New Password"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Confirm Password
          </div>
          <input
            ref={confirmNewPasswordRef}
            type="password"
            className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="Confirm Password"
          />
        </div>
        <div
          onClick={() => {
            forgetPassword();
          }}
          className="text-lg font-medium text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer hover:text-[var(--dash-theme6)]"
        >
          Forgot Password?
        </div>
        <button
          onClick={() => {
            savePassword();
          }}
          type="button"
          className="w-[120px] bg-emerald-700 py-2.5 text-lg font-semibold text-white transition-all duration-200 hover:bg-emerald-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default page;
