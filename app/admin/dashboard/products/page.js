"use client";

import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { toast } from "@/hooks/use-toast";
import { AdminAuthContext } from "@/contexts/AuthContext";

import DashProductCard from "@/components/DashProductCard/DashProductCard";
import DashSearch from "@/components/DashSearch/DashSearch";
import SkeletonDashProductCard from "@/components/DashProductCard/SkeletonDashProductCard";

const page = () => {
  const { ChangeUrl } = useContext(AdminAuthContext);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (search = null) => {
    try {
      setLoadingProducts(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product?${search ? `name=${search.trim()}&` : ``}page=1&limit=999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProducts(data.data.data);
      console.log("data");
      console.log(data);

      setLoadingProducts(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed!",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });

      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex w-full flex-col gap-10 px-5 pb-10 pt-5 md:pt-8 lg:pt-10">
      <DashSearch
        placeholder="Example: S. STEEL GARBAGE BIN, S. STEEL WORK TABLE WITH UNDERSHELF..."
        search={fetchProducts}
      />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* ADD PRODUCT */}
        <div
          onClick={() => {
            ChangeUrl("/admin/dashboard/products/add");
          }}
          className="flex min-h-[300px] items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]"
        >
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
              <div className="mb-1">+</div>
            </div>
            <div className="text-center text-xl font-semibold text-neutral-300">
              Add New Product
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        {loadingProducts
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonDashProductCard key={index} />
            ))
          : products.map((product, index) => (
              <DashProductCard key={index} product={product} />
            ))}
      </div>
    </div>
  );
};

export default page;
