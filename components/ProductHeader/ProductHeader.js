import { useContext } from "react";
import { useTranslations } from "next-intl";

import { UserAuthContext } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const ProductHeader = ({ cat, product }) => {
  const tCommon = useTranslations("common");
  const { ChangeUrl } = useContext(UserAuthContext);

  return (
    <div className="flex flex-row gap-2 text-center">
      <div
        onClick={() => ChangeUrl("/")}
        className="self-center font-lato text-lg font-semibold text-neutral-400 transition-all duration-300 hover:cursor-pointer hover:text-neutral-500"
      >
        {tCommon("navigation.home")}
      </div>
      <i
        className={cn(
          "fa-solid self-center text-neutral-400",
          tCommon("language.lng") === "en"
            ? "fa-chevron-right"
            : "fa-chevron-left",
        )}
      ></i>
      <div
        onClick={() =>
          ChangeUrl(
            `/en/products?selectedCategories=${encodeURIComponent(
              JSON.stringify(cat),
            )}`,
          )
        }
        className="self-center font-lato text-lg font-semibold text-neutral-400 transition-all duration-300 hover:cursor-pointer hover:text-neutral-500"
      >
        {product.category.name}
      </div>
      <i
        className={cn(
          "fa-solid hidden self-center text-neutral-400 sm:block",
          tCommon("language.lng") === "en"
            ? "fa-chevron-right"
            : "fa-chevron-left",
        )}
      ></i>
      <div className="hidden self-center font-lato text-lg font-semibold text-neutral-800 sm:block">
        {product.name}
      </div>
    </div>
  );
};

export default ProductHeader;
