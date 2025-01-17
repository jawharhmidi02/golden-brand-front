import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

const SpecialPhotos = () => {
  const tCommon = useTranslations("common");
  const [loadingSpecialPhotos, setLoadingSpecialPhotos] = useState(true);
  const [specialPhotos, setSpecialPhotos] = useState([]);

  const fetchSpecialPhotos = async () => {
    setLoadingSpecialPhotos(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/specialPhoto?page=1&limit=999`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setSpecialPhotos(data.data.data);

      setLoadingSpecialPhotos(false);
    } catch (error) {
      console.error(error);
      toast({
        title: tCommon("titles.error"),
        description: `${tCommon("messages.error.generic")},${tCommon("messages.error.tryAgain")}`,
        variant: "destructive",
      });

      setLoadingSpecialPhotos(false);
    }
  };

  useEffect(() => {
    fetchSpecialPhotos();
  }, []);

  return (
    <section className="mx-0 mt-0 bg-white py-20 pt-20">
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[1400px] px-10">
          <Carousel opts={{ loop: true }}>
            <CarouselContent dir="ltr" className="-ml-1">
              {loadingSpecialPhotos
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
                : specialPhotos.map((offer, index) => (
                    <CarouselItem
                      key={index}
                      className="flex w-full pl-4 min-[700px]:basis-1/2"
                    >
                      <div className="flex w-full transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer">
                        <img
                          src={offer.img}
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
    </section>
  );
};

export default SpecialPhotos;
