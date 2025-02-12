"use client";

import { useRef, useState, useEffect, Suspense, useContext } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import Cookies from "js-cookie";

import {
  cn,
  validateEmail,
  validateNumberInput,
  formattedDate,
} from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminAuthContext } from "@/contexts/AuthContext";

const UserPage = () => {
  const { ChangeUrl, Link } = useContext(AdminAuthContext);
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const [loadingUser, setLoadingUser] = useState(true);
  var menu = parseInt(searchParams.get("menu")) || 1;
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [formattedCreateAtDate, setFormattedCreateAtDate] = useState(null);
  const [role, setRole] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const deleteRef = useRef(null);

  const deletePopUp = () => {
    deleteRef.current?.click();
  };

  const handleEdit = async () => {
    if (isEditing) {
      var errorTest = false;

      if (!firstNameRef.current?.value.trim()) {
        toast({
          title: "Error",
          description: "Please enter the first name",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (!lastNameRef.current?.value.trim()) {
        toast({
          title: "Error",
          description: "Please enter the last name",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (
        !emailRef.current?.value.trim() ||
        !validateEmail(emailRef.current?.value.trim())
      ) {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (!phoneRef.current?.value.trim()) {
        toast({
          title: "Error",
          description: "Please enter a phone number",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (!addressRef.current?.value.trim()) {
        toast({
          title: "Error",
          description: "Please enter the address",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }

      if (errorTest) {
        firstNameRef.current.value =user.full_name?.split(" ")[0];
        lastNameRef.current.value =
          user.full_name?.split(" ").length > 1
            ? user.full_name?.split(" ")[1]
            : "";
        emailRef.current.value =user.email;
        phoneRef.current.value =user.phone;
        addressRef.current.value =user.address;
        setSelectedCity(user.city);
        setIsEditing(false);
        return;
      }

      const body = {
        full_name: `${firstNameRef.current?.value.trim()} ${lastNameRef.current?.value.trim()}`,
        email: emailRef.current?.value.trim(),
        phone: phoneRef.current?.value.trim(),
        address: addressRef.current?.value.trim(),
        city: selectedCity,
      };
      if (role !== user.role) {
        body.role = role;
      }

      try {
        setLoadingUser(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${id}`,
          {
            method: "PUT",
            headers: {
              admin_access_token: Cookies.get("admin_access_token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );
        const data = await response.json();
        if (data.data == null) {
          if (data.message === "Email already exists") {
            setLoadingUser(false);
            toast({
              title: "Error",
              description:
                "The email address is already in use. Please use another email!",
              variant: "destructive",
              duration: 2500,
            });
            emailRef.current.value =user.email;
            return;
          }
          throw new Error(data.message);
        }
        if (data.message === "User updated successfully") {
          toast({
            title: "Success",
            description: "Data has been saved successfully",
            variant: "success",
            duration: 2000,
          });
        }
        setLoadingUser(false);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occurred while saving data",
          variant: "destructive",
          duration: 2000,
        });
        setLoadingUser(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    deletePopUp();
    try {
      setLoadingUser(true);
      toast({
        title: "Deleting Data",
        description: "Please wait...",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${id}`,
        {
          method: "DELETE",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "Success",
        description: "Data has been successfully deleted",
        variant: "success",
      });
      ChangeUrl("/admin/dashboard/users");
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "Error",
        description: "An error occurred while deleting data",
        variant: "destructive",
        duration: 8000,
      });
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/byid/${id}`,
        {
          method: "GET",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setUser(data.data);
      setRole(data.data.role);
      setSelectedCity(data.data.city);
      setFormattedCreateAtDate(formattedDate(data.data.created_At));
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "Error",
        description: "An error occurred while fetching data",
        variant: "destructive",
        duration: 8000,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:pt-8 lg:pt-10">
      {loadingUser && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        Client Details
      </div>
      <div className="flex w-full max-w-[600px] flex-col rounded-lg bg-[var(--dash-theme2)] shadow-lg min-[600px]:mx-4">
        <div className="flex items-center justify-center gap-6 border-b-2 border-[var(--dash-theme)]">
          <Link
            onClick={() => ChangeUrl(`/admin/dashboard/users/${id}?menu=1`)}
            href={`/admin/dashboard/users/${id}?menu=1`}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-500",
              menu === 1 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              Account
            </span>
          </Link>
          <Link
            onClick={() => ChangeUrl(`/admin/dashboard/users/${id}?menu=2`)}
            href={`/admin/dashboard/users/${id}?menu=2`}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-500",
              menu === 2 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              Orders
            </span>
          </Link>
        </div>

        {menu === 1 && (
          <div className="flex w-full flex-col items-center gap-4 px-4 py-6 min-[600px]:px-8">
            <div className="flex w-full flex-col gap-2">
              <div className="mb-4 text-2xl font-semibold text-white">
                Personal Details
              </div>
              <div className="flex w-full flex-col gap-2 min-[550px]:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                    First Name
                  </div>
                  <input
                    defaultValue={user.full_name?.split(" ")[0]}
                    ref={firstNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder="First Name"
                    className={cn(
                      "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                      !isEditing
                        ? "hover:cursor-default"
                        : "focus:outline-[var(--dash-theme5)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                    Last Name
                  </div>
                  <input
                    defaultValue={
                      user.full_name?.split(" ").length > 1
                        ? user.full_name?.split(" ")[1]
                        : ""
                    }
                    ref={lastNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder="Last Name"
                    className={cn(
                      "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                      !isEditing
                        ? "hover:cursor-default"
                        : "focus:outline-[var(--dash-theme5)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Email
                </div>
                <input
                  defaultValue={user.email}
                  ref={emailRef}
                  readOnly={!isEditing}
                  type="email"
                  placeholder="Email"
                  className={cn(
                    "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                    !isEditing
                      ? "hover:cursor-default"
                      : "focus:outline-[var(--dash-theme5)]",
                  )}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Phone Number
                </div>
                <input
                  ref={phoneRef}
                  defaultValue={user.phone}
                  readOnly={!isEditing}
                  type="tel"
                  placeholder="Phone Number"
                  className={cn(
                    "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                    !isEditing
                      ? "hover:cursor-default"
                      : "focus:outline-[var(--dash-theme5)]",
                  )}
                  disabled={!isEditing}
                  onInput={() => validateNumberInput(phoneRef)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Address Location
                </div>
                <input
                  ref={addressRef}
                  defaultValue={user.address}
                  readOnly={!isEditing}
                  type="text"
                  placeholder="Address Location"
                  className={cn(
                    "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                    !isEditing
                      ? "hover:cursor-default"
                      : "focus:outline-[var(--dash-theme5)]",
                  )}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Created At
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={formattedCreateAtDate}
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Role
                </div>

                <Select
                  onValueChange={setRole}
                  value={role}
                  className={cn(
                    "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                      !isEditing
                        ? "hover:cursor-default"
                        : "focus:outline-[var(--dash-theme5)]",
                    )}
                  >
                    <SelectValue placeholder="Pick a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        { value: "admin", text: "Admin" },
                        { value: "client", text: "Client" },
                      ].map((role, index) => (
                        <SelectItem
                          className="transition-colors duration-150 hover:cursor-pointer focus:bg-zinc-200"
                          key={index}
                          value={role.value}
                        >
                          {role.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={() => handleEdit()}
                type="button"
                className={cn(
                  "mt-4 w-full max-w-[227px] self-start border-2 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent",
                  isEditing
                    ? "border-emerald-500 bg-emerald-500 hover:text-emerald-500"
                    : "border-blue-500 bg-blue-500 hover:text-blue-500",
                )}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        )}

        {menu === 2 && (
          <div className="flex w-full flex-col items-center gap-6 px-4 py-6 min-[600px]:px-8">
            <div className="w-full text-2xl font-semibold text-white">
              Client Orders
            </div>
            {user.orders?.length > 0 ? (
              <div className="flex w-full flex-col gap-6">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="w-full rounded-lg bg-[var(--dash-theme)] p-6 shadow-lg"
                  >
                    <div className="mb-4 flex flex-col">
                      <div className="text-lg font-semibold text-white">
                        Order ID: {order.id}
                      </div>
                      <div className="text-sm text-neutral-300">
                        State: {order.state}
                      </div>
                      <div className="text-sm text-neutral-300">
                        Created At:
                        {order.created_At && formattedDate(order.created_At)}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="mb-2 text-lg font-semibold text-white">
                        Client Data
                      </div>
                      <div className="text-sm text-neutral-300">
                        Full Name: {order.first_name} {order.last_name}
                      </div>
                      <div className="text-sm text-neutral-300">
                        Phone: {order.phone}
                      </div>
                      <div className="text-sm text-neutral-300">
                        Email: {order.email}
                      </div>
                      <div className="text-sm text-neutral-300">
                        Address: {order.address}
                      </div>
                      <div className="text-sm text-neutral-300">
                        Order Type: {order.type}
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-2 text-lg font-semibold text-white">
                        Products Details
                      </div>
                      <ul className="flex flex-col gap-4">
                        {order.order_Products.map((order_Product) => (
                          <li
                            onClick={() =>
                              ChangeUrl(
                                `/products/${order_Product.ProductsVariant.product.id}`,
                              )
                            }
                            key={order_Product.id}
                            className="flex w-full items-start justify-between rounded-lg bg-cyan-100/70 p-4 shadow transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-cyan-100/90"
                          >
                            <div className="flex flex-col">
                              <div className="text-neutral-800">
                                {order_Product.ProductsVariant.product.name}
                              </div>
                              <div className="text-sm text-white">
                                Dimension:
                                {order_Product.ProductsVariant.dimension}
                              </div>
                              <div className="text-sm text-white">
                                Quantity: {order_Product.quantity}
                              </div>
                              <div className="text-sm text-white">
                                Price: {order_Product.price} QR
                              </div>
                            </div>
                            <div className="h-16 w-16">
                              <img
                                src={order_Product.ProductsVariant.product.img}
                                alt={order_Product.ProductsVariant.product.name}
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
                Client doesn't have orders yet!
              </div>
            )}
          </div>
        )}
      </div>
      {menu === 1 && (
        <div className="flex w-full max-w-[600px] flex-row gap-2 px-4 min-[600px]:px-8">
          <button
            type="button"
            onClick={() => deletePopUp()}
            className="w-[120px] bg-red-900 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      )}
      <Dialog>
        <DialogTrigger ref={deleteRef} className="hidden" />
        <DialogContent
          closeClass="text-white"
          className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
        >
          <DialogTitle />
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="w-3/4 text-center text-3xl font-bold text-red-500">
              Warning!
            </div>
            <div className="text-medium w-3/4 text-center text-xl text-white">
              Deleting this account means deleting all other data related to it!
            </div>
            <button
              onClick={() => handleDelete()}
              type="button"
              disabled={loadingUser}
              className={cn(
                "mt-4 w-3/4 rounded-lg bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500",
              )}
            >
              I'm Sure
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--dash-theme5)]" />
        </div>
      }
    >
      <UserPage />
    </Suspense>
  );
};

export default Page;
