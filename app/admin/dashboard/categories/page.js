"use client";

import DashSearch from "@/components/DashSearch/DashSearch";
import { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Category from "@/components/Category/Category";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const categoryRef = useRef(null);
  const imageInput = useRef(null);
  const fileInput = useRef(null);
  const [imageValue, setImageValue] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const addDialogClose = useRef(null);

  const addCategory = async () => {
    if (!categoryRef.current.value.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a category name",
        duration: 2000,
      });
      return;
    }

    if (!imageInput.current.src.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image",
        duration: 2000,
      });
      return;
    }

    try {
      setLoadingCategory(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            name: categoryRef.current.value.trim(),
            img: imageInput.current.src.trim(),
          }),
        },
      );
      const data = await response.json();
      if (data.data == null) {
        setLoadingCategory(false);
        if (data.message === "Category already exists") {
          toast({
            title: "Error",
            description: "Category already exists",
            variant: "destructive",
            duration: 2500,
          });
          categoryRef.current.value = "";
          return;
        }
        throw new Error(data.message);
      }
      toast({
        variant: "success",
        title: "Success",
        description: "Category created successfully",
        duration: 2000,
      });
      fetchCategories();
      setLoadingCategory(false);
      addDialogClose.current?.click();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error occurred while creating the category",
        duration: 2000,
      });
      setLoadingCategory(false);
    }
  };

  const fetchCategories = async (search = null) => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category?${search ? `name=${search.trim()}` : ``}&page=1&limit=999`,
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

      setCategories(data.data.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred, please try again!",
        variant: "destructive",
      });
      setLoadingCategories(false);
    }
    setLoadingCategories(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mr-5 flex w-full flex-col gap-8 px-5 pb-10 pt-5 md:px-0 md:pt-8 lg:pt-10">
      <DashSearch
        placeholder="Example: Sink Table..."
        search={(search) => fetchCategories(search)}
      />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* ADD BRAND */}
        <Dialog>
          <DialogTrigger
            onClick={() => {
              setLoaded(false);
            }}
          >
            <div className="flex items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]">
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
                  <div className="mb-1">+</div>
                </div>
                <div className="text-center text-xl font-semibold text-neutral-300">
                  Add New Category
                </div>
              </div>
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
                disabled={loadingCategory}
                type="text"
                placeholder="Sheglam"
                className="my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2 focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]"
              />

              <div
                onClick={() => {
                  fileInput.current.click();
                }}
                className={cn(
                  "relative flex h-[150px] w-3/4 items-center justify-center rounded-lg border-[var(--dash-theme6)] hover:cursor-pointer",
                  loaded ? "border-0" : "border-4 border-dashed",
                )}
              >
                <input
                  onChange={() => {
                    const file = fileInput.current.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      imageInput.current.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                    setLoaded(true);
                  }}
                  ref={fileInput}
                  disabled={loadingCategory}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <img
                  src={imageValue}
                  className={cn(
                    "absolute left-0 z-10 hidden size-full rounded-lg object-scale-down",
                    loaded && "block",
                  )}
                  alt="Category Image"
                  ref={imageInput}
                />
                {!loaded && (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                    <i className="fa-solid fa-upload text-3xl text-[var(--dash-theme6)]"></i>
                    <span className="text-xl font-semibold text-[var(--dash-theme6)]">
                      Upload Image
                    </span>
                  </div>
                )}
              </div>
              <div className="flex w-3/4 flex-col items-center justify-center gap-1 text-center">
                <span className="text-lg font-bold text-emerald-500">Note</span>
                <span className="text-lg font-medium text-white">
                  The image must have a transparent background.
                </span>
                <span className="text-lg font-medium text-white">
                  The image must be cropped properly with no extra space on any
                  side.
                </span>
              </div>
              <button
                onClick={() => {
                  addCategory();
                }}
                type="button"
                className={cn(
                  "w-3/4 rounded-lg bg-[var(--dash-theme6)] p-3 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme5)]",
                  loadingCategory
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer",
                )}
              >
                {loadingCategory ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : (
                  "Add Category"
                )}
              </button>
            </div>
          </DialogContent>
          <DialogClose ref={addDialogClose} className="hidden" />
        </Dialog>

        {loadingCategories
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]"
              >
                <Skeleton className={"h-7 w-[100px] bg-neutral-200"} />
              </div>
            ))
          : categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                fetchCategories={() => fetchCategories()}
              />
            ))}
      </div>
    </div>
  );
};

export default page;
