"use client";

// Styles
import "./Hero.css";

// Components
import { useEffect } from "react";
import Image from "next/image";

const Hero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically load the Bootstrap JS only on the client side
      const script = document.createElement("script");
      script.src = "/assets/bootstrap/dist/js/bootstrap.bundle.min.js";
      script.async = true;
      document.body.appendChild(script);

      // Cleanup script when component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);
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
      <div
        id="CarouselHero"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div style={{ width: "100%", display: "flex", paddingLeft: "0" }}>
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
          </div>
          <div className="carousel-item">
            <div style={{ width: "100%", display: "flex", paddingLeft: "0" }}>
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
          </div>
          <div className="carousel-item">
            <div style={{ width: "100%", display: "flex", paddingLeft: "0" }}>
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
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#CarouselHero"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#CarouselHero"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
