import "./FeaturedProducts.css";

import { useContext, useState, useEffect } from "react";
import Image from "next/image";

import { UserAuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FeaturedProducts = () => {
  const tCommon = useTranslations("common");
  const tFeaturedProducts = useTranslations("featuredProducts");
  const { ChangeUrl, Link } = useContext(UserAuthContext);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitProducts, setLimitProducts] = useState(8);
  const [selectedType, setselectedType] = useState("mostpopular");

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      let sortBy = "";
      let sort_order = "";
      if (selectedType === "mostpopular") {
        sortBy = "orderProducts";
        sort_order = "desc";
      } else if (selectedType === "newest") {
        sortBy = "date";
        sort_order = "desc";
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?${sortBy ? `sortBy=${sortBy}&` : ""}${sort_order ? `sortOrder=${sort_order}&` : ""}page=1&limit=${limitProducts}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setProducts(data.data.data);
      setLoadingProducts(false);
    } catch (error) {
      console.error(error);
      toast({
        title: tCommon("titles.error"),
        description: `${tCommon("messages.error.generic")},${tCommon("messages.error.tryAgain")}`,
        variant: "destructive",
      });

      setLoadingProducts(false);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedType]);

  return (
    <div className="featured-product flex flex-col items-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-y-4 px-5 lg:flex-row lg:justify-between">
        <div className="text-2xl font-semibold lg:text-3xl">
          {tFeaturedProducts("title")}
        </div>
        <div className="flex flex-row justify-between gap-6">
          <div
            className={
              selectedType === "newest"
                ? "featured-product-link active scale-105 text-xl font-medium text-black transition-all duration-500 hover:cursor-pointer hover:text-black"
                : "featured-product-link text-xl font-medium text-neutral-400 transition-all duration-500 hover:scale-105 hover:cursor-pointer hover:text-black"
            }
            onClick={() => {
              setselectedType("newest");
            }}
          >
            {tFeaturedProducts("newest")}
          </div>
          <div
            className={
              selectedType === "mostpopular"
                ? "featured-product-link active scale-105 text-xl font-medium text-black transition-all duration-500 hover:cursor-pointer hover:text-black"
                : "featured-product-link text-xl font-medium text-neutral-400 transition-all duration-500 hover:scale-105 hover:cursor-pointer hover:text-black"
            }
            onClick={() => {
              setselectedType("mostpopular");
            }}
          >
            {tFeaturedProducts("mostPopular")}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "mx-3 mt-3 grid max-w-[1200px] grid-cols-2 delay-0 sm:grid-cols-3 lg:grid-cols-5",
          loadingProducts ? "animate-fadeoutdown" : "animate-fadeinup",
        )}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-y-2 border-[1px] border-neutral-200 p-4 transition-all duration-300"
          >
            <Image
              src={product.img}
              height={80}
              width={80}
              alt="product"
              className="w-[70%]"
            />
            <div className="flex flex-col items-center gap-y-1">
              <div className="text-center text-sm font-semibold">
                {product.name}
              </div>
              <Link
                className="text-center text-sm text-neutral-400 transition-all duration-200 hover:cursor-pointer hover:text-neutral-700"
                onClick={() => {
                  ChangeUrl(
                    `/products?selectedCategories=${encodeURIComponent(
                      JSON.stringify({ [product.category.name]: true }),
                    )}`,
                  );
                }}
                href={`/products?selectedCategories=${encodeURIComponent(
                  JSON.stringify({ [product.category.name]: true }),
                )}`}
              >
                {product.category.name}
              </Link>
            </div>
            <div className="mt-auto w-full font-semibold text-[var(--theme)]">
              ~ {product.productsVariants[0].price} {tCommon("currency")}
            </div>
            <div className="flex w-full flex-col items-center">
              <Link
                className={cn(
                  "open-product w-full bg-[var(--theme2)] px-4 py-1 text-white transition-all duration-300",
                  tCommon("language.lng"),
                )}
                onClick={() => ChangeUrl(`/products/${product.id}`)}
                href={`/products/${product.id}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
