"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const Category = ({
  category,
  fetchCategories = null,
  isAdd = false,
  addCategory = null,
  isDelete = false,
  deleteCategory = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const categoryRef = useRef(null);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [imageValue, setImageValue] = useState(category.img);
  const imageRef = useRef(null);
  const fileInput = useRef(null);
  const confirmDeleteRef = useRef(null);

  const handleAddCategory = async () => {
    setLoadingCategory(true);
    if (addCategory) {
      await addCategory(category.id);
      setLoadingCategory(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoadingCategory(true);
    if (deleteCategory) {
      await deleteCategory(category.id);
      setLoadingCategory(false);
    }
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(!isEditing);
      return;
    }

    if (!categoryRef.current.value.trim()) {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Choose a category please!",
        duration: 2000,
      });
      return;
    }

    if (!imageRef.current.src.trim()) {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Upload a photo please!",
        duration: 2000,
      });
      return;
    }

    try {
      setLoadingCategory(true);
      const body = {};
      body["name"] = categoryRef.current.value.trim();
      if (category.img.trim() != imageRef.current.src.trim()) {
        body["img"] = imageRef.current.src.trim();
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();
      if (data.data == null) {
        setLoadingCategory(false);
        if (data.message === "Category already exists") {
          toast({
            title: "Failed!",
            description: "Category Already exist!",
            variant: "destructive",
            duration: 2500,
          });
          categoryRef.current.value = category.name;
          setIsEditing(!isEditing);

          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "Done!",
        description: "Category updated successfully",
        variant: "success",
      });

      if (fetchCategories) fetchCategories();
      setLoadingCategory(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed!",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
      setLoadingCategory(false);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    try {
      setLoadingCategory(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category/${category.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
        },
      );
      const data = await response.json();
      if (data.data == null) {
        throw new Error(data.message);
      }
      toast({
        title: "Done!",
        description: "Category deleted successfully.",
        variant: "success",
        duration: 3000,
      });
      setLoadingCategory(false);
      if (fetchCategories) fetchCategories();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed!",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
      set;
      setLoadingCategory(false);
    }
  };

  const confirmDeletePopUp = () => {
    confirmDeleteRef.current.click();
  };

  return (
    <>
      {!(isAdd || isDelete) ? (
        <>
          <Dialog>
            <DialogTrigger className="hidden">
              <div ref={confirmDeleteRef} className="hidden"></div>
            </DialogTrigger>
            <DialogContent
              closeClass="text-white"
              className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
            >
              <DialogTitle />
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="w-3/4 text-center text-3xl font-bold text-red-500">
                  Warning
                </div>
                <div className="text-medium w-3/4 text-center text-xl text-white">
                  Deleting this brand will result in deleting all associated
                  products.
                </div>
                <button
                  onClick={() => handleDelete()}
                  disabled={loadingCategory}
                  type="button"
                  className={cn(
                    "mt-4 w-3/4 rounded-lg border-2 bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                    loadingCategory
                      ? "opacity-50 hover:cursor-not-allowed"
                      : "hover:bg-red-500",
                  )}
                >
                  {loadingCategory ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                    </div>
                  ) : (
                    "I am sure"
                  )}
                </button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger
              className="h-full w-full"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]">
                {category.name}
              </div>
            </DialogTrigger>
            <DialogContent
              closeClass="text-white"
              className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
            >
              <DialogTitle />
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="text-2xl font-semibold text-white">
                  Category Name
                </div>
                <input
                  ref={categoryRef}
                  readOnly={!isEditing}
                  defaultValue={category.name}
                  type="text"
                  placeholder="Sheglam"
                  disabled={!isEditing || loadingCategory}
                  className={cn(
                    "my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2",
                    !isEditing && loadingCategory
                      ? "hover:cursor-not-allowed"
                      : "focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]",
                  )}
                />
                <input
                  onChange={() => {
                    const file = fileInput.current.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      imageRef.current.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInput}
                  disabled={!isEditing || loadingCategory}
                />
                <img
                  onClick={() => {
                    if (isEditing && !loadingCategory) {
                      fileInput.current.click();
                    }
                  }}
                  ref={imageRef}
                  src={imageValue}
                  alt={category.name}
                  className={cn(
                    "mb-2 h-[150px] w-3/4 rounded-lg object-scale-down",
                    isEditing
                      ? "hover:cursor-pointer"
                      : "hover:cursor-not-allowed",
                  )}
                ></img>
                <div className="flex w-3/4 flex-row gap-4">
                  <button
                    onClick={() => handleEdit()}
                    type="button"
                    className={cn(
                      "w-full rounded-lg border-2 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                      isEditing && !loadingCategory
                        ? "border-emerald-500 bg-emerald-500 hover:bg-transparent hover:text-emerald-500"
                        : "border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500",
                    )}
                  >
                    {loadingCategory ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                      </div>
                    ) : isEditing ? (
                      "Save"
                    ) : (
                      "Edit"
                    )}
                  </button>
                  <button
                    onClick={() => confirmDeletePopUp()}
                    type="button"
                    disabled={loadingCategory}
                    className="w-full rounded-lg border-2 border-red-500 bg-red-500 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-[var(--dash-theme2)] transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]">
          <div className="flex w-full items-center justify-center px-4 pb-1 pt-4 text-center text-2xl font-semibold text-neutral-300">
            {category.name}
          </div>
          <p className="flex w-full flex-col items-center justify-center gap-3 px-2 pb-4 text-center text-sm font-semibold text-neutral-400">
            {category.products.length} products
            {(isAdd || isDelete) && (
              <button
                disabled={loadingCategory}
                onClick={() => {
                  if (isAdd) handleAddCategory();
                  if (isDelete) handleDeleteCategory();
                }}
                type="button"
                className={cn(
                  "self-center rounded-lg bg-[var(--dash-theme6)] px-3 py-1 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-[var(--dash-theme5)]",
                  {
                    "hover:cursor-not-allowed": loadingCategory,
                    "bg-red-900 hover:bg-red-500": isDelete,
                    "bg-emerald-700 hover:bg-emerald-500": isAdd,
                  },
                )}
              >
                {loadingCategory ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : isAdd && !isDelete ? (
                  "Add Brand"
                ) : (
                  "Delete Brand"
                )}
              </button>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Category;
