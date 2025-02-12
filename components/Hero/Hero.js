// Styles
import "./Hero.css";

// Components
import Image from "next/image";
import { useContext, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { UserAuthContext } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const OPTIONS = { loop: true };

const EmblaCarousel = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  useEffect(() => {
    const updateOptions = () => {
      if (window.innerWidth >= 1024) {
        emblaApi && emblaApi.reInit({ slidesToScroll: 3 });
      } else if (window.innerWidth >= 768) {
        emblaApi && emblaApi.reInit({ slidesToScroll: 2 });
      } else {
        emblaApi && emblaApi.reInit({ slidesToScroll: 1 });
      }
    };

    window.addEventListener("resize", updateOptions);
    updateOptions();

    return () => window.removeEventListener("resize", updateOptions);
  }, [emblaApi]);

  return (
    <section
      dir="ltr"
      className="embla h-[100vw] w-full bg-neutral-600 min-[768px]:h-[50vw] min-[1024px]:h-[33vw]"
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {[
            "/images/hero2.jpeg",
            "/images/hero1.jpeg",
            "/images/hero0.jpeg",
            "/images/hero5.jpeg",
            "/images/hero4.jpeg",
            "/images/hero3.jpeg",
            "/images/hero8.jpeg",
            "/images/hero7.jpeg",
            "/images/hero6.jpeg",
          ].map((src, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={src}
                width={500}
                height={500}
                alt="Hero"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  const tCommon = useTranslations("common");
  const tHero = useTranslations("hero");
  const { ChangeUrl, Link } = useContext(UserAuthContext);
  return (
    <div className="hero">
      <div className="text">
        <h1
          className={cn(
            "title text-center text-3xl",
            tCommon("language.lng") === "ar"
              ? "text-4xl font-semibold lg:text-5xl"
              : "text-3xl",
          )}
        >
          {tCommon("goldenBrand.GoldenBrand")}:{" "}
          <span>{tCommon("goldenBrand.stainlessSteel")}</span>
          {/* Golden Brand: <span>Stainless Steel</span> */}
        </h1>
        <p className="text-center">{tHero("description")}</p>
        <Link
          className={cn("button", tCommon("language.lng"))}
          onClick={() => {
            ChangeUrl("/products");
          }}
          href="/products"
        />
      </div>
      <EmblaCarousel options={OPTIONS} />
    </div>
  );
};

export default Hero;
