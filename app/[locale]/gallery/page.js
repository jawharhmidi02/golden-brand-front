"use client";

import "./page.css";

import { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import Masonry from "react-masonry-css";

import { toast } from "@/hooks/use-toast";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Testimonials from "@/components/Testimonials/Testimonials";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAuthContext } from "@/contexts/AuthContext";

const page = () => {
  const tCommon = useTranslations("common");
  const { ChangeUrl } = useContext(UserAuthContext);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [gallery, setGallery] = useState([]);
  const breakpointColumnsObj = {
    default: 4, // Number of columns for default screen size
    1100: 3,
    700: 2,
    500: 1,
  };

  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery?page=1&limit=999`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setGallery(data.data.data);

      setLoadingGallery(false);
    } catch (error) {
      console.error(error);
      toast({
        title: tCommon("titles.error"),
        description: `${tCommon("messages.error.generic")},${tCommon("messages.error.tryAgain")}`,
        variant: "destructive",
      });

      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);
  return (
    <div className="mx-auto mt-16 w-full max-w-screen-xl items-center justify-center">
      <div className="flex w-full max-w-[1300px] flex-col gap-20 sm:mx-10 xl:mx-28">
        <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
          <div className="flex w-full flex-row items-center justify-center gap-3">
            <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
            <span className="text-center font-lato text-5xl font-bold text-neutral-800 md:text-6xl">
              {tCommon("navigation.gallery")}
            </span>
            <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          </div>
        </div>
      </div>

      {/* Carrousel Gallery */}
      {/* <section className="mx-0 mt-0 pb-4 pt-8">
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-[1400px] px-10">
            <Carousel opts={{ loop: true }}>
              <CarouselContent dir="ltr" className="-ml-1">
                {loadingGallery
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="flex w-full pl-4 min-[700px]:basis-1/2"
                      >
                        <div className="flex w-full transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer">
                          <div className="aspect-square max-h-[600px] w-full max-w-[600px] animate-pulse rounded-lg bg-neutral-300"></div>
                        </div>
                      </CarouselItem>
                    ))
                  : gallery.map((photo, index) => (
                      <CarouselItem
                        key={index}
                        className="flex w-full pl-4 min-[700px]:basis-1/2"
                      >
                        <div className="flex w-full transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer">
                          <img
                            src={photo.img}
                            alt="image"
                            className="h-full max-h-[600px] rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
              </CarouselContent>
              <CarouselPrevious className="-left-10 border-0 text-xl" />
              <CarouselNext className="-right-10 border-0 text-xl" />
            </Carousel>
          </div>
        </div>
      </section> */}

      {/* Masonry Gallery */}

      <section className="mx-0 mt-0 pb-4 pt-8">
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-[1400px] px-4 md:px-8">
            {loadingGallery ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
                  >
                    <Skeleton
                      className={"aspect-square w-full bg-neutral-300"}
                    />
                  </div>
                ))}
              </Masonry>
            ) : (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {gallery.map((photo, index) => (
                  <div
                    key={index}
                    className="relative transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
                    onClick={() => ChangeUrl(photo.img)}
                  >
                    <img
                      src={photo.img}
                      alt={`Gallery image ${index}`}
                      className="h-full max-h-[600px] w-full rounded-lg"
                    />
                  </div>
                ))}
              </Masonry>
            )}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default page;
