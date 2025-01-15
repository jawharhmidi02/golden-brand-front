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
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState([]);
  const [selectedSort, setSelectedSort] = useState("created_At");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");
  const maxVisiblePages = 3;

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user?${searchQuery ? `search=${searchQuery}&` : ""}sort=${selectedSort}&order=${sortDirection}&page=${CurrentPage}&limit=${limit}`,
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

      setUsers(data.data.data);
      setTotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPages);
      setCurrentPage(Number(data.data.currentPage));

      setLoadingUsers(false);
    } catch (error) {
      console.error(error);
      setLoadingUsers(false);
      toast({
        title: "Error",
        description: "An error occurred while fetching data.",
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

  useEffect(() => {
    fetchUsers();
    createPageNumbers();
  }, [CurrentPage, totalPages, searchQuery, selectedSort, sortDirection]);

  return (
    <div className="table-scroll flex w-full flex-col gap-10 overflow-x-auto pb-10 pt-5 md:pt-8">
      {loadingUsers && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <DashSearch
        placeholder="Search for a user by name, last name, or phone number"
        setSearchQuery={setSearchQuery}
      />
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="border-[#2c2d33] hover:bg-muted/10">
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              ID
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("created_At")}
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <span>Created Date</span>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("full_name")}
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <span>Full Name</span>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              Phone Number
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              Email
            </TableHead>
            <TableHead className="text-end text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("role")}
                className="flex items-center justify-end gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <span>Role</span>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              onClick={() => window.open(`/admin/dashboard/users/${user.id}`)}
              key={index}
              className="border-[#2c2d33] text-white hover:cursor-pointer hover:bg-muted/10"
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell className="font-medium">
                {user.created_At && formattedDate(user.created_At)}
              </TableCell>
              <TableCell className="font-medium">{user.full_name}</TableCell>
              <TableCell className="font-medium">{user.phone}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="text-end font-medium">
                {user.role === "admin" ? "Admin" : "User"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!loadingUsers && users.length > 0 && (
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
