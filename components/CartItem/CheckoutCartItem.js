import { useContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { UserAuthContext } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";

const CheckoutCartItem = ({ quantity, productVariantID, setTotalPrice }) => {
  const tCommon = useTranslations("common");
  const { ChangeUrl } = useContext(UserAuthContext);
  const [productVariant, setProductVariant] = useState();
  const [loadingProductVariant, setLoadingProductVariant] = useState(true);

  const fetchProductVariant = async () => {
    setLoadingProductVariant(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/productsVariants/byid/${productVariantID}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProductVariant(data.data);

      setTotalPrice((prev) => {
        const returnObject = { ...prev };
        returnObject[data.data.id] = data.data.price * quantity;
        return returnObject;
      });

      setLoadingProductVariant(false);
    } catch (error) {
      console.error(error);
      toast({
        title: tCommon("titles.error"),
        description: `${tCommon("messages.error.generic")},${tCommon("messages.error.tryAgain")}`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProductVariant();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between gap-2 px-2 py-2.5">
        <span
          className="font-lato text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-neutral-700"
          onClick={() => {
            if (!loadingProductVariant) {
              ChangeUrl(`/products/${productVariant.product.id}`);
            }
          }}
          dir="ltr"
        >
          <font className="font-bold">{`${quantity} x `}</font>
          {loadingProductVariant ? (
            <Skeleton className={"h-5 w-[150px] bg-neutral-300"} />
          ) : (
            productVariant.product.name
          )}
        </span>
        <span className="min-w-[90px] text-end font-medium text-neutral-500">
          {loadingProductVariant ? 0 : quantity * productVariant.price}{" "}
          {tCommon("currency")}
        </span>
      </div>
      <div className="border-mask h-[1px] w-full bg-zinc-200 px-2"></div>
    </div>
  );
};

export default CheckoutCartItem;
