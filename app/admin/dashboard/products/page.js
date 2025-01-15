"use client";

import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AdminAuthContext } from "@/contexts/AuthContext";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashProductCard from "@/components/DashProductCard/DashProductCard";
import DashSearch from "@/components/DashSearch/DashSearch";
import SkeletonDashProductCard from "@/components/DashProductCard/SkeletonDashProductCard";

const page = () => {
  const { ChangeUrl } = useContext(AdminAuthContext);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [pages, setPages] = useState([]);
  const maxVisiblePages = 3;

  const fetchProducts = async (search = null) => {
    try {
      setLoadingProducts(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product?${search ? `name=${search.trim()}&` : ``}page=${CurrentPage}&limit=${limit}`,
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
      setTotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPages);
      setCurrentPage(Number(data.data.currentPage));

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

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createPageNumbers = () => {
    let startPage = Math.max(1, CurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const newPages = [];
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  useEffect(() => {
    createPageNumbers();
  }, [totalPages]);

  useEffect(() => {
    fetchProducts();
    createPageNumbers();
  }, [CurrentPage]);

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
          ? Array.from({ length: limit }).map((_, index) => (
              <SkeletonDashProductCard key={index} />
            ))
          : products.map((product, index) => (
              <DashProductCard key={index} product={product} />
            ))}
      </div>
      {!loadingProducts && products.length > 0 && (
        <Pagination className={"overflow-auto"}>
          <PaginationContent className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  "rounded-md border-0 bg-[var(--dash-theme2)] px-1 py-1 font-semibold text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer",
                  CurrentPage === 1
                    ? "hover:cursor-not-allowed hover:bg-[var(--dash-theme2)] hover:text-[var(--dash-theme6)]"
                    : "hover:bg-[var(--dash-theme6)] hover:text-white",
                )}
                onClick={() => handlePageChange(CurrentPage - 1)}
                disabled={CurrentPage === 1}
              />
            </PaginationItem>

            {/* First Page and Ellipsis */}
            {pages[0] > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    className="rounded-md border-0 bg-[var(--dash-theme2)] px-1 py-1 text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {pages[0] > 2 && (
                  <PaginationEllipsis className={"text-white"}>
                    ...
                  </PaginationEllipsis>
                )}
              </>
            )}

            {/* Page Numbers */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={cn(
                    "rounded-md border-0 px-1 py-1 transition-all duration-200 hover:cursor-pointer",
                    page === CurrentPage
                      ? "bg-[var(--dash-theme6)] text-white hover:cursor-not-allowed hover:bg-[var(--dash-theme6)] hover:text-white"
                      : "bg-[var(--dash-theme2)] text-[var(--dash-theme6)] hover:bg-[var(--dash-theme6)] hover:text-white",
                  )}
                  isActive={page === CurrentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Last Page and Ellipsis */}
            {pages[pages.length - 1] < totalPages && (
              <>
                {pages[pages.length - 1] < totalPages - 1 && (
                  <PaginationEllipsis className={"text-white"}>
                    ...
                  </PaginationEllipsis>
                )}
                <PaginationItem>
                  <PaginationLink
                    className="rounded-md border-0 bg-[var(--dash-theme2)] px-1 py-1 text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                className={cn(
                  "rounded-md border-0 bg-[var(--dash-theme2)] px-1 py-1 font-semibold text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer",
                  CurrentPage === totalPages
                    ? "hover:cursor-not-allowed hover:bg-[var(--dash-theme2)] hover:text-[var(--dash-theme6)]"
                    : "hover:bg-[var(--dash-theme6)] hover:text-white",
                )}
                onClick={() => handlePageChange(CurrentPage + 1)}
                disabled={CurrentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default page;
