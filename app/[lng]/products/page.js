"use client";

import Card from "@/components/Card/Card";
import SkeletonProductCard from "@/components/Card/SkeletonProductCard";
import "./page.css";

import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import SelectInterface from "@/components/SelectInterface/SelectInterface";
import CategorieItem from "@/components/CategorieItem/CategorieItem";
import MultiRangeSlider from "@/components/multiRangeSlider/multiRangeSlider";
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import SkeletonCategorieItem from "@/components/CategorieItem/SkeletonCategorieItem";
import { UserAuthContext } from "@/contexts/AuthContext";

const ProductPage = () => {
  const { ChangeUrl } = useContext(UserAuthContext);

  function OpenFilter() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center rounded-lg bg-[var(--theme)] px-2 lg:hidden"
          >
            <i className="fa-solid fa-filter text-xl text-neutral-100"></i>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[280px] overflow-scroll">
          <SheetTitle></SheetTitle>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <span className="mb-2 text-3xl font-bold text-neutral-600">
                Filters:
              </span>
              <span className="text-xl font-semibold text-neutral-800">
                Sort
              </span>
              <SelectInterface
                placeHolder="Name: A-Z"
                changeSortOption={(sortOption) => {
                  changeSortOption(sortOption);
                }}
                values={[
                  ["date", "Date: Newest"],
                  ["nameAsc", "Name: A-Z"],
                  ["nameDesc", "Name: Z-A"],
                  // ["priceAsc", "Price: Low to High"],
                  // ["priceDesc", "Price: High to Low"],
                ]}
              />
              <span className="mt-2 text-xl font-semibold text-neutral-800">
                Price
              </span>
              <MultiRangeSlider
                min={minPrice}
                changePrice={(MIN, MAX) => changePrice(MIN, MAX)}
                max={maxPrice}
              />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <span className="text-xl font-semibold text-neutral-800">
                Categories
              </span>
              {loadingCategories
                ? Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCategorieItem key={index} />
                  ))
                : categories.map((categorie, index) => (
                    <CategorieItem
                      key={index}
                      active={selectedCategories[categorie.name]}
                      changeSelectedCategorie={(categorie) =>
                        changeSelectedCategorie(categorie)
                      }
                      item={categorie.name}
                    ></CategorieItem>
                  ))}
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <button
                type="button"
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] bg-[var(--theme)] py-2 text-xl font-semibold text-white transition-all active:scale-95"
                onClick={() => {
                  ChangeUrl(
                    `?${searchInputRef.current.value.trim() && `name=${searchInputRef.current.value.trim()}`}${sortOption && sortOption !== "nameAsc" ? `&sortOption=${sortOption}` : ``}${minPrice && minPrice !== 0 ? `&minPrice=${minPrice}` : ``}${maxPrice && maxPrice !== 50000 ? `&maxPrice=${maxPrice}` : ``}${
                      isEmpty(selectedCategories)
                        ? ""
                        : `&selectedCategories=${encodeURIComponent(
                            JSON.stringify(selectedCategories),
                          )}`
                    }`,
                    { scroll: false },
                  );
                }}
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                }}
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] py-2 text-xl font-semibold text-[var(--theme)] transition-all active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "GoldenBrand: Products";
    fetchCategories();
  }, []);

  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const maxVisiblePages = 5;
  const [pages, setPages] = useState([]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      let sortBy = "";
      let sort_order = "";
      if (sortOption) {
        if (sortOption === "date") {
          sortBy = "date";
          sort_order = "asc";
        } else if (sortOption === "nameAsc") {
          sortBy = "alpha";
          sort_order = "asc";
        } else if (sortOption === "nameDesc") {
          sortBy = "alpha";
          sort_order = "desc";
        }
        // else if (sortOption === "priceAsc") {
        //   sortBy = "price";
        //   sort_order = "asc";
        // } else if (sortOption === "priceDesc") {
        //   sortBy = "price";
        //   sort_order = "desc";
        // }
      }

      const categories = Object.keys(selectedCategories).filter(
        (key) => selectedCategories[key] === true,
      );
      const categoriesString = encodeURIComponent(categories.join(","));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?${searchInputRef.current.value.trim() && `name=${searchInputRef.current.value.trim()}`}${categoriesString && `&categories=${categoriesString}`}${sortBy && `&sortBy=${sortBy}`}${sort_order && `&sortOrder=${sort_order}`}${CurrentPage && `&page=${CurrentPage}`}${limit && `&limit=${limit}`}`,
        {
          method: "GET",
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
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
      setLoadingProducts(false);
    }
    setLoadingProducts(false);
  };

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category?page=1&limit=999`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setCategories(data.data.data);

      setLoadingCategories(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
      setLoadingCategories(false);
    }
    setLoadingCategories(false);
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
    fetchProducts();
  }, [CurrentPage]);

  useEffect(() => {
    createPageNumbers();
  }, [CurrentPage, totalPages]);

  const searchParams = useSearchParams();

  const resetFilters = () => {
    ChangeUrl("?", { scroll: false });
  };

  const cats = {};

  let selectedCategories = searchParams.get("selectedCategories")
    ? JSON.parse(decodeURIComponent(searchParams.get("selectedCategories")))
    : { ...cats };

  let sortOption = searchParams.get("sortOption") || "nameAsc";
  let minPrice = searchParams.get("minPrice") || 0;
  let maxPrice = searchParams.get("maxPrice") || 50000;

  const changeSelectedCategorie = (categorie) => {
    if (selectedCategories[categorie]) {
      delete selectedCategories[categorie];
    } else {
      selectedCategories[categorie] = true;
    }
  };

  const changeSortOption = (option) => {
    sortOption = option;
  };

  const changePrice = (MIN, MAX) => {
    minPrice = MIN;
    maxPrice = MAX;
  };

  const searchInputRef = useRef(null);

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="mx-auto mt-6 flex w-full flex-row items-center justify-center gap-20">
      <div className="mx-5 flex flex-1 flex-row justify-center gap-10 xsm:mx-8 sm:mx-10">
        <div className="hidden lg:flex">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <span className="mb-2 text-3xl font-bold text-neutral-600">
                Filters:
              </span>
              <span className="text-xl font-semibold text-neutral-800">
                Sort
              </span>
              <SelectInterface
                placeHolder="Name: A-Z"
                changeSortOption={(sortOption) => {
                  changeSortOption(sortOption);
                }}
                values={[
                  ["date", "Date: Newest"],
                  ["nameAsc", "Name: A-Z"],
                  ["nameDesc", "Name: Z-A"],
                  // ["priceAsc", "Price: Low to High"],
                  // ["priceDesc", "Price: High to Low"],
                ]}
              />
              <span className="mt-2 text-xl font-semibold text-neutral-800">
                Price
              </span>
              <MultiRangeSlider
                min={minPrice}
                changePrice={(MIN, MAX) => changePrice(MIN, MAX)}
                max={maxPrice}
              />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <span className="text-xl font-semibold text-neutral-800">
                Categories
              </span>
              {loadingCategories
                ? Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCategorieItem key={index} />
                  ))
                : categories.map((categorie, index) => (
                    <CategorieItem
                      key={index}
                      active={selectedCategories[categorie.name]}
                      changeSelectedCategorie={(categorie) =>
                        changeSelectedCategorie(categorie)
                      }
                      item={categorie.name}
                    ></CategorieItem>
                  ))}
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <button
                type="button"
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] bg-[var(--theme)] py-2 text-xl font-semibold text-white transition-all active:scale-95"
                onClick={() => {
                  ChangeUrl(
                    `?${searchInputRef.current.value.trim() && `name=${searchInputRef.current.value.trim()}`}${sortOption && sortOption !== "nameAsc" ? `&sortOption=${sortOption}` : ``}${minPrice && minPrice !== 0 ? `&minPrice=${minPrice}` : ``}${maxPrice && maxPrice !== 50000 ? `&maxPrice=${maxPrice}` : ``}${
                      isEmpty(selectedCategories)
                        ? ""
                        : `&selectedCategories=${encodeURIComponent(
                            JSON.stringify(selectedCategories),
                          )}`
                    }`,
                    { scroll: false },
                  );
                }}
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                }}
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] py-2 text-xl font-semibold text-[var(--theme)] transition-all active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="flex max-w-screen-lg flex-1 flex-col gap-4">
          {/* input interface */}
          <div className="flex min-w-full flex-row gap-1 rounded-xl border-2 border-neutral-200 py-1 pl-3 pr-3 xsm:pl-0">
            <div className="ml-2 hidden min-w-6 items-center justify-center xsm:flex">
              <i className="fa-solid fa-magnifying-glass text-neutral-400"></i>
            </div>
            <input
              type="text"
              ref={searchInputRef}
              defaultValue={searchParams.get("name") || ""}
              placeholder="Work table, Bowl sink..."
              className="min-h-full flex-1 focus:outline-none"
            ></input>
            <button
              onClick={() => {
                if (loadingProducts || loadingCategories) return;
                fetchProducts();
              }}
              className="rounded-lg bg-[var(--theme)] px-2.5 py-1 font-raleway text-lg text-neutral-100 transition-all duration-300 hover:scale-95"
            >
              <span className="hidden xsm:block">Search</span>
              <i className="fa-solid fa-magnifying-glass text-neutral-100 xsm:hidden"></i>
            </button>
            <OpenFilter />
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {loadingProducts ? (
              Array.from({ length: limit }, (_, index) => (
                <SkeletonProductCard key={index} />
              ))
            ) : products.length !== 0 ? (
              products?.map((product, index) => (
                <Card key={index} product={product} />
              ))
            ) : (
              <div className="col-span-full mt-[40px] flex w-full flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      fill="#262626"
                      className="bi bi-slash-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
                    </svg>
                  </div>
                  <div className="text-2xl font-semibold text-neutral-800">
                    Sorry! No Products Found
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <PaginationComp /> */}
          {!loadingProducts && products.length > 0 && (
            <Pagination>
              <PaginationContent className="flex items-center justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(
                      "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                      CurrentPage === 1
                        ? "hover:cursor-not-allowed"
                        : "bg-white text-black hover:bg-[var(--theme)] hover:text-white",
                    )}
                    onClick={() => handlePageChange(CurrentPage - 1)}
                    disabled={CurrentPage === 1}
                  />
                </PaginationItem>

                {pages[0] > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        className="rounded-md bg-white px-3 py-2 text-black transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {pages[0] > 2 && <PaginationEllipsis />}
                  </>
                )}

                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className={cn(
                        "duration- rounded-md px-3 py-2 transition-all hover:cursor-pointer",
                        page === CurrentPage
                          ? "bg-[var(--theme)] text-white"
                          : "bg-white text-black hover:bg-[var(--theme)] hover:text-white",
                      )}
                      isActive={page === CurrentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {pages[pages.length - 1] < totalPages && (
                  <>
                    {pages[pages.length - 1] < totalPages - 1 && (
                      <PaginationEllipsis />
                    )}
                    <PaginationItem>
                      <PaginationLink
                        className="rounded-md bg-white px-3 py-2 text-black transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    className={cn(
                      "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                      CurrentPage === totalPages
                        ? "hover:cursor-not-allowed"
                        : "bg-white text-black hover:bg-[var(--theme)] hover:text-white",
                    )}
                    onClick={() => handlePageChange(CurrentPage + 1)}
                    disabled={CurrentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      }
    >
      <ProductPage />
    </Suspense>
  );
};
export default Page;
