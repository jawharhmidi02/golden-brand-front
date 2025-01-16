// Styles
import "./Hero.css";

// Components
import Image from "next/image";
import { useContext, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { UserAuthContext } from "@/contexts/AuthContext";

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
  const { ChangeUrl } = useContext(UserAuthContext);
  return (
    <div className="hero">
      <div className="text">
        <h1 className="title text-center text-3xl">
          Golden Brand: <span>Stainless Steel</span>
        </h1>
        <p className="text-center">
          Elevate your space with premium stainless steel craftsmanship. From
          sleek kitchens to durable handrails, Golden Brand Stainless Steel
          offers high-quality, custom solutions for homes and businesses.
          Discover our range of products designed to enhance functionality and
          style. Built to last, built to impress.
        </p>
        <button
          className="button"
          onClick={() => {
            ChangeUrl("/products");
          }}
        ></button>
      </div>
      <EmblaCarousel options={OPTIONS} />
    </div>
  );
};

export default Hero;
