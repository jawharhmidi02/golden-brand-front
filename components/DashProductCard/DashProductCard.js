import { useState, useRef, useContext } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminAuthContext } from "@/contexts/AuthContext";

const DashProductCard = ({
  product,
  isDelete = false,
  deleteProduct = null,
  isAdd = false,
  addProduct = null,
}) => {
  const { ChangeUrl } = useContext(AdminAuthContext);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const confirmDeleteRef = useRef(null);

  const handleAddProduct = async () => {
    setLoadingProduct(true);
    if (addProduct) {
      await addProduct(product);
      setLoadingProduct(false);
    }
  };

  const handleDelete = async () => {
    setLoadingProduct(true);
    if (deleteProduct) {
      await deleteProduct(product.id);
      setLoadingProduct(false);
    }
  };

  const confirmDeletePopUp = () => {
    confirmDeleteRef.current?.click();
  };

  return (
    <div
      onClick={() => {
        if (isDelete || isAdd) return;
        ChangeUrl(`/admin/dashboard/products/${product.id}`);
      }}
      className="mx-auto flex w-full max-w-[500px] select-none flex-col overflow-hidden rounded-lg bg-[var(--dash-theme2)] shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer"
    >
      {isDelete && (
        <Dialog>
          <DialogTrigger ref={confirmDeleteRef} className="hidden" />
          <DialogContent
            closeClass="text-white"
            className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
          >
            <DialogTitle />
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="w-3/4 text-center text-3xl font-bold text-red-500">
                Warning!
              </div>
              <div className="text-medium w-3/4 text-center text-xl text-white">
                Deleting this product may deletes other data related to it!
              </div>
              <button
                onClick={() => handleDelete()}
                type="button"
                disabled={loadingProduct}
                className={cn(
                  "mt-4 w-3/4 rounded-lg bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                  loadingProduct
                    ? "opacity-50 hover:cursor-not-allowed"
                    : "hover:bg-red-500",
                )}
              >
                {loadingProduct ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : (
                  "I'm sure!"
                )}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div className="relative overflow-hidden">
        <img
          src={product.img}
          alt="Product Image"
          className="h-48 w-full object-cover transition-all duration-200 hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-lg font-bold text-neutral-200">{product.name}</h2>
        <p className="mt-2 text-sm text-neutral-400">
          {product.description[0]}
        </p>
        <p className="mt-2 text-sm font-semibold text-white">
          {product.productsVariants.reduce(
            (acc, productVariant) => acc + productVariant.orderProducts.length,
            0,
          )}{" "}
          Boughts
        </p>
        <p className="mb-2 text-sm font-semibold text-white">
          {product.productsVariants.length} Variants
        </p>

        <div
          className={cn("mt-auto flex items-center", {
            "justify-between": isDelete || isAdd,
          })}
        >
          <div>
            <span className="text-xl font-bold text-[var(--dash-theme5)]">
              ~{product.productsVariants[0]?.price}
              <font className="text-[15px]"> QR</font>
            </span>
          </div>
          {isDelete && (
            <button
              onClick={() => confirmDeletePopUp()}
              type="button"
              disabled={loadingProduct}
              className={cn(
                "mt-2 rounded-lg border-2 border-red-500 bg-red-500 px-3 py-1 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:text-red-500",
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
                "Delete"
              )}
            </button>
          )}
        </div>
        {isAdd && (
          <button
            disabled={loadingProduct}
            onClick={() => {
              handleAddProduct();
            }}
            type="button"
            className={cn(
              "mt-2 rounded-lg bg-[var(--dash-theme6)] px-3 py-1 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-[var(--dash-theme5)]",
              loadingProduct && "hover:cursor-not-allowed",
            )}
          >
            {loadingProduct ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashProductCard;
