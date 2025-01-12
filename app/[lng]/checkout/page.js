"use client";

import { useRef, useState, useContext } from "react";
import Cookies from "js-cookie";

import { toast } from "@/hooks/use-toast";
import {
  cn,
  validateEmail,
  validateNumberInput,
  formattedDate,
} from "@/lib/utils";
import { UserAuthContext } from "@/contexts/AuthContext";
import CheckoutCartItem from "@/components/CartItem/CheckoutCartItem";

const page = () => {
  const { items, ChangeUrl, userData, updateCart, checkUser } =
    useContext(UserAuthContext);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState({});
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [type, setType] = useState("not delivery");
  const [loadingOrder, setLoadingOrder] = useState(false);

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (!firstNameRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please enter your first name",
        variant: "destructive",
      });
      return;
    }
    if (!lastNameRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please enter your last name",
        variant: "destructive",
      });
      return;
    }
    if (!phoneRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    if (
      !emailRef.current.value.trim() ||
      !validateEmail(emailRef.current.value.trim())
    ) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    if (!addressRef.current.value.trim()) {
      toast({
        title: "Error",
        description: "Please enter your address",
        variant: "destructive",
      });
      return;
    }

    if (sumValues(cart) < 1) {
      toast({
        title: "Error",
        description: "Please add products to the cart",
        variant: "destructive",
      });
      return;
    }
    // please wait toast
    toast({
      title: "Please wait",
      description: "Submitting your order...",
    });

    const order = {
      first_name: firstNameRef.current.value.trim(),
      last_name: lastNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
      address: addressRef.current.value.trim(),
      deliveryPrice,
      cart: cart,
      type,
      created_At: new Date(),
    };

    try {
      setLoadingOrder(true);
      var access_token = null;
      if (Cookies.get("access_token")) {
        access_token = Cookies.get("access_token");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            access_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        },
      );

      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }
      setLoadingOrder(false);

      localStorage.setItem("cart", "{}");
      updateCart();
      checkUser();

      toast({
        title: "Order Completed",
        description: "Thank you for using our services!",
        variant: "success",
        duration: 10000,
      });

      ChangeUrl(
        `/checkout/success?productId=${data.data.id}&productDate=${data.data.created_At}`,
      );
    } catch (error) {
      setLoadingOrder(false);
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center">
      <div className="grid w-full max-w-[1300px] grid-cols-1 gap-8 px-3 xsm:px-6 sm:px-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5 pt-6">
          <div className="font-lato text-2xl font-bold text-neutral-800">
            BILLING & SHIPPING
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="first-name" className="font-lato text-lg">
                First Name <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="First Name"
                type="text"
                ref={firstNameRef}
                defaultValue={userData?.full_name?.split(" ")[0]}
                id="first-name"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="last-name" className="font-lato text-lg">
                Last Name <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="Last Name"
                type="text"
                ref={lastNameRef}
                defaultValue={
                  userData?.full_name?.split(" ").length > 1
                    ? userData?.full_name?.split(" ")[1]
                    : ""
                }
                id="last-name"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="font-lato text-lg">
              Company (optional)
            </label>
            <input
              placeholder="Example Inc."
              type="text"
              id="company"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tax-number" className="font-lato text-lg">
              Tax Number (optional)
            </label>
            <input
              placeholder="Tax Identification Number"
              type="text"
              id="tax-number"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="font-lato text-lg">
                Country <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="Country"
                type="text"
                id="country"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
                required
                defaultValue={"Qatar"}
                readOnly
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="font-lato text-lg">
                State <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="State"
                type="text"
                id="state"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
                required
                defaultValue={"Doha"}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="font-lato text-lg">
              Street / District Address <font className="text-rose-500">*</font>
            </label>
            <input
              type="text"
              ref={addressRef}
              id="address"
              defaultValue={userData?.address}
              placeholder="Street / District Address"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-lato text-lg">
              Phone <font className="text-rose-500">*</font>
            </label>
            <input
              type="tel"
              ref={phoneRef}
              onInput={() => validateNumberInput(phoneRef)}
              id="phone"
              defaultValue={userData?.phone}
              placeholder="+974 123 456 78"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-lato text-lg">
              Email <font className="text-rose-500">*</font>
            </label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              defaultValue={userData?.email}
              placeholder="Example@domain.com"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme2)]"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 bg-[#f1f1f1] p-6 shadow-sm drop-shadow-sm">
          <span className="self-center font-lato text-2xl font-bold text-neutral-800">
            YOUR ORDER
          </span>
          <div className="flex h-fit w-full flex-col justify-between gap-3 self-center bg-[#f7f7f7] p-7">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  PRODUCT
                </span>
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  SUBTOTAL
                </span>
              </div>
              <div className="h-[2px] w-full bg-neutral-200"></div>
              {Object.keys(items).map((productVariantID, index) => (
                <CheckoutCartItem
                  key={productVariantID}
                  productVariantID={productVariantID}
                  quantity={items[productVariantID]}
                  setTotalPrice={setTotalPrice}
                />
              ))}
              <div className="flex flex-row justify-between px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Subtotal
                </span>
                <span className="text-lg font-medium text-[var(--theme2)]">
                  {sumValues(totalPrice)} QR
                </span>
              </div>
              <div className="h-[2px] w-full bg-neutral-200"></div>
              <div className="flex flex-row items-center justify-between gap-5 px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Shipping
                </span>
                <div className="flex flex-col gap-4 text-right text-neutral-600">
                  <div>
                    <label htmlFor="hq" className="hover:cursor-pointer">
                      <input
                        type="radio"
                        id="hq"
                        name="shipping"
                        defaultChecked
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDeliveryPrice(0);
                            setType("not delivery");
                          }
                        }}
                        className="relative left-[2px] top-[6px] float-end accent-emerald-700 hover:cursor-pointer"
                      />
                      Receipt from the company's headquarters (QATAR){" "}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="truck" className="hover:cursor-pointer">
                      <input
                        type="radio"
                        id="truck"
                        name="shipping"
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (sumValues(totalPrice) >= 10000) {
                              setDeliveryPrice(0);
                            } else {
                              setDeliveryPrice(200);
                            }
                            setType("delivery");
                          }
                        }}
                        className="relative left-[2px] top-[6px] float-end accent-emerald-700 hover:cursor-pointer"
                      />
                      A shipping truck for several products (from{" "}
                      <font className="font-bold text-[var(--theme2)]">
                        500
                      </font>{" "}
                      to{" "}
                      <font className="font-bold text-[var(--theme2)]">
                        2000 QR
                      </font>
                      ) contact customer service after ordering for shipping
                      cost.
                    </label>
                    {sumValues(totalPrice) >= 10000 && (
                      <div className="font-lato text-sm text-neutral-400">
                        (YOU HAVE FREE DELIVERY!!!)
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-[2px] w-full bg-neutral-200"></div>
              <div className="flex flex-row items-center justify-between gap-2 px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Duration
                </span>
                <span className="text-end font-lato text-[17px] font-semibold text-[var(--theme2)]">
                  Shipping within 4-10 business days
                </span>
              </div>

              <div className="h-[2px] w-full bg-neutral-200"></div>

              <div className="flex flex-row items-center justify-between px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Total
                </span>
                <div className="flex flex-col justify-between">
                  <span className="font-lato text-2xl font-bold text-[var(--theme2)]">
                    {sumValues(totalPrice) + deliveryPrice} QR
                  </span>
                  {/* <span className="font-lato text-sm text-neutral-400">
                    (includes{" "}
                    <span className="text-[var(--theme2)]">1000 QR</span> Tax)
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-neutral-300"></div>
          <div className="text-neutral-500">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our{" "}
            <font
              onClick={() => {
                ChangeUrl("/terms-and-conditions#privacy");
              }}
              className="font-bold text-neutral-700 transition-colors duration-200 hover:cursor-pointer hover:text-[var(--theme)]"
            >
              privacy policy
            </font>
            .
          </div>

          <button
            className={cn(
              "bg-[var(--theme2)] px-2 py-3 text-lg font-semibold text-white transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)]",
              loadingOrder && "opacity-80 hover:cursor-not-allowed",
            )}
            type="button"
            disabled={loadingOrder}
            onClick={() => {
              if (loadingOrder) return;
              handleCheckout();
            }}
          >
            {loadingOrder ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              </div>
            ) : (
              "PLACE ORDER"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
