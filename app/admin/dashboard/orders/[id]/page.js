"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import { toast } from "@/hooks/use-toast";
import { cn, formattedDate } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminAuthContext } from "@/contexts/AuthContext";

const page = () => {
  const { ChangeUrl, Link } = useContext(AdminAuthContext);
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const [loadingOrder, setLoadingOrder] = useState(true);
  var menu = parseInt(searchParams.get("menu")) || 1;
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const deleteRef = useRef(null);

  const deletePopUp = () => {
    deleteRef.current?.click();
  };

  const handleEdit = async () => {
    if (isEditing) {
      if (selectedState === "") {
        toast({
          title: "Failed!",
          description: "you need to pick a state!",
          variant: "destructive",
          duration: 2000,
        });
        setIsEditing(false);
        setSelectedState(order.state);
        return;
      }

      const body = {
        state: selectedState,
      };

      try {
        setLoadingOrder(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admins/order/${id}`,
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
          throw new Error(data.message);
        }

        toast({
          title: "Done",
          description: "Data saved successfully!",
          variant: "success",
          duration: 2000,
        });
        setLoadingOrder(false);
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed!",
          description: "Something went wrong, please try again!",
          variant: "destructive",
          duration: 2000,
        });
        setLoadingOrder(false);
      }
    } else {
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    deletePopUp();
    try {
      setLoadingOrder(true);
      toast({
        title: "Deleting data now",
        description: "please wait...",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/order/${id}`,
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
        title: "Done ",
        description: "Order deleted successfully",
        variant: "success",
        duration: 2000,
      });
      ChangeUrl("/admin/dashboard/orders");
    } catch (error) {
      console.error(error);
      setLoadingOrder(false);
      toast({
        title: "Failed!",
        description:
          "Someting went wrong when deleting order, please try again!",
        variant: "destructive",
        duration: 8000,
      });
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/order/byid/${id}`,
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

      setOrder(data.data);
      setSelectedState(data.data.state);
      setLoadingOrder(false);
    } catch (error) {
      console.error(error);
      setLoadingOrder(false);
      toast({
        title: "Failed!",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:pt-8 lg:pt-10">
      {loadingOrder && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        Order Detail
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)]">
        <div className="flex items-center justify-center gap-6 border-b-[3px] border-[var(--dash-theme)]">
          <Link
            onClick={() => ChangeUrl(`/admin/dashboard/orders/${id}?menu=1`)}
            href={`/admin/dashboard/orders/${id}?menu=1`}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 1 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              Client Detail
            </span>
          </Link>
          <Link
            onClick={() => ChangeUrl(`/admin/dashboard/orders/${id}?menu=2`)}
            href={`/admin/dashboard/orders/${id}?menu=2`}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 2 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              Products
            </span>
          </Link>
        </div>
        {menu === 1 && (
          <div className="flex flex-col gap-3 px-4 py-6 sm:px-10">
            <div className="mb-2 text-3xl font-bold text-white">
              Client Detail
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <div className="flex w-full flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  First Name
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={order.first_name}
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Last Name
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={order.last_name}
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                Phone
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.phone}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                Email
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.email}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                Address
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.address}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
          </div>
        )}

        {menu === 2 && (
          <>
            <div className="flex flex-col gap-3 px-4 py-6 sm:px-10">
              <div className="mb-2 text-3xl font-bold text-white">
                Order Detail
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Order ID
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={order.id}
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Total Price
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={
                    order.order_Products &&
                    order.order_Products?.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0,
                    ) +
                      order.deliveryPrice +
                      " QR"
                  }
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Products Price
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={
                    order.order_Products &&
                    order.order_Products?.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0,
                    ) + " QR"
                  }
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  Delivery Price
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={
                    String(order.deliveryPrice) && `${order.deliveryPrice} QR`
                  }
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
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
                  defaultValue={
                    order.created_At && formattedDate(order.created_At)
                  }
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  State
                </div>

                <Select
                  onValueChange={setSelectedState}
                  value={selectedState}
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
                    <SelectValue placeholder="Pick a State..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        {
                          value: "Waiting to get Accepted...",
                          text: "Waiting to get Accepted...",
                        },
                        {
                          value: "Accepted",
                          text: "Accepted",
                        },
                        {
                          value: "Cancelled",
                          text: "Cancelled",
                        },
                      ].map((city, index) => (
                        <SelectItem
                          className="text-right transition-colors duration-150 hover:cursor-pointer focus:bg-zinc-200"
                          key={index}
                          value={city.value}
                        >
                          {city.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-2 text-3xl font-bold text-white">
                Products Details
              </div>
              {order.order_Products?.map((order_Product, index) => (
                <Link
                  onClick={() =>
                    ChangeUrl(
                      `/admin/dashboard/products/${order_Product.ProductsVariant.product.id}`,
                    )
                  }
                  href={`/admin/dashboard/products/${order_Product.ProductsVariant?.product?.id}`}
                  key={index}
                  className="flex w-full items-start justify-between rounded-lg bg-cyan-100/70 p-4 shadow transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-cyan-100/80"
                >
                  <div className="flex flex-col">
                    <div className="text-neutral-800">
                      {order_Product.ProductsVariant.product.name}
                    </div>
                    <div className="text-sm text-white">
                      dimension: {order_Product.ProductsVariant.dimension}
                    </div>
                    <div className="text-sm text-white">
                      Quantity: {order_Product.quantity}
                    </div>
                    <div className="text-sm text-white">
                      Price: {order_Product.price}QR
                    </div>
                  </div>
                  <div className="h-16 w-16">
                    <img
                      src={order_Product.ProductsVariant.product.img}
                      alt={order_Product.ProductsVariant.product.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mb-5 flex w-full max-w-[800px] flex-row gap-2 px-4 pr-4 sm:px-10 sm:pr-10">
              <button
                onClick={() => handleEdit()}
                type="button"
                className={cn(
                  "w-[120px] self-start border-2 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent",
                  isEditing
                    ? "border-emerald-500 bg-emerald-500 hover:text-emerald-500"
                    : "border-blue-500 bg-blue-500 hover:text-blue-500",
                )}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => deletePopUp()}
                type="button"
                className="w-[120px] bg-red-900 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      <Dialog>
        <DialogTrigger ref={deleteRef} className="hidden" />
        <DialogContent
          closeClass="text-white"
          className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
        >
          <DialogTitle />
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="w-3/4 text-center text-3xl font-bold text-red-500">
              Warning
            </div>
            <div className="text-medium w-3/4 text-center text-xl text-white">
              Deleting this order may delete other data related to it!
            </div>
            <button
              onClick={() => handleDelete()}
              type="button"
              className={cn(
                "mt-4 w-3/4 rounded-lg bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500",
              )}
            >
              I'm sure!
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
