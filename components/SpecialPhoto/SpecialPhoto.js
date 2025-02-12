"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const SpecialPhoto = ({ specialPhoto, fetchSpecialPhotos = null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loadingSpecialPhoto, setLoadingSpecialPhoto] = useState(false);
  const [imageValue, setImageValue] = useState(specialPhoto.img);
  const imageRef = useRef(null);
  const fileInput = useRef(null);
  const confirmDeleteRef = useRef(null);

  const handleDelete = async () => {
    toast({
      title: "Delete Special Offer",
      description: "Deleting special offer...",
    });
    try {
      setLoadingSpecialPhoto(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/specialPhoto/${specialPhoto.id}`,
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
        title: "Success",
        description: "Special offer deleted successfully!",
        variant: "success",
        duration: 3000,
      });
      setLoadingSpecialPhoto(false);
      if (fetchSpecialPhotos) fetchSpecialPhotos();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error deleting special offer. Please try again later.",
        variant: "destructive",
      });
      setLoadingSpecialPhoto(false);
    }
  };

  const confirmDeletePopUp = () => {
    confirmDeleteRef.current?.click();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger ref={confirmDeleteRef} className="hidden" />
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
              Deleting this offer will remove all associated data
            </div>
            <button
              onClick={() => handleDelete()}
              disabled={loadingSpecialPhoto}
              type="button"
              className={cn(
                "mt-4 w-3/4 rounded-lg border-2 bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                loadingSpecialPhoto
                  ? "opacity-50 hover:cursor-not-allowed"
                  : "hover:bg-red-500",
              )}
            >
              {loadingSpecialPhoto ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                </div>
              ) : (
                "I'm Sure"
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
            <img
              src={specialPhoto.img}
              alt={specialPhoto.id}
              className="aspect-square w-full rounded-lg object-cover"
            />
          </div>
        </DialogTrigger>
        <DialogContent
          closeClass="text-white"
          className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
        >
          <DialogTitle />
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <input
              onChange={() => {
                const file = fileInput.current?.files[0];
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
              disabled={true}
            />
            <img
              onClick={() => {
                if (isEditing && !loadingSpecialPhoto) {
                  fileInput.current?.click();
                }
              }}
              ref={imageRef}
              src={imageValue}
              alt={specialPhoto.id}
              className={cn(
                "mb-2 h-[150px] w-3/4 rounded-lg object-scale-down",
                isEditing ? "hover:cursor-pointer" : "hover:cursor-not-allowed",
              )}
            ></img>
            <div className="flex w-3/4 flex-row gap-4">
              <button
                onClick={() => confirmDeletePopUp()}
                type="button"
                disabled={loadingSpecialPhoto}
                className="w-full rounded-lg border-2 border-red-500 bg-red-500 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpecialPhoto;
