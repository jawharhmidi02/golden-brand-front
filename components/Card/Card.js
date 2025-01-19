import  { useContext } from "react";
import Image from "next/image";
import { UserAuthContext } from "@/contexts/AuthContext";

const Card = ({ product }) => {
  const { ChangeUrl } = useContext(UserAuthContext);

  return (
    <div
      onClick={() => {
        ChangeUrl(`/products/${product.id}`);
      }}
      className="flex flex-col justify-start gap-2 text-wrap rounded-md border-2 border-neutral-200 p-[35px] shadow-sm drop-shadow-sm transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer hover:bg-neutral-100"
    >
      <Image
        src={product.img}
        height={0}
        width={100}
        className="w-max-[400px] w-full rounded-sm"
        alt="product"
      />
      <div className="flex flex-col text-center">
        <span className="mb-3 font-lato text-xl font-extrabold text-[var(--fifth-color-primary)]">
          {product.name}
        </span>
        <span className="font-lato text-lg font-semibold text-neutral-600">
          {product.category.name}
        </span>
      </div>
    </div>
  );
};

export default Card;
