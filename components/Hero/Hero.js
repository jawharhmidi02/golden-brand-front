// Styles
import "./Hero.css";

// Components
import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const OPTIONS = { loop: true };

const EmblaCarousel = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <Image
              alt="Hero Photo"
              src="/images/hero2.jpeg"
              width={500}
              height={500}
            />
            <Image
              alt="Hero Photo"
              src="/images/hero1.jpeg"
              width={500}
              height={500}
            />
            <Image
              alt="Hero Photo"
              src="/images/hero0.jpeg"
              width={500}
              height={500}
            />
          </div>
          <div className="embla__slide">
            <Image
              src="/images/hero5.jpeg"
              width={500}
              height={500}
              alt="hero"
            />
            <Image
              src="/images/hero4.jpeg"
              width={500}
              height={500}
              alt="hero"
            />
            <Image
              src="/images/hero3.jpeg"
              width={500}
              height={500}
              alt="hero"
            />
          </div>
          <div className="embla__slide">
            <Image
              src="/images/hero8.jpeg"
              width={500}
              height={500}
              alt="hero"
            />
            <Image
              src="/images/hero7.jpeg"
              width={500}
              height={500}
              alt="hero"
            />
            <Image
              src="/images/hero6.jpeg"
              width={500}
              height={500}
              alt="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="text">
        <h1 className="text-3xl">
          Golden Brand: <span>Stainless Steel</span>
        </h1>
        <p>
          Elevate your space with premium stainless steel craftsmanship. From
          sleek kitchens to durable handrails, Golden Brand Stainless Steel
          offers high-quality, custom solutions for homes and businesses.
          Discover our range of products designed to enhance functionality and
          style. Built to last, built to impress.
        </p>
        <a href="/products">Shop Now</a>
      </div>
      <EmblaCarousel options={OPTIONS} />
    </div>
  );
};

export default Hero;
