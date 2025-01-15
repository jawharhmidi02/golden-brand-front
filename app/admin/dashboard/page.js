"use client";

import "./page.css";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { cn, formattedDate } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashSearch from "@/components/DashSearch/DashSearch";

const page = () => {
  const [orderState, setOrderState] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [pages, setPages] = useState([]);
  const [selectedSort, setSelectedSort] = useState("created_At");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [searchQuery, setSearchQuery] = useState("");
  const maxVisiblePages = 3;

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/order?${searchQuery ? `search=${searchQuery}&` : ""}state=${orderState}&sort=${selectedSort}&order=${sortDirection}&page=${CurrentPage}&limit=${limit}`,
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

      setOrders(data.data.data);
      setTotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPages);
      setCurrentPage(Number(data.data.currentPage));

      setLoadingOrders(false);
    } catch (error) {
      console.error(error);
      setLoadingOrders(false);
      toast({
        title: "Failed",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  };

  const changeSortOrder = (sort) => {
    if (selectedSort === sort) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSelectedSort(sort);
      setSortDirection("ASC");
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

  const parseButton = (state) => {
    if (state === "Waiting to get Accepted...")
      return (
        <button className="w-[100px] rounded-md bg-blue-500/25 py-1.5 font-medium text-blue-500">
          {state}
        </button>
      );
    if (state === "Accepted")
      return (
        <button className="w-[100px] rounded-md bg-green-500/25 py-1.5 font-medium text-green-500">
          {state}
        </button>
      );
    if (state === "Cancelled")
      return (
        <button className="w-[100px] rounded-md bg-red-500/25 py-1.5 font-medium text-red-500">
          {state}
        </button>
      );
  };

  useEffect(() => {
    fetchOrders();
    createPageNumbers();
  }, [
    CurrentPage,
    totalPages,
    searchQuery,
    selectedSort,
    sortDirection,
    orderState,
  ]);

  return (
    <div className="table-scroll flex w-full flex-col gap-10 overflow-x-auto px-5 pb-10 pt-5 md:pt-8 lg:pt-10">
      {loadingOrders && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <DashSearch placeholder="Search Order" setSearchQuery={setSearchQuery} />
      <div className="flex w-full max-w-[800px] items-center justify-between gap-4 overflow-x-auto rounded-lg bg-[var(--dash-theme2)] px-1 py-2 sm:gap-1">
        <div
          onClick={() => setOrderState("")}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === "" && "bg-gray-500/50",
          )}
        >
          All Orders
        </div>
        <div
          onClick={() => setOrderState("Accepted")}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === "Accepted" && "bg-gray-500/50",
          )}
        >
          Accepted
        </div>
        <div
          onClick={() => setOrderState("Waiting to get Accepted...")}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === "Waiting to get Accepted..." && "bg-gray-500/50",
          )}
        >
          Waiting to get Accepted...
        </div>
        <div
          onClick={() => setOrderState("Cancelled")}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === "Cancelled" && "bg-gray-500/50",
          )}
        >
          Cancelled
        </div>
      </div>

      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="border-[#2c2d33] hover:bg-muted/10">
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              ID
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("state")}
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <div>State</div>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("order_Products")}
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <div>Products</div>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("total_Price")}
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <div>Price</div>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="w-full text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("created_At")}
                className="flex w-full items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <div>Created At</div>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("first_name")}
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <div>First Name</div>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("last_name")}
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <div>Last Name</div>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              Phone
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              Address
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow
              onClick={() => window.open(`/admin/dashboard/${order.id}`)}
              key={index}
              className="border-[#2c2d33] text-white hover:cursor-pointer hover:bg-muted/10"
            >
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell className="font-medium">
                {parseButton(order.state)}
              </TableCell>
              <TableCell className="text-center font-medium">
                {order.order_Products?.length}
              </TableCell>
              <TableCell className="text-center text-lg font-bold text-neutral-200">
                {order.order_Products?.reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0,
                ) +
                  order.deliveryPrice +
                  "QR"}
              </TableCell>
              <TableCell className="font-medium">
                {order.created_At && formattedDate(order.created_At)}
              </TableCell>
              <TableCell className="font-medium">{order.first_name}</TableCell>
              <TableCell className="font-medium">{order.last_name}</TableCell>
              <TableCell className="font-medium">{order.phone}</TableCell>
              <TableCell className="font-medium">{order.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <PaginationComp /> */}
      {!loadingOrders && orders.length > 0 && (
        <Pagination>
          <PaginationContent className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  "rounded-md border-0 bg-[var(--dash-theme2)] px-3 py-2 font-semibold text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer",
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
                    className="rounded-md border-0 bg-[var(--dash-theme2)] px-3 py-2 text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {pages[0] > 2 && <PaginationEllipsis>...</PaginationEllipsis>}
              </>
            )}

            {/* Page Numbers */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={cn(
                    "rounded-md border-0 px-3 py-2 transition-all duration-200 hover:cursor-pointer",
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
                  <PaginationEllipsis>...</PaginationEllipsis>
                )}
                <PaginationItem>
                  <PaginationLink
                    className="rounded-md border-0 bg-[var(--dash-theme2)] px-3 py-2 text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
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
                  "rounded-md border-0 bg-[var(--dash-theme2)] px-3 py-2 font-semibold text-[var(--dash-theme6)] transition-all duration-200 hover:cursor-pointer",
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
