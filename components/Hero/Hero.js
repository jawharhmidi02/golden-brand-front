// Styles
import "./Hero.css";

// Components
import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

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
      {/* <Carousel
        plugins={[plugin.current]}
        className="w-full"
        loop={true}
        draggable={false}
      >
        <CarouselContent>
          <CarouselItem
            style={{ width: "100%", display: "flex", paddingLeft: "0" }}
          >
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
          </CarouselItem>
          <CarouselItem
            style={{ width: "100%", display: "flex", paddingLeft: "0" }}
          >
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
          </CarouselItem>
          <CarouselItem
            style={{ width: "100%", display: "flex", paddingLeft: "0" }}
          >
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
          </CarouselItem>
        </CarouselContent>
      </Carousel> */}
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          {/* <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button> */}
        </div>
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{ width: "100%", display: "flex", paddingLeft: "0" }}
          >
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
          <div
            className="carousel-item"
            style={{ width: "100%", display: "flex", paddingLeft: "0" }}
          >
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
          <div
            className="carousel-item"
            style={{ width: "100%", display: "flex", paddingLeft: "0" }}
          >
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
        {/* <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
    </div>
  );
};

export default Hero;
