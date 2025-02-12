import { useContext, useEffect, useState } from "react";
import Image from "next/image";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DashProductCard from "@/components/DashProductCard/DashProductCard";
import DashSearch from "@/components/DashSearch/DashSearch";
import SkeletonDashProductCard from "@/components/DashProductCard/SkeletonDashProductCard";

const DashSimilarProducts = ({
  similarProducts,
  setSimilarProducts,
  addProduct,
  removeSimilarProduct,
  productID = "",
}) => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [pages, setPages] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const maxVisiblePages = 3;

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);

      var ignoredProducts = similarProducts.map((item) => item.id).join(",");
      if (productID) {
        if (ignoredProducts) {
          ignoredProducts += `,${productID}`;
        } else {
          ignoredProducts = productID;
        }
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product?${searchState ? `name=${searchState.trim()}&` : ``}${ignoredProducts ? `ignoredProducts=${ignoredProducts}&` : ``}page=${CurrentPage}&limit=${limit}`,
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

  const handleRemove = async (product) => {
    setLoadingProduct(true);
    if (removeSimilarProduct) {
      await removeSimilarProduct(product);
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    createPageNumbers();
  }, [totalPages]);

  useEffect(() => {
    fetchProducts();
    createPageNumbers();
  }, [CurrentPage, similarProducts, searchState]);

  return (
    <div className="flex flex-col gap-6">
      <div className="mt-6 py-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10">
            <span className="block text-center text-sm font-medium text-gray-500">
              Explore other Products
            </span>
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <div className="h-[2px] w-8 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
              <h2 className="text-center text-4xl font-bold text-[var(--dash-theme5)]">
                SIMILAR PRODUCTS
              </h2>
              <div className="h-[2px] w-8 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <Carousel
            className="mx-auto max-w-screen-xl px-2"
            opts={{ loop: true }}
          >
            <CarouselContent dir="ltr" className="mx-2 flex-1">
              {similarProducts.map((similarProduct, index) => (
                <CarouselItem
                  key={index}
                  className="flex basis-full p-0 pl-0 sm:basis-1/2 md:basis-full lg:basis-1/2 xl:basis-1/3"
                >
                  <div className="my-1 flex w-full flex-col items-center gap-y-2 border-[1px] border-neutral-200 p-4 transition-all duration-300">
                    <Image
                      src={similarProduct.img}
                      height={80}
                      width={80}
                      alt="product"
                      className="w-[70%]"
                    />
                    <div className="flex flex-col items-center gap-y-1">
                      <div className="text-center text-sm font-semibold">
                        {similarProduct.name}
                      </div>
                      <div
                        className="text-center text-sm text-neutral-400 transition-all duration-200 hover:cursor-pointer hover:text-neutral-700"
                        onClick={() => {
                          var cats = {};
                          cats[similarProduct.category.name] = true;
                        }}
                      >
                        {similarProduct.category.name}
                      </div>
                    </div>
                    <div className="mt-auto w-full font-semibold text-[var(--theme)]">
                      ~ {similarProduct.productsVariants[0].price} QR
                    </div>
                    <div className="flex w-full flex-col items-center">
                      <button
                        onClick={() => handleRemove(similarProduct)}
                        type="button"
                        disabled={loadingProduct}
                        className={cn(
                          "mt-2 w-full rounded-lg border-2 border-red-500 bg-red-500 px-3 py-1 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:text-red-500",
                          loadingProduct
                            ? "hover:cursor-not-allowed"
                            : "hover:bg-transparent",
                        )}
                      >
                        {loadingProduct ? (
                          <div className="flex items-center justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                          </div>
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 border-0 text-3xl text-black shadow-lg" />
            <CarouselNext className="right-4 border-0 text-3xl text-black shadow-lg" />
          </Carousel>
        )}
      </div>
      <div className="flex w-full flex-col gap-10 pb-10 pt-5 md:pt-8 lg:pt-10">
        <DashSearch
          placeholder="EXAMPLE: GARBAGE BIN, WORK TABLE WITH UNDERSHELF..."
          setSearchQuery={setSearchState}
        />

        <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loadingProducts
            ? Array.from({ length: limit }).map((_, index) => (
                <SkeletonDashProductCard key={index} />
              ))
            : products
                .filter(
                  (product) =>
                    !similarProducts.some(
                      (similarProduct) => similarProduct.id === product.id,
                    ) && productID !== product.id,
                )
                .map((product, index) => (
                  <DashProductCard
                    key={index}
                    product={product}
                    isAdd={true}
                    addProduct={addProduct}
                  />
                ))}
        </div>
        {!loadingProducts && products.length > 0 && (
          <Pagination className={"overflow-auto"}>
            <PaginationContent className="flex items-center justify-center gap-1">
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
    </div>
  );
};

export default DashSimilarProducts;
