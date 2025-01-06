import { useContext } from "react";
import { useParams } from "next/navigation";

import { UserAuthContext } from "@/contexts/AuthContext";

const ProductHeader = ({ cat, product }) => {
  const { ChangeUrl } = useContext(UserAuthContext);
  const { lng } = useParams();

  return (
    <div className="flex flex-row gap-2 text-center">
      <div
        onClick={() => ChangeUrl("/")}
        className="self-center font-lato text-lg font-semibold text-neutral-400 transition-all duration-300 hover:cursor-pointer hover:text-neutral-500"
      >
        Home
      </div>
      <i className="fa-solid fa-chevron-right self-center text-neutral-400"></i>
      <div
        onClick={() =>
          ChangeUrl(
            `/${lng}/products?selectedCategories=${encodeURIComponent(
              JSON.stringify(cat),
            )}`,
          )
        }
        className="self-center font-lato text-lg font-semibold text-neutral-400 transition-all duration-300 hover:cursor-pointer hover:text-neutral-500"
      >
        {product.category.name}
      </div>
      <i className="fa-solid fa-chevron-right hidden self-center text-neutral-400 sm:block"></i>
      <div className="hidden self-center font-lato text-lg font-semibold text-neutral-800 sm:block">
        {product.name}
      </div>
    </div>
  );
};

export default ProductHeader;
