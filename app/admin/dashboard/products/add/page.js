"use client";

import { useRef, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

import { cn, validatePriceInputWithEvent } from "@/lib/utils";
import { AdminAuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DashCategoryInterface from "@/components/DashCategoryInterface/DashCategoryInterface";
import DashSimilarProducts from "@/components/DashSimilarProducts/DashSimilarProducts";

const page = () => {
  const { ChangeUrl } = useContext(AdminAuthContext);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [categories, setCategories] = useState([]);
  const [additionalFeatures, setAdditionalFeatures] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [productsVariants, setProductsVariants] = useState([]);
  const [addProductVariantData, setAddProductVariantData] = useState({
    code: "",
    dimension: "",
    price: "",
    additionalFeatures: {},
  });
  const [similarProducts, setSimilarProducts] = useState([]);
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const imageInput = useRef(null);
  const fileInput = useRef(null);
  const additionalFeatureRef = useRef(null);
  const priceRegex = /^\d+([.]\d{1,2})?$/;

  const handleAddImage = () => {
    if (!fileInput.current?.files?.[0] || !loaded) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "You need to upload photo first",
      });
      return;
    }

    const file = fileInput.current.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (image === reader.result) {
        toast({
          title: "Failed",
          variant: "destructive",
          description: "This photo is already picked!",
        });
        return;
      }

      setImage(reader.result);
      setLoaded(false);

      if (fileInput.current) {
        fileInput.current.value = "";
      }
    };

    reader.onerror = () => {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "Failed to upload the photo, please try again!",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleAddDescription = () => {
    if (!descRef.current.value.trim()) {
      toast({
        title: "Failed!",
        variant: "destructive",
        description: "Please enter a valid Description!",
      });
      return;
    }

    setDescriptions((prev) => [...prev, descRef.current.value.trim()]);
    descRef.current.value = "";
  };

  const handleAddAdditionalFeature = () => {
    const text = additionalFeatureRef.current.value.trim();

    if (!text) {
      toast({
        title: "Failed!",
        variant: "destructive",
        description: "Please enter a valid Feature!",
      });
      return;
    }

    setProductsVariants((prev) =>
      prev.map((variant) => ({
        ...variant,
        additionalFeatures: {
          ...variant["additionalFeatures"],
          [text]: "",
        },
      })),
    );
    setAddProductVariantData((prev) => ({
      ...prev,
      additionalFeatures: {
        ...prev["additionalFeatures"],
        [text]: "",
      },
    }));
    setAdditionalFeatures((prev) => [...prev, text]);
    additionalFeatureRef.current.value = "";
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category?page=1&limit=999`,
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
      setLoadingCategories(false);
      console.error(error);
      toast({
        title: "Failed fetching Categories",
        description: "Something wrong happened, please try again later!",
        variant: "destructive",
      });
    }
  };

  const handleSaveProduct = async () => {
    if (!nameRef.current.value.trim()) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "You have to enter a valid product Name!",
      });
      return;
    }

    if (descriptions.length < 1) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "You have to add minimum 1 description!",
      });
      return;
    }

    if (productsVariants.length < 1) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "You have to add minimum 1 Variant!",
      });
      return;
    }

    if (!selectedCategory) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "You have to pick a category!",
      });
      return;
    }

    if (!image.trim()) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: "You have to pick a photo first!",
      });
      return;
    }

    try {
      setLoadingProduct(true);

      toast({
        title: "Saving the product",
        description: "please wait...",
      });

      const body = {
        name: nameRef.current.value.trim(),
        img: image,
        description: descriptions,
        category: { id: selectedCategory },
        additionalFeatures,
        productsVariants,
        similarProducts,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();
      if (data.data == null) {
        if (data.message === "Product already exists") {
          setLoadingProduct(false);
          toast({
            title: "Failed",
            description: "Product Name is Already Taken!",
            variant: "destructive",
            duration: 2500,
          });
          nameRef.current.value = "";
          return;
        }
        throw new Error(data.message);
      }
      toast({
        title: "Done!",
        variant: "success",
        description: "Product Saved successfully!",
      });

      setLoadingProduct(false);
      ChangeUrl(`/products/${data.data.id}`);
    } catch (error) {
      setLoadingProduct(false);
      console.error(error);
      toast({
        title: "Failed saving Product!",
        description: "Something wrong happened, please try again!",
        variant: "destructive",
      });
    }
  };

  const handleAddVariant = async () => {
    try {
      const validationErrors = [];

      // if (!addProductVariantData.code.trim()) {
      //   validationErrors.push("Code is required");
      // }

      if (!addProductVariantData.dimension.trim()) {
        validationErrors.push("Dimension is required");
      }

      if (!addProductVariantData.price) {
        validationErrors.push("Price is required");
      }

      // const isCodeDuplicate = productsVariants.some(
      //   (variant) => variant.code === addProductVariantData.code,
      // );
      // if (isCodeDuplicate) {
      //   validationErrors.push("Product code must be unique");
      // }

      const hasEmptyAdditionalFeatures = Object.values(
        addProductVariantData.additionalFeatures,
      ).some((value) => !value.trim());
      if (hasEmptyAdditionalFeatures) {
        validationErrors.push("All additional features must be filled");
      }

      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
          toast({
            title: "Failed",
            variant: "destructive",
            description: error,
          });
        });

        return;
      }

      setProductsVariants((prev) => [...prev, addProductVariantData]);

      setAddProductVariantData(() => {
        const objectAdditionalFeatures = {};
        additionalFeatures.map((item) => {
          objectAdditionalFeatures[item] = "";
        });
        return {
          dimension: "",
          code: "",
          price: "",
          additionalFeatures: objectAdditionalFeatures,
        };
      });

      toast({
        title: "Done!",
        variant: "success",
        description: "Product variant added successfully",
      });
    } catch (error) {
      console.error("Error adding product variant:", error);
      toast({
        title: "Failed",
        variant: "destructive",
        description: "Failed to add product variant. Please try again.",
      });
    }
  };

  const handleEditVariant = (indx) => {
    if (productsVariants[indx].isEditing) {
      try {
        const validationErrors = [];

        if (!productsVariants[indx].dimension.trim()) {
          validationErrors.push("Dimension is required");
        }

        if (!productsVariants[indx].code.trim()) {
          validationErrors.push("Code is required");
        }

        if (!productsVariants[indx].price) {
          validationErrors.push("Price is required");
        }

        const isCodeDuplicate = productsVariants.some(
          (variant, index) =>
            index !== indx && variant.code === productsVariants[indx].code,
        );
        if (isCodeDuplicate) {
          validationErrors.push("Product code must be unique");
        }

        const hasEmptyAdditionalFeatures = Object.values(
          productsVariants[indx].additionalFeatures,
        ).some((value) => !String(value).trim());
        if (hasEmptyAdditionalFeatures) {
          validationErrors.push("All additional features must be filled");
        }

        if (validationErrors.length > 0) {
          validationErrors.forEach((error) => {
            toast({
              title: "Failed",
              variant: "destructive",
              description: error,
            });
          });

          return;
        }

        setAddProductVariantData(() => {
          const objectAdditionalFeatures = {};
          additionalFeatures.map((item) => {
            objectAdditionalFeatures[item] = "";
          });
          return {
            dimension: "",
            code: "",
            price: "",
            additionalFeatures: objectAdditionalFeatures,
          };
        });

        toast({
          title: "Done!",
          variant: "success",
          description: "Product variant Edited successfully",
        });

        setProductsVariants((prev) =>
          prev.map((variant, index) =>
            index === indx
              ? { ...variant, isEditing: !variant.isEditing }
              : variant,
          ),
        );
      } catch (error) {
        console.error("Error edditing product variant:", error);
        toast({
          title: "Failed",
          variant: "destructive",
          description: "Failed to edit product variant. Please try again.",
        });
      }
    } else {
      setProductsVariants((prev) =>
        prev.map((variant, index) =>
          index === indx
            ? { ...variant, isEditing: !variant.isEditing }
            : variant,
        ),
      );
    }
  };

  const handleDeleteVariant = (indx) => {
    setProductsVariants((prev) => prev.filter((_, index) => index !== indx));
  };

  const addProduct = async (similarProduct) => {
    if (!similarProduct) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoadingProduct(true);

      setSimilarProducts((prev) => [...prev, similarProduct]);
      toast({
        title: "Done!",
        description: "Product Added successfully to the similar Products!",
        variant: "success",
        duration: 3000,
      });

      setLoadingProduct(false);
    } catch (error) {
      console.error(error);
      setLoadingProduct(false);

      toast({
        title: "Failed adding similar product",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  };

  const removeSimilarProduct = async (similarProduct) => {
    if (!similarProduct) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoadingProduct(true);

      setSimilarProducts((prev) =>
        prev.filter((item) => item.id !== similarProduct.id),
      );
      toast({
        title: "Done!",
        description: "Product Removed successfully to the similar Products!",
        variant: "success",
        duration: 3000,
      });

      setLoadingProduct(false);
    } catch (error) {
      console.error(error);
      setLoadingProduct(false);

      toast({
        title: "Failed Removing similar product",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:pt-8 lg:pt-10">
      {loadingCategories && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        Add Product
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Product Name <font className="text-red-500">*</font>
          </div>
          <input
            disabled={loadingProduct}
            ref={nameRef}
            type="text"
            placeholder="Product Name"
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Product Description <font className="text-red-500">*</font>
          </div>
          <textarea
            disabled={loadingProduct}
            ref={descRef}
            type="text"
            placeholder="Product Description"
            className="h-[140px] bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
          <button
            disabled={loadingProduct}
            onClick={() => {
              handleAddDescription();
            }}
            type="button"
            className={cn(
              "mt-1 w-[180px] border-2 border-[var(--dash-theme5)] bg-[var(--dash-theme5)] py-2.5 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--dash-theme5)]",
              loadingProduct && "hover:cursor-not-allowed",
            )}
          >
            Add Description
          </button>
        </div>
        {descriptions.map((desc, index) => (
          <div className="flex flex-col items-start gap-1" key={index}>
            <button
              disabled={loadingProduct}
              onClick={() => {
                setDescriptions((prev) => prev.filter((item) => item !== desc));
              }}
              className={cn(
                "text-lg font-semibold text-red-400 transition-all duration-200 hover:cursor-pointer hover:text-red-800",
                loadingProduct && "hover:cursor-not-allowed",
              )}
            >
              Delete Description N'{index + 1}
            </button>
            <textarea
              disabled={true}
              defaultValue={desc}
              type="text"
              placeholder="Product Description"
              className="h-[100px] w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            />
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Product Additional Features <font className="text-red-500">*</font>
          </div>
          <input
            disabled={loadingProduct}
            ref={additionalFeatureRef}
            type="text"
            placeholder="Product Addional Feature"
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
          <button
            disabled={loadingProduct}
            onClick={() => {
              handleAddAdditionalFeature();
            }}
            type="button"
            className={cn(
              "mt-1 w-[240px] border-2 border-[var(--dash-theme5)] bg-[var(--dash-theme5)] py-2.5 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--dash-theme5)]",
              loadingProduct && "hover:cursor-not-allowed",
            )}
          >
            Add Additional Feature
          </button>
        </div>

        {additionalFeatures.map((additionalFeature, index) => (
          <div className="flex flex-col items-start gap-1" key={index}>
            <button
              disabled={loadingProduct}
              onClick={() => {
                setAdditionalFeatures((prev) =>
                  prev.filter((item) => item !== additionalFeature),
                );
                setProductsVariants((prev) =>
                  prev.map((variant) => {
                    delete variant.additionalFeatures[additionalFeature];
                    return variant;
                  }),
                );
                setAddProductVariantData((prev) => {
                  delete prev.additionalFeatures[additionalFeature];
                  return prev;
                });
              }}
              className={cn(
                "text-lg font-semibold text-red-400 transition-all duration-200 hover:cursor-pointer hover:text-red-800",
                loadingProduct && "hover:cursor-not-allowed",
              )}
            >
              Delete Additional Feature N'{index + 1}
            </button>
            <input
              disabled={true}
              defaultValue={additionalFeature}
              type="text"
              placeholder="Product Additional Feature"
              className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            />
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Product Category <font className="text-red-500">*</font>
          </div>
          <DashCategoryInterface
            changeCategoryOption={setSelectedCategory}
            values={categories}
            defaultValue={selectedCategory}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            Product Image <font className="text-red-500">*</font>
          </div>

          <div
            onClick={() => {
              fileInput.current.click();
            }}
            className={cn(
              "relative flex h-[300px] w-full max-w-[300px] items-center justify-center rounded-lg border-[var(--dash-theme5)] hover:cursor-pointer",
              loaded ? "border-0" : "border-4 border-dashed",
            )}
          >
            <input
              disabled={loadingProduct}
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
              type="file"
              accept="image/*"
              className="hidden"
            />
            <img
              src={null}
              className={cn(
                "absolute left-0 z-10 hidden size-full rounded-lg object-cover",
                loaded && "block",
              )}
              alt="Photo"
              ref={imageInput}
            />
            {!loaded && (
              <div
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-4",
                  loadingProduct && "hover:cursor-not-allowed",
                )}
              >
                <i className="fa-solid fa-upload text-3xl text-[var(--dash-theme5)]"></i>
                <span className="text-xl font-semibold text-[var(--dash-theme5)]">
                  Upload Photo
                </span>
              </div>
            )}
          </div>
          <button
            disabled={loadingProduct}
            onClick={() => {
              handleAddImage();
            }}
            type="button"
            className={cn(
              "mt-1 w-[200px] border-2 border-[var(--dash-theme5)] bg-[var(--dash-theme5)] py-2.5 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--dash-theme5)]",
              loadingProduct && "hover:cursor-not-allowed",
            )}
          >
            Add Photo
          </button>
        </div>

        {image && (
          <div className="flex flex-col items-start gap-2">
            <img
              src={image}
              className="h-[300px] w-[300px] rounded-lg object-cover"
            />
          </div>
        )}
      </div>
      <Accordion type="multiple" collapsible={"false"} className="w-full">
        <AccordionItem value="ProductVariants">
          <AccordionTrigger className="text-white">
            Product Variants
          </AccordionTrigger>
          <AccordionContent className="mx-auto flex max-w-[800px] flex-col items-center gap-10 text-white">
            <div className="text-4xl font-bold text-[var(--dash-theme5)]">
              Add Product Variant
            </div>
            <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-[var(--dash-theme5)]">
                  Product Variant Code <font className="text-red-500">*</font>
                </div>
                <input
                  disabled={loadingProduct}
                  value={addProductVariantData.code}
                  onChange={(e) =>
                    setAddProductVariantData((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Product code"
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-[var(--dash-theme5)]">
                  Product Variant Dimension{" "}
                  <font className="text-red-500">*</font>
                </div>
                <input
                  disabled={loadingProduct}
                  value={addProductVariantData.dimension}
                  onChange={(e) =>
                    setAddProductVariantData((prev) => ({
                      ...prev,
                      dimension: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Product dimension"
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-[var(--dash-theme5)]">
                  Product Variant Price <font className="text-red-500">*</font>
                </div>
                <input
                  disabled={loadingProduct}
                  value={addProductVariantData.price}
                  onChange={(e) => {
                    validatePriceInputWithEvent(e);
                    setAddProductVariantData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Product price"
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                />
              </div>
              {additionalFeatures.map((additionalFeature, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <div className="text-lg font-medium text-[var(--dash-theme5)]">
                    {additionalFeature}
                    <font className="text-red-500">*</font>
                  </div>
                  <input
                    disabled={loadingProduct}
                    value={
                      addProductVariantData.additionalFeatures[
                        additionalFeature
                      ] || ""
                    }
                    onChange={(e) =>
                      setAddProductVariantData((prev) => ({
                        ...prev,
                        additionalFeatures: {
                          ...prev["additionalFeatures"],
                          [additionalFeature]: e.target.value,
                        },
                      }))
                    }
                    type="text"
                    placeholder={`Product ${additionalFeature}`}
                    className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                  />
                </div>
              ))}
              <button
                disabled={loadingProduct}
                onClick={() => {
                  handleAddVariant();
                }}
                type="button"
                className={cn(
                  "mt-1 w-[200px] border-2 border-[var(--dash-theme5)] bg-[var(--dash-theme5)] px-1.5 py-2.5 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--dash-theme5)]",
                  loadingProduct && "hover:cursor-not-allowed",
                )}
              >
                Add Product Variant
              </button>
            </div>
            {productsVariants.length !== 0 && (
              <div className="text-4xl font-bold text-[var(--dash-theme5)]">
                Product Variants
              </div>
            )}
            {productsVariants.map((productVariant, index) => (
              <div
                className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10"
                key={productVariant.id || index}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-medium text-[var(--dash-theme5)]">
                    Product Variant Code <font className="text-red-500">*</font>
                  </div>
                  <input
                    disabled={loadingProduct || !productVariant.isEditing}
                    onChange={(e) => {
                      setProductsVariants((prev) =>
                        prev.map((variant, indx) =>
                          indx === index
                            ? { ...variant, code: e.target.value }
                            : variant,
                        ),
                      );
                    }}
                    value={productVariant.code}
                    type="text"
                    placeholder="Product Code"
                    className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-medium text-[var(--dash-theme5)]">
                    Product Variant Dimension{" "}
                    <font className="text-red-500">*</font>
                  </div>
                  <input
                    disabled={loadingProduct || !productVariant.isEditing}
                    onChange={(e) => {
                      setProductsVariants((prev) =>
                        prev.map((variant, indx) =>
                          indx === index
                            ? { ...variant, dimension: e.target.value }
                            : variant,
                        ),
                      );
                    }}
                    value={productVariant.dimension}
                    type="text"
                    placeholder="Product Dimension"
                    className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-medium text-[var(--dash-theme5)]">
                    Product Variant Price{" "}
                    <font className="text-red-500">*</font>
                  </div>
                  <input
                    disabled={loadingProduct || !productVariant.isEditing}
                    onChange={(e) => {
                      validatePriceInputWithEvent(e);
                      setProductsVariants((prev) =>
                        prev.map((variant, indx) =>
                          indx === index
                            ? { ...variant, price: e.target.value }
                            : variant,
                        ),
                      );
                    }}
                    value={productVariant.price}
                    type="text"
                    placeholder="Product Price"
                    className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                  />
                </div>
                {additionalFeatures.map((additionalFeature, ind) => (
                  <div className="flex flex-col gap-2" key={ind}>
                    <div className="text-lg font-medium text-[var(--dash-theme5)]">
                      {additionalFeature}
                      <font className="text-red-500">*</font>
                    </div>
                    <input
                      disabled={loadingProduct || !productVariant.isEditing}
                      onChange={(e) => {
                        setProductsVariants((prev) =>
                          prev.map((variant, indx) =>
                            indx === index
                              ? {
                                  ...variant,
                                  additionalFeatures: {
                                    ...variant["additionalFeatures"],
                                    [additionalFeature]: e.target.value,
                                  },
                                }
                              : variant,
                          ),
                        );
                      }}
                      value={
                        productVariant.additionalFeatures[additionalFeature]
                      }
                      type="text"
                      placeholder={`Product ${additionalFeature}`}
                      className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
                    />
                  </div>
                ))}
                <div className="mb-5 flex w-full max-w-[800px] flex-row gap-2">
                  <button
                    onClick={() => handleEditVariant(index)}
                    type="button"
                    className={cn(
                      "w-[120px] self-start border-2 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent",
                      productVariant.isEditing
                        ? "border-emerald-500 bg-emerald-500 hover:text-emerald-500"
                        : "border-blue-500 bg-blue-500 hover:text-blue-500",
                    )}
                  >
                    {productVariant.isEditing ? "Save" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDeleteVariant(index)}
                    type="button"
                    className="w-[120px] bg-red-900 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="SimilarProducts">
          <AccordionTrigger className="text-white">
            Similar Products
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <DashSimilarProducts
              similarProducts={similarProducts}
              setSimilarProducts={setSimilarProducts}
              addProduct={addProduct}
              removeSimilarProduct={removeSimilarProduct}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex w-full max-w-[800px] flex-row gap-2 pr-4 sm:pr-10">
        <button
          disabled={loadingProduct}
          onClick={() => {
            handleSaveProduct();
          }}
          type="button"
          className={cn(
            "w-[120px] bg-emerald-700 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-emerald-500",
            loadingProduct && "hover:cursor-not-allowed",
          )}
        >
          {loadingProduct ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
};

export default page;
